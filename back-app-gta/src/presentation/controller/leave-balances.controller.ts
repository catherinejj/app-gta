import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLeaveBalanceUseCase } from '../../application/use-cases/CreateLeaveBalance/CreateLeaveBalanceUseCase';
import { DeleteLeaveBalanceUseCase } from '../../application/use-cases/DeleteLeaveBalance/DeleteLeaveBalanceUseCase';
import { GetLeaveBalanceByIdUseCase } from '../../application/use-cases/GetLeaveBalanceById/GetLeaveBalanceByIdUseCase';
import { ListLeaveBalancesUseCase } from '../../application/use-cases/ListLeaveBalances/ListLeaveBalancesUseCase';
import { UpdateLeaveBalanceUseCase } from '../../application/use-cases/UpdateLeaveBalance/UpdateLeaveBalanceUseCase';
import type { CreateLeaveBalanceDto, UpdateLeaveBalanceDto } from '../dto/leave-balance.dto';

@ApiTags('leave-balances')
@Controller('leave-balances')
export class LeaveBalancesController {
  constructor(
    private readonly listLeaveBalancesUseCase: ListLeaveBalancesUseCase,
    private readonly getLeaveBalanceByIdUseCase: GetLeaveBalanceByIdUseCase,
    private readonly createLeaveBalanceUseCase: CreateLeaveBalanceUseCase,
    private readonly updateLeaveBalanceUseCase: UpdateLeaveBalanceUseCase,
    private readonly deleteLeaveBalanceUseCase: DeleteLeaveBalanceUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listLeaveBalancesUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getLeaveBalanceByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateLeaveBalanceDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.createLeaveBalanceUseCase.execute({
        userId: dto.userId,
        requestTypeId: dto.requestTypeId,
        year: dto.year,
        acquiredDays: dto.acquiredDays,
        usedDays: dto.usedDays,
        pendingDays: dto.pendingDays,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateLeaveBalanceDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.updateLeaveBalanceUseCase.execute({
        id,
        userId: dto.userId,
        requestTypeId: dto.requestTypeId,
        year: dto.year,
        acquiredDays: dto.acquiredDays,
        usedDays: dto.usedDays,
        pendingDays: dto.pendingDays,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
  ) {
    try {
      this.extractBearerToken(authorization);
      await this.deleteLeaveBalanceUseCase.execute({ id });
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
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes('not found') ||
      errorMessage.includes('Not found') ||
      errorMessage.includes('not exists')
    ) {
      return new HttpException(
        { error: errorMessage },
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      errorMessage.includes('required') ||
      errorMessage.includes('Invalid') ||
      errorMessage.includes('invalid') ||
      errorMessage.includes('cannot') ||
      errorMessage.includes('already exists')
    ) {
      return new HttpException(
        { error: errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      errorMessage.includes('Forbidden') ||
      errorMessage.includes('Unauthorized')
    ) {
      return new HttpException(
        { error: errorMessage },
        HttpStatus.FORBIDDEN,
      );
    }

    return new HttpException(
      { error: 'Internal server error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
