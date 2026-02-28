import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { ListUsersDTO } from './ListUsersDTO';
import { ListUsersValidator } from './ListUsersValidator';

export class ListUsersUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: ListUsersDTO): Promise<UserViewDTO[]> {
    ListUsersValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const users = await this.authUserRepository.findAll();
    return users.map(toUserView);
  }
}
