import type { AuthTokens } from '../../ports/token-service.port';
import type { UserRole } from '../../../domain/value-objects/user-role';

export interface AuthResultDTO {
  user: {
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
  };
  tokens: AuthTokens;
}
