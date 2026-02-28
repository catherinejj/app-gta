import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { UserRole } from '../../../domain/value-objects/user-role';
import { TokenServicePort } from '../../ports/token-service.port';
import type { GetCurrentUserDTO } from './GetCurrentUserDTO';
import { GetCurrentUserValidator } from './GetCurrentUserValidator';

export interface CurrentUserView {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  employeeNumber: string;
  rqth: boolean;
  userCreatedAt: string;
  lastLoginAt: string | null;
  lastLogoutAt: string | null;
  role: UserRole;
}

export class GetCurrentUserUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: GetCurrentUserDTO): Promise<CurrentUserView> {
    GetCurrentUserValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    const user = await this.authUserRepository.findById(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate.toISOString(),
      employeeNumber: user.employeeNumber,
      rqth: user.rqth,
      userCreatedAt: user.userCreatedAt.toISOString(),
      lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
      lastLogoutAt: user.lastLogoutAt ? user.lastLogoutAt.toISOString() : null,
      role: user.role,
    };
  }
}
