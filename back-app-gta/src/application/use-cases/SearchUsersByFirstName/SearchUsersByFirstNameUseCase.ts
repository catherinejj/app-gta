import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { SearchUsersByFirstNameDTO } from './SearchUsersByFirstNameDTO';
import { SearchUsersByFirstNameValidator } from './SearchUsersByFirstNameValidator';

export class SearchUsersByFirstNameUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: SearchUsersByFirstNameDTO): Promise<UserViewDTO[]> {
    SearchUsersByFirstNameValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const users = await this.authUserRepository.findByFirstName(
      input.firstName.trim().toLowerCase(),
    );

    return users.map(toUserView);
  }
}
