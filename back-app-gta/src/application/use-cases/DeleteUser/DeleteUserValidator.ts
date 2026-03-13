import type { DeleteUserDTO } from './DeleteUserDTO';

export class DeleteUserValidator {
  static validate(input: DeleteUserDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }
  }
}
