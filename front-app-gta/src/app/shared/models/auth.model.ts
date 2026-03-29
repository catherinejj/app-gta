export type UserRole = 'ADMIN' | 'MANAGER' | 'RH' | 'USER';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  employeeNumber: string;
  rqth: boolean;
  userCreatedAt: string;
  lastLoginAt: string | null;
  lastLogoutAt: string | null;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface LoginPayload {
  email: string;
  password: string;
}
