import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, ReplaySubject, switchMap, take, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshAccessToken$ = new ReplaySubject<string | null>(1);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthRequest =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh') ||
    req.url.includes('/auth/logout');

  const accessToken = authService.getAccessToken();
  const request = accessToken && !isAuthRequest ? addAuthHeader(req, accessToken) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRequest) {
        return throwError(() => error);
      }

      if (!authService.hasRefreshToken()) {
        authService.clearSession();
        void router.navigateByUrl('/login');
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshAccessToken$.pipe(
          filter((token): token is string => Boolean(token)),
          take(1),
          switchMap((token) => next(addAuthHeader(req, token))),
        );
      }

      isRefreshing = true;
      refreshAccessToken$.next(null);

      return authService.refreshToken().pipe(
        switchMap((response) => {
          isRefreshing = false;
          refreshAccessToken$.next(response.tokens.accessToken);

          return next(addAuthHeader(req, response.tokens.accessToken));
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          authService.clearSession();
          void router.navigateByUrl('/login');

          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

function addAuthHeader(req: Parameters<HttpInterceptorFn>[0], accessToken: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
