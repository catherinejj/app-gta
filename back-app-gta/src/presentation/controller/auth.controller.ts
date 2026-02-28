import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserUseCase } from '../../application/use-cases/GetCurrentUser/GetCurrentUserUseCase';
import { LoginUseCase } from '../../application/use-cases/Login/LoginUseCase';
import { LogoutUseCase } from '../../application/use-cases/Logout/LogoutUseCase';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshToken/RefreshTokenUseCase';
import { RegisterUseCase } from '../../application/use-cases/Register/RegisterUseCase';
import { LoginDto } from '../dto/login.dto';
import { LogoutDto } from '../dto/logout.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RegisterDto } from '../dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.registerUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.loginUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    try {
      return await this.refreshTokenUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() dto: LogoutDto) {
    try {
      return await this.logoutUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get('me')
  async me(@Headers('authorization') authorization?: string) {
    try {
      const token = this.extractBearerToken(authorization);
      return await this.getCurrentUserUseCase.execute({ accessToken: token });
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
      message === 'Invalid credentials' ||
      message === 'Invalid token signature' ||
      message === 'Invalid token type' ||
      message === 'Token expired' ||
      message === 'Invalid token format' ||
      message === 'Invalid refresh session' ||
      message === 'Missing authorization header' ||
      message === 'Invalid authorization header'
    ) {
      return new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    if (message === 'User already exists') {
      return new HttpException(message, HttpStatus.CONFLICT);
    }

    if (message === 'User not found') {
      return new HttpException(message, HttpStatus.NOT_FOUND);
    }

    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
