import { Module } from '@nestjs/common';
import {
  AUTH_USER_REPOSITORY,
  PASSWORD_HASHER,
  TOKEN_SERVICE,
} from '../../application/ports/injection-tokens';
import { GetCurrentUserUseCase } from '../../application/use-cases/GetCurrentUser/GetCurrentUserUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserById/GetUserByIdUseCase';
import { ListUsersUseCase } from '../../application/use-cases/ListUsers/ListUsersUseCase';
import { LoginUseCase } from '../../application/use-cases/Login/LoginUseCase';
import { LogoutUseCase } from '../../application/use-cases/Logout/LogoutUseCase';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshToken/RefreshTokenUseCase';
import { RegisterUseCase } from '../../application/use-cases/Register/RegisterUseCase';
import { SearchUsersByEmailUseCase } from '../../application/use-cases/SearchUsersByEmail/SearchUsersByEmailUseCase';
import { SearchUsersByFirstNameUseCase } from '../../application/use-cases/SearchUsersByFirstName/SearchUsersByFirstNameUseCase';
import { SearchUsersByLastNameUseCase } from '../../application/use-cases/SearchUsersByLastName/SearchUsersByLastNameUseCase';
import { UpdateUserRqthUseCase } from '../../application/use-cases/UpdateUserRqth/UpdateUserRqthUseCase';
import { UpdateUserRoleUseCase } from '../../application/use-cases/UpdateUserRole/UpdateUserRoleUseCase';
import { PrismaAuthUserRepository } from '../../infrastructure/database/repositories/prisma-auth-user.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { BcryptPasswordHasher } from '../../infrastructure/security/bcrypt-password-hasher.service';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';
import { AuthController } from '../controller/auth.controller';
import { UsersController } from '../controller/users.controller';

@Module({
  controllers: [AuthController, UsersController],
  providers: [
    PrismaService,
    { provide: AUTH_USER_REPOSITORY, useClass: PrismaAuthUserRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    {
      provide: RegisterUseCase,
      useFactory: (repo, hasher, tokenService) =>
        new RegisterUseCase(repo, hasher, tokenService),
      inject: [AUTH_USER_REPOSITORY, PASSWORD_HASHER, TOKEN_SERVICE],
    },
    {
      provide: LoginUseCase,
      useFactory: (repo, hasher, tokenService) =>
        new LoginUseCase(repo, hasher, tokenService),
      inject: [AUTH_USER_REPOSITORY, PASSWORD_HASHER, TOKEN_SERVICE],
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (repo, hasher, tokenService) =>
        new RefreshTokenUseCase(repo, hasher, tokenService),
      inject: [AUTH_USER_REPOSITORY, PASSWORD_HASHER, TOKEN_SERVICE],
    },
    {
      provide: LogoutUseCase,
      useFactory: (repo, hasher, tokenService) =>
        new LogoutUseCase(repo, hasher, tokenService),
      inject: [AUTH_USER_REPOSITORY, PASSWORD_HASHER, TOKEN_SERVICE],
    },
    {
      provide: GetCurrentUserUseCase,
      useFactory: (repo, tokenService) => new GetCurrentUserUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: ListUsersUseCase,
      useFactory: (repo, tokenService) => new ListUsersUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (repo, tokenService) => new GetUserByIdUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: SearchUsersByEmailUseCase,
      useFactory: (repo, tokenService) =>
        new SearchUsersByEmailUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: SearchUsersByFirstNameUseCase,
      useFactory: (repo, tokenService) =>
        new SearchUsersByFirstNameUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: SearchUsersByLastNameUseCase,
      useFactory: (repo, tokenService) =>
        new SearchUsersByLastNameUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: UpdateUserRoleUseCase,
      useFactory: (repo, tokenService) =>
        new UpdateUserRoleUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
    {
      provide: UpdateUserRqthUseCase,
      useFactory: (repo, tokenService) =>
        new UpdateUserRqthUseCase(repo, tokenService),
      inject: [AUTH_USER_REPOSITORY, TOKEN_SERVICE],
    },
  ],
  exports: [
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    GetCurrentUserUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    SearchUsersByEmailUseCase,
    SearchUsersByFirstNameUseCase,
    SearchUsersByLastNameUseCase,
    UpdateUserRoleUseCase,
    UpdateUserRqthUseCase,
  ],
})
export class AuthModule {}
