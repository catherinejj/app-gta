import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { TokenServicePort } from '../../ports/token-service.port';
import type { AuthResultDTO } from '../shared/AuthResultDTO';
import type { RefreshTokenDTO } from './RefreshTokenDTO';
import { RefreshTokenValidator } from './RefreshTokenValidator';

export class RefreshTokenUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: RefreshTokenDTO): Promise<AuthResultDTO> {
    RefreshTokenValidator.validate(input);

    const payload = this.tokenService.verifyRefreshToken(input.refreshToken);
    const user = await this.authUserRepository.findById(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.refreshTokenHash) {
      throw new Error('Invalid refresh session');
    }

    const isRefreshTokenValid = await this.passwordHasher.compare(
      input.refreshToken,
      user.refreshTokenHash,
    );

    if (!isRefreshTokenValid) {
      throw new Error('Invalid refresh session');
    }

    const tokens = this.tokenService.issueTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshTokenHash = await this.passwordHasher.hash(tokens.refreshToken);
    user.updateRefreshTokenHash(refreshTokenHash);
    const savedUser = await this.authUserRepository.save(user);

    return {
      user: {
        id: savedUser.id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        birthDate: savedUser.birthDate.toISOString(),
        employeeNumber: savedUser.employeeNumber,
        rqth: savedUser.rqth,
        userCreatedAt: savedUser.userCreatedAt.toISOString(),
        lastLoginAt: savedUser.lastLoginAt
          ? savedUser.lastLoginAt.toISOString()
          : null,
        lastLogoutAt: savedUser.lastLogoutAt
          ? savedUser.lastLogoutAt.toISOString()
          : null,
        role: savedUser.role,
      },
      tokens,
    };
  }
}
