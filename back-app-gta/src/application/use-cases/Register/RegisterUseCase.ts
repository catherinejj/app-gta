import { AuthUser } from '../../../domain/entities/auth-user.entity';
import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { TokenServicePort } from '../../ports/token-service.port';
import type { AuthResultDTO } from '../shared/AuthResultDTO';
import type { RegisterDTO } from './RegisterDTO';
import { RegisterValidator } from './RegisterValidator';

export class RegisterUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: RegisterDTO): Promise<AuthResultDTO> {
    RegisterValidator.validate(input);
    const normalizedEmail = input.email?.trim().toLowerCase() ?? '';
    const normalizedFirstName = input.firstName?.trim().toLowerCase() ?? '';
    const normalizedLastName = input.lastName?.trim().toLowerCase() ?? '';
    const employeeNumber = input.employeeNumber?.trim() || undefined;

    const existingUser =
      await this.authUserRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const birthDate = new Date(input.birthDate);

    const user = AuthUser.create({
      email: normalizedEmail,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      birthDate,
      employeeNumber,
      passwordHash,
    });

    const savedUser = await this.authUserRepository.save(user);
    const tokens = this.tokenService.issueTokens({
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    const refreshTokenHash = await this.passwordHasher.hash(tokens.refreshToken);
    savedUser.updateRefreshTokenHash(refreshTokenHash);
    const persistedUser = await this.authUserRepository.save(savedUser);

    return {
      user: {
        id: persistedUser.id,
        email: persistedUser.email,
        firstName: persistedUser.firstName,
        lastName: persistedUser.lastName,
        birthDate: persistedUser.birthDate.toISOString(),
        employeeNumber: persistedUser.employeeNumber,
        rqth: persistedUser.rqth,
        userCreatedAt: persistedUser.userCreatedAt.toISOString(),
        lastLoginAt: persistedUser.lastLoginAt
          ? persistedUser.lastLoginAt.toISOString()
          : null,
        lastLogoutAt: persistedUser.lastLogoutAt
          ? persistedUser.lastLogoutAt.toISOString()
          : null,
        role: persistedUser.role,
      },
      tokens,
    };
  }
}
