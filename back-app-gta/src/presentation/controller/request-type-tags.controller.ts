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
import { CreateRequestTypeTagUseCase } from '../../application/use-cases/CreateRequestTypeTag/CreateRequestTypeTagUseCase';
import { DeleteRequestTypeTagUseCase } from '../../application/use-cases/DeleteRequestTypeTag/DeleteRequestTypeTagUseCase';
import { GetRequestTypeTagByIdUseCase } from '../../application/use-cases/GetRequestTypeTagById/GetRequestTypeTagByIdUseCase';
import { ListRequestTypeTagsUseCase } from '../../application/use-cases/ListRequestTypeTags/ListRequestTypeTagsUseCase';
import { UpdateRequestTypeTagUseCase } from '../../application/use-cases/UpdateRequestTypeTag/UpdateRequestTypeTagUseCase';
import type { CreateRequestTypeTagDto, UpdateRequestTypeTagDto } from '../dto/request-type-tag.dto';

@ApiTags('request-type-tags')
@Controller('request-type-tags')
export class RequestTypeTagsController {
  constructor(
    private readonly listRequestTypeTagsUseCase: ListRequestTypeTagsUseCase,
    private readonly getRequestTypeTagByIdUseCase: GetRequestTypeTagByIdUseCase,
    private readonly createRequestTypeTagUseCase: CreateRequestTypeTagUseCase,
    private readonly updateRequestTypeTagUseCase: UpdateRequestTypeTagUseCase,
    private readonly deleteRequestTypeTagUseCase: DeleteRequestTypeTagUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listRequestTypeTagsUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':requestTypeId/:tagId')
  async getById(
    @Param('requestTypeId') requestTypeId: string,
    @Param('tagId') tagId: string,
  ) {
    try {
      return await this.getRequestTypeTagByIdUseCase.execute({ requestTypeId, tagId });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateRequestTypeTagDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.createRequestTypeTagUseCase.execute({
        requestTypeId: dto.requestTypeId,
        tagId: dto.tagId,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':requestTypeId/:tagId')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('requestTypeId') requestTypeId: string,
    @Param('tagId') tagId: string,
    @Body() dto: UpdateRequestTypeTagDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.updateRequestTypeTagUseCase.execute({
        currentRequestTypeId: requestTypeId,
        currentTagId: tagId,
        requestTypeId: dto.requestTypeId,
        tagId: dto.tagId,
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':requestTypeId/:tagId')
  async delete(
    @Headers('authorization') authorization: string | undefined,
    @Param('requestTypeId') requestTypeId: string,
    @Param('tagId') tagId: string,
  ) {
    try {
      this.extractBearerToken(authorization);
      await this.deleteRequestTypeTagUseCase.execute({ requestTypeId, tagId });
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
