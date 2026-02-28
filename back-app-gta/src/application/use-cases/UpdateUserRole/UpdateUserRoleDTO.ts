import type { UserRole } from '../../../domain/value-objects/user-role';

export interface UpdateUserRoleDTO {
  accessToken: string;
  userId: string;
  role: UserRole;
}
