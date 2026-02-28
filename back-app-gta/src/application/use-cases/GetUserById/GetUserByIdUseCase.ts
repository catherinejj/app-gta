import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { GetUserByIdDTO } from './GetUserByIdDTO';
import { GetUserByIdValidator } from './GetUserByIdValidator';

export class GetUserByIdUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: GetUserByIdDTO): Promise<UserViewDTO> {
    GetUserByIdValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const user = await this.authUserRepository.findById(input.userId.trim());

    if (!user) {
      throw new Error('User not found');
    }

    return toUserView(user);
  }
}
