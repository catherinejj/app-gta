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
import { CreatePublicHolidayUseCase } from '../../application/use-cases/CreatePublicHoliday/CreatePublicHolidayUseCase';
import { DeletePublicHolidayUseCase } from '../../application/use-cases/DeletePublicHoliday/DeletePublicHolidayUseCase';
import { GetPublicHolidayByIdUseCase } from '../../application/use-cases/GetPublicHolidayById/GetPublicHolidayByIdUseCase';
import { ListPublicHolidaysUseCase } from '../../application/use-cases/ListPublicHolidays/ListPublicHolidaysUseCase';
import { UpdatePublicHolidayUseCase } from '../../application/use-cases/UpdatePublicHoliday/UpdatePublicHolidayUseCase';
import type { CreatePublicHolidayDto, UpdatePublicHolidayDto } from '../dto/public-holiday.dto';

@ApiTags('public-holidays')
@Controller('public-holidays')
export class PublicHolidaysController {
  constructor(
    private readonly listPublicHolidaysUseCase: ListPublicHolidaysUseCase,
    private readonly getPublicHolidayByIdUseCase: GetPublicHolidayByIdUseCase,
    private readonly createPublicHolidayUseCase: CreatePublicHolidayUseCase,
    private readonly updatePublicHolidayUseCase: UpdatePublicHolidayUseCase,
    private readonly deletePublicHolidayUseCase: DeletePublicHolidayUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listPublicHolidaysUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getPublicHolidayByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreatePublicHolidayDto,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      // Verify admin role is done inside the use case or add it here
      return await this.createPublicHolidayUseCase.execute({
        date: dto.date,
        label: dto.label,
        region: dto.region,
        isRecurring: dto.isRecurring,
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
    @Body() dto: UpdatePublicHolidayDto,
  ) {
    try {
      const accessToken = this.extractBearerToken(authorization);
      // Verify admin role is done inside the use case or add it here
      return await this.updatePublicHolidayUseCase.execute({
        id,
        date: dto.date,
        label: dto.label,
        region: dto.region,
        isRecurring: dto.isRecurring,
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
      const accessToken = this.extractBearerToken(authorization);
      // Verify admin role is done inside the use case or add it here
      await this.deletePublicHolidayUseCase.execute({ id });
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
      errorMessage.includes('Invalid')
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
