import type { UpdateUserRqthDTO } from './UpdateUserRqthDTO';

export class UpdateUserRqthValidator {
  static validate(input: UpdateUserRqthDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }

    if (typeof input.rqth !== 'boolean') {
      throw new Error('Invalid rqth status');
    }
  }
}
