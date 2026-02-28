import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { TokenServicePort } from '../../ports/token-service.port';
import type { AuthResultDTO } from '../shared/AuthResultDTO';
import type { LoginDTO } from './LoginDTO';
import { LoginValidator } from './LoginValidator';

export class LoginUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: LoginDTO): Promise<AuthResultDTO> {
    LoginValidator.validate(input);
    const normalizedEmail = input.email?.trim().toLowerCase() ?? '';
    const user = await this.authUserRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.tokenService.issueTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshTokenHash = await this.passwordHasher.hash(tokens.refreshToken);
    user.setLastLoginAt(new Date());
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
