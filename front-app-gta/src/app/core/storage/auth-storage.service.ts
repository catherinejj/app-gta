import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthResponse, AuthTokens, AuthUser } from '../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly accessTokenKey = 'app-gta.access-token';
  private readonly refreshTokenKey = 'app-gta.refresh-token';
  private readonly userKey = 'app-gta.user';

  getAccessToken(): string | null {
    return this.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return this.getItem(this.refreshTokenKey);
  }

  getUser(): AuthUser | null {
    const rawUser = this.getItem(this.userKey);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as AuthUser;
    } catch {
      this.clearSession();
      return null;
    }
  }

  hasSession(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }

  storeSession(session: AuthResponse): void {
    this.setItem(this.accessTokenKey, session.tokens.accessToken);
    this.setItem(this.refreshTokenKey, session.tokens.refreshToken);
    this.setItem(this.userKey, JSON.stringify(session.user));
  }

  updateTokens(tokens: AuthTokens): void {
    this.setItem(this.accessTokenKey, tokens.accessToken);
    this.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  clearSession(): void {
    this.removeItem(this.accessTokenKey);
    this.removeItem(this.refreshTokenKey);
    this.removeItem(this.userKey);
  }

  private getItem(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(key);
  }

  private setItem(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(key, value);
  }

  private removeItem(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(key);
  }
}
