import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { UpdateUserRoleDTO } from './UpdateUserRoleDTO';
import { UpdateUserRoleValidator } from './UpdateUserRoleValidator';

export class UpdateUserRoleUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: UpdateUserRoleDTO): Promise<UserViewDTO> {
    UpdateUserRoleValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN']);

    const user = await this.authUserRepository.findById(input.userId.trim());

    if (!user) {
      throw new Error('User not found');
    }

    user.changeRole(input.role);
    const savedUser = await this.authUserRepository.save(user);

    return toUserView(savedUser);
  }
}
