import type { RefreshTokenDTO } from './RefreshTokenDTO';

export class RefreshTokenValidator {
  static validate(input: RefreshTokenDTO): void {
    if (!input.refreshToken?.trim()) {
      throw new Error('Refresh token is required');
    }
  }
}
