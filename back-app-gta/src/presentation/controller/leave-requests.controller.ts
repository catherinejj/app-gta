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
import { CreateLeaveRequestUseCase } from '../../application/use-cases/CreateLeaveRequest/CreateLeaveRequestUseCase';
import { DeleteLeaveRequestUseCase } from '../../application/use-cases/DeleteLeaveRequest/DeleteLeaveRequestUseCase';
import { GetLeaveRequestByIdUseCase } from '../../application/use-cases/GetLeaveRequestById/GetLeaveRequestByIdUseCase';
import { ListLeaveRequestsUseCase } from '../../application/use-cases/ListLeaveRequests/ListLeaveRequestsUseCase';
import { UpdateLeaveRequestUseCase } from '../../application/use-cases/UpdateLeaveRequest/UpdateLeaveRequestUseCase';
import type { CreateLeaveRequestDto, UpdateLeaveRequestDto } from '../dto/leave-request.dto';

@ApiTags('leave-requests')
@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(
    private readonly listLeaveRequestsUseCase: ListLeaveRequestsUseCase,
    private readonly getLeaveRequestByIdUseCase: GetLeaveRequestByIdUseCase,
    private readonly createLeaveRequestUseCase: CreateLeaveRequestUseCase,
    private readonly updateLeaveRequestUseCase: UpdateLeaveRequestUseCase,
    private readonly deleteLeaveRequestUseCase: DeleteLeaveRequestUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listLeaveRequestsUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getLeaveRequestByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateLeaveRequestDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.createLeaveRequestUseCase.execute({
        userId: dto.userId,
        requestTypeId: dto.requestTypeId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        startPart: dto.startPart,
        endPart: dto.endPart,
        durationDays: dto.durationDays,
        reason: dto.reason,
        status: dto.status,
        documentPath: dto.documentPath,
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
    @Body() dto: UpdateLeaveRequestDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.updateLeaveRequestUseCase.execute({
        id,
        userId: dto.userId,
        requestTypeId: dto.requestTypeId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        startPart: dto.startPart,
        endPart: dto.endPart,
        durationDays: dto.durationDays,
        reason: dto.reason,
        status: dto.status,
        documentPath: dto.documentPath,
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
      await this.deleteLeaveRequestUseCase.execute({ id });
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
      errorMessage.includes('before')
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
