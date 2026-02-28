import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { TokenServicePort } from '../../ports/token-service.port';
import type { LogoutDTO } from './LogoutDTO';
import { LogoutValidator } from './LogoutValidator';

export class LogoutUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: LogoutDTO): Promise<{ success: true }> {
    LogoutValidator.validate(input);

    const payload = this.tokenService.verifyRefreshToken(input.refreshToken);
    const user = await this.authUserRepository.findById(payload.sub);

    if (!user || !user.refreshTokenHash) {
      throw new Error('Invalid refresh session');
    }

    const isRefreshTokenValid = await this.passwordHasher.compare(
      input.refreshToken,
      user.refreshTokenHash,
    );

    if (!isRefreshTokenValid) {
      throw new Error('Invalid refresh session');
    }

    user.clearRefreshTokenHash();
    user.setLastLogoutAt(new Date());
    await this.authUserRepository.save(user);

    return { success: true };
  }
}
