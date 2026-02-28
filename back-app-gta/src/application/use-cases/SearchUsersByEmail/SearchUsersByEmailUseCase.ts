import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { TokenServicePort } from '../../ports/token-service.port';
import { ensureRoleAllowed } from '../shared/RoleAuthorization';
import { toUserView, type UserViewDTO } from '../shared/UserViewDTO';
import type { SearchUsersByEmailDTO } from './SearchUsersByEmailDTO';
import { SearchUsersByEmailValidator } from './SearchUsersByEmailValidator';

export class SearchUsersByEmailUseCase {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: SearchUsersByEmailDTO): Promise<UserViewDTO[]> {
    SearchUsersByEmailValidator.validate(input);

    const payload = this.tokenService.verifyAccessToken(input.accessToken);
    ensureRoleAllowed(payload.role, ['ADMIN', 'MANAGER', 'RH']);

    const user = await this.authUserRepository.findByEmail(
      input.email.trim().toLowerCase(),
    );

    return user ? [toUserView(user)] : [];
  }
}
