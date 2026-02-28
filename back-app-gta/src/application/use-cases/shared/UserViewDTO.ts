import type { UserRole } from '../../../domain/value-objects/user-role';

export interface UserViewDTO {
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

export function toUserView(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  employeeNumber: string;
  rqth: boolean;
  userCreatedAt: Date;
  lastLoginAt: Date | null;
  lastLogoutAt: Date | null;
  role: UserRole;
}): UserViewDTO {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate.toISOString(),
    employeeNumber: user.employeeNumber,
    rqth: user.rqth,
    userCreatedAt: user.userCreatedAt.toISOString(),
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
    lastLogoutAt: user.lastLogoutAt ? user.lastLogoutAt.toISOString() : null,
    role: user.role,
  };
}
