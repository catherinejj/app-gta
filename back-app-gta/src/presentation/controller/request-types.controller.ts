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
import { CreateRequestTypeUseCase } from '../../application/use-cases/CreateRequestType/CreateRequestTypeUseCase';
import { CreateRequestTypeTagUseCase } from '../../application/use-cases/CreateRequestTypeTag/CreateRequestTypeTagUseCase';
import { DeleteRequestTypeUseCase } from '../../application/use-cases/DeleteRequestType/DeleteRequestTypeUseCase';
import { DeleteRequestTypeTagUseCase } from '../../application/use-cases/DeleteRequestTypeTag/DeleteRequestTypeTagUseCase';
import { GetRequestTypeByIdUseCase } from '../../application/use-cases/GetRequestTypeById/GetRequestTypeByIdUseCase';
import { ListRequestTypesUseCase } from '../../application/use-cases/ListRequestTypes/ListRequestTypesUseCase';
import { UpdateRequestTypeUseCase } from '../../application/use-cases/UpdateRequestType/UpdateRequestTypeUseCase';
import type { CreateRequestTypeDto, UpdateRequestTypeDto } from '../dto/request-type.dto';

@ApiTags('request-types')
@Controller('request-types')
export class RequestTypesController {
  constructor(
    private readonly listRequestTypesUseCase: ListRequestTypesUseCase,
    private readonly getRequestTypeByIdUseCase: GetRequestTypeByIdUseCase,
    private readonly createRequestTypeUseCase: CreateRequestTypeUseCase,
    private readonly updateRequestTypeUseCase: UpdateRequestTypeUseCase,
    private readonly deleteRequestTypeUseCase: DeleteRequestTypeUseCase,
    private readonly createRequestTypeTagUseCase: CreateRequestTypeTagUseCase,
    private readonly deleteRequestTypeTagUseCase: DeleteRequestTypeTagUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listRequestTypesUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getRequestTypeByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateRequestTypeDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.createRequestTypeUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/tags/:tagId')
  async addTag(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Param('tagId') tagId: string,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.createRequestTypeTagUseCase.execute({
        requestTypeId: id,
        tagId,
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
    @Body() dto: UpdateRequestTypeDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.updateRequestTypeUseCase.execute({ id, ...dto });
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
      await this.deleteRequestTypeUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/tags/:tagId')
  async removeTag(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Param('tagId') tagId: string,
  ) {
    try {
      this.extractBearerToken(authorization);
      await this.deleteRequestTypeTagUseCase.execute({
        requestTypeId: id,
        tagId,
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
