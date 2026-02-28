import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { UpdateUserRqthDTO } from './UpdateUserRqthDTO';
import { UpdateUserRqthValidator } from './UpdateUserRqthValidator';

export class UpdateUserRqthUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: UpdateUserRqthDTO): Promise<UserViewDTO> {
    UpdateUserRqthValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const user = await this.authUserRepository.findById(input.userId.trim());

    if (!user) {
      throw new Error('User not found');
    }

    user.updateRqth(input.rqth);
    const savedUser = await this.authUserRepository.save(user);

    return toUserView(savedUser);
  }
}
