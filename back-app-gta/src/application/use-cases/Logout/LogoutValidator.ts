import type { LogoutDTO } from './LogoutDTO';

export class LogoutValidator {
  static validate(input: LogoutDTO): void {
    if (!input.refreshToken?.trim()) {
      throw new Error('Refresh token is required');
    }
  }
}
