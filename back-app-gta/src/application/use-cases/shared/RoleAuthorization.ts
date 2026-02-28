import type { UserRole } from '../../../domain/value-objects/user-role';

export function ensureRoleAllowed(
  role: UserRole,
  allowedRoles: UserRole[],
): void {
  if (!allowedRoles.includes(role)) {
    throw new Error('Forbidden');
  }
}
