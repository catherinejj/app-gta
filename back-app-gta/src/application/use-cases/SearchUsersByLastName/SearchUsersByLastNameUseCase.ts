import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { SearchUsersByLastNameDTO } from './SearchUsersByLastNameDTO';
import { SearchUsersByLastNameValidator } from './SearchUsersByLastNameValidator';

export class SearchUsersByLastNameUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: SearchUsersByLastNameDTO): Promise<UserViewDTO[]> {
    SearchUsersByLastNameValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const users = await this.authUserRepository.findByLastName(
      input.lastName.trim().toLowerCase(),
    );

    return users.map(toUserView);
  }
}
