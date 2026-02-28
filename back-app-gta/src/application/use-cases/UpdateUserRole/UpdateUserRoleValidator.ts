import { isUserRole } from '../../../domain/value-objects/user-role';
import type { UpdateUserRoleDTO } from './UpdateUserRoleDTO';

export class UpdateUserRoleValidator {
  static validate(input: UpdateUserRoleDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }

    if (!isUserRole(input.role)) {
      throw new Error('Invalid role');
    }
  }
}
