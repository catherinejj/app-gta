import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, AuthUser, LoginPayload } from '../../shared/models/auth.model';
import { AuthStorageService } from '../storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authStorage = inject(AuthStorageService);
  private readonly authApiUrl = `${environment.api.baseUrl}/auth`;
  private readonly currentUserSubject = new BehaviorSubject<AuthUser | null>(
    this.authStorage.getUser(),
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, payload).pipe(
      tap((response) => this.applySession(response)),
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.authStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http
      .post<AuthResponse>(`${this.authApiUrl}/refresh`, { refreshToken })
      .pipe(tap((response) => this.applySession(response)));
  }

  logout(): Observable<void> {
    const refreshToken = this.authStorage.getRefreshToken();

    if (!refreshToken) {
      this.clearSession();
      return of(void 0);
    }

    return this.http.post<void>(`${this.authApiUrl}/logout`, { refreshToken }).pipe(
      map(() => void 0),
      catchError(() => of(void 0)),
      tap(() => this.clearSession()),
    );
  }

  isAuthenticated(): boolean {
    return this.authStorage.hasSession();
  }

  hasRefreshToken(): boolean {
    return Boolean(this.authStorage.getRefreshToken());
  }

  getAccessToken(): string | null {
    return this.authStorage.getAccessToken();
  }

  clearSession(): void {
    this.authStorage.clearSession();
    this.currentUserSubject.next(null);
  }

  private applySession(response: AuthResponse): void {
    this.authStorage.storeSession(response);
    this.currentUserSubject.next(response.user);
  }
}
