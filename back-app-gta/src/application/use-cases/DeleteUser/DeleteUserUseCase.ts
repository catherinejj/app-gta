import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import type { DeleteUserDTO } from './DeleteUserDTO';
import { DeleteUserValidator } from './DeleteUserValidator';

export class DeleteUserUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: DeleteUserDTO): Promise<void> {
    DeleteUserValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN']);

    const user = await this.authUserRepository.findById(input.userId.trim());

    if (!user) {
      throw new Error('User not found');
    }

    await this.authUserRepository.delete(input.userId.trim());
  }
}
