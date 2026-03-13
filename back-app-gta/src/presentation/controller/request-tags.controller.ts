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
import { CreateRequestTagUseCase } from '../../application/use-cases/CreateRequestTag/CreateRequestTagUseCase';
import { DeleteRequestTagUseCase } from '../../application/use-cases/DeleteRequestTag/DeleteRequestTagUseCase';
import { GetRequestTagByIdUseCase } from '../../application/use-cases/GetRequestTagById/GetRequestTagByIdUseCase';
import { ListRequestTagsUseCase } from '../../application/use-cases/ListRequestTags/ListRequestTagsUseCase';
import { UpdateRequestTagUseCase } from '../../application/use-cases/UpdateRequestTag/UpdateRequestTagUseCase';
import type { CreateRequestTagDto, UpdateRequestTagDto } from '../dto/request-tag.dto';

@ApiTags('request-tags')
@Controller('request-tags')
export class RequestTagsController {
  constructor(
    private readonly listRequestTagsUseCase: ListRequestTagsUseCase,
    private readonly getRequestTagByIdUseCase: GetRequestTagByIdUseCase,
    private readonly createRequestTagUseCase: CreateRequestTagUseCase,
    private readonly updateRequestTagUseCase: UpdateRequestTagUseCase,
    private readonly deleteRequestTagUseCase: DeleteRequestTagUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listRequestTagsUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getRequestTagByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateRequestTagDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.createRequestTagUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateRequestTagDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.updateRequestTagUseCase.execute({ id, ...dto });
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
      await this.deleteRequestTagUseCase.execute({ id });
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

    if (errorMessage.includes('not found') || errorMessage.includes('Not found')) {
      return new HttpException({ error: errorMessage }, HttpStatus.NOT_FOUND);
    }

    if (
      errorMessage.includes('required') ||
      errorMessage.includes('Invalid') ||
      errorMessage.includes('invalid') ||
      errorMessage.includes('cannot') ||
      errorMessage.includes('already exists')
    ) {
      return new HttpException({ error: errorMessage }, HttpStatus.BAD_REQUEST);
    }

    if (
      errorMessage.includes('Forbidden') ||
      errorMessage.includes('Unauthorized')
    ) {
      return new HttpException({ error: errorMessage }, HttpStatus.FORBIDDEN);
    }

    return new HttpException(
      { error: 'Internal server error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
