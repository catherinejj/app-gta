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
import { CreateDepartmentUseCase } from '../../application/use-cases/CreateDepartment/CreateDepartmentUseCase';
import { DeleteDepartmentUseCase } from '../../application/use-cases/DeleteDepartment/DeleteDepartmentUseCase';
import { GetDepartmentByIdUseCase } from '../../application/use-cases/GetDepartmentById/GetDepartmentByIdUseCase';
import { ListDepartmentsUseCase } from '../../application/use-cases/ListDepartments/ListDepartmentsUseCase';
import { UpdateDepartmentUseCase } from '../../application/use-cases/UpdateDepartment/UpdateDepartmentUseCase';
import type { CreateDepartmentDto, UpdateDepartmentDto } from '../dto/department.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly listDepartmentsUseCase: ListDepartmentsUseCase,
    private readonly getDepartmentByIdUseCase: GetDepartmentByIdUseCase,
    private readonly createDepartmentUseCase: CreateDepartmentUseCase,
    private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
    private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listDepartmentsUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getDepartmentByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateDepartmentDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.createDepartmentUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.updateDepartmentUseCase.execute({ id, ...dto });
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
      await this.deleteDepartmentUseCase.execute({ id });
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
