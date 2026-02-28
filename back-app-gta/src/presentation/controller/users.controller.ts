import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserById/GetUserByIdUseCase';
import { ListUsersUseCase } from '../../application/use-cases/ListUsers/ListUsersUseCase';
import { SearchUsersByEmailUseCase } from '../../application/use-cases/SearchUsersByEmail/SearchUsersByEmailUseCase';
import { SearchUsersByFirstNameUseCase } from '../../application/use-cases/SearchUsersByFirstName/SearchUsersByFirstNameUseCase';
import { SearchUsersByLastNameUseCase } from '../../application/use-cases/SearchUsersByLastName/SearchUsersByLastNameUseCase';
import { UpdateUserRqthUseCase } from '../../application/use-cases/UpdateUserRqth/UpdateUserRqthUseCase';
import { UpdateUserRoleUseCase } from '../../application/use-cases/UpdateUserRole/UpdateUserRoleUseCase';
import { UpdateUserRqthDto } from '../dto/update-user-rqth.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly searchUsersByEmailUseCase: SearchUsersByEmailUseCase,
    private readonly searchUsersByFirstNameUseCase: SearchUsersByFirstNameUseCase,
    private readonly searchUsersByLastNameUseCase: SearchUsersByLastNameUseCase,
    private readonly updateUserRqthUseCase: UpdateUserRqthUseCase,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase,
  ) {}

  @Get()
  async listUsers(@Headers('authorization') authorization?: string) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.listUsersUseCase.execute({ accessToken });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get('search/id/:id')
  async getById(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.getUserByIdUseCase.execute({ accessToken, userId: id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get('search/email/:email')
  async searchByEmail(
    @Headers('authorization') authorization: string | undefined,
    @Param('email') email: string,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.searchUsersByEmailUseCase.execute({ accessToken, email });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get('search/first-name/:firstName')
  async searchByFirstName(
    @Headers('authorization') authorization: string | undefined,
    @Param('firstName') firstName: string,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.searchUsersByFirstNameUseCase.execute({
        accessToken,
        firstName,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get('search/last-name/:lastName')
  async searchByLastName(
    @Headers('authorization') authorization: string | undefined,
    @Param('lastName') lastName: string,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.searchUsersByLastNameUseCase.execute({
        accessToken,
        lastName,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Patch(':id/role')
  async updateRole(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.updateUserRoleUseCase.execute({
        accessToken,
        userId: id,
        role: dto.role,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Patch(':id/rqth')
  async updateRqth(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateUserRqthDto,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      return await this.updateUserRqthUseCase.execute({
        accessToken,
        userId: id,
        rqth: dto.rqth,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private extractBearerToken(authorization?: string): string {
    if (!authorization) {
      throw new Error('Missing authorization header');
    }

    const [scheme, token] = authorization.split(' ');

    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
      throw new Error('Invalid authorization header');
    }

    return token;
  }

  private mapError(error: unknown): HttpException {
    const message = error instanceof Error ? error.message : 'Unexpected error';

    if (
      message === 'Invalid token signature' ||
      message === 'Invalid token type' ||
      message === 'Token expired' ||
      message === 'Invalid token format' ||
      message === 'Missing authorization header' ||
      message === 'Invalid authorization header'
    ) {
      return new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    if (message === 'Forbidden') {
      return new HttpException(message, HttpStatus.FORBIDDEN);
    }

    if (message === 'User not found') {
      return new HttpException(message, HttpStatus.NOT_FOUND);
    }

    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
