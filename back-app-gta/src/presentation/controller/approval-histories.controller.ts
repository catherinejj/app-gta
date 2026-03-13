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
import { CreateApprovalHistoryUseCase } from '../../application/use-cases/CreateApprovalHistory/CreateApprovalHistoryUseCase';
import { DeleteApprovalHistoryUseCase } from '../../application/use-cases/DeleteApprovalHistory/DeleteApprovalHistoryUseCase';
import { GetApprovalHistoryByIdUseCase } from '../../application/use-cases/GetApprovalHistoryById/GetApprovalHistoryByIdUseCase';
import { ListApprovalHistoriesUseCase } from '../../application/use-cases/ListApprovalHistories/ListApprovalHistoriesUseCase';
import { UpdateApprovalHistoryUseCase } from '../../application/use-cases/UpdateApprovalHistory/UpdateApprovalHistoryUseCase';
import type { CreateApprovalHistoryDto, UpdateApprovalHistoryDto } from '../dto/approval-history.dto';

@ApiTags('approval-histories')
@Controller('approval-histories')
export class ApprovalHistoriesController {
  constructor(
    private readonly listApprovalHistoriesUseCase: ListApprovalHistoriesUseCase,
    private readonly getApprovalHistoryByIdUseCase: GetApprovalHistoryByIdUseCase,
    private readonly createApprovalHistoryUseCase: CreateApprovalHistoryUseCase,
    private readonly updateApprovalHistoryUseCase: UpdateApprovalHistoryUseCase,
    private readonly deleteApprovalHistoryUseCase: DeleteApprovalHistoryUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listApprovalHistoriesUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getApprovalHistoryByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateApprovalHistoryDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.createApprovalHistoryUseCase.execute({
        leaveRequestId: dto.leaveRequestId,
        actorId: dto.actorId,
        action: dto.action,
        comment: dto.comment,
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
    @Body() dto: UpdateApprovalHistoryDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.updateApprovalHistoryUseCase.execute({
        id,
        leaveRequestId: dto.leaveRequestId,
        actorId: dto.actorId,
        action: dto.action,
        comment: dto.comment,
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
      await this.deleteApprovalHistoryUseCase.execute({ id });
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
      errorMessage.includes('cannot')
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
