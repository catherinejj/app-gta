import type { GetCurrentUserDTO } from './GetCurrentUserDTO';

export class GetCurrentUserValidator {
  static validate(input: GetCurrentUserDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }
  }
}
