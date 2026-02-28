import type { GetUserByIdDTO } from './GetUserByIdDTO';

export class GetUserByIdValidator {
  static validate(input: GetUserByIdDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }
  }
}
