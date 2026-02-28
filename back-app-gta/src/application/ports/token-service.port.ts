import { UserRole } from '../../domain/value-objects/user-role';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenServicePort {
  issueTokens(payload: AuthTokenPayload): AuthTokens;
  verifyAccessToken(token: string): AuthTokenPayload;
  verifyRefreshToken(token: string): AuthTokenPayload;
}
