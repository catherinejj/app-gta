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
import { CreateContractUseCase } from '../../application/use-cases/CreateContract/CreateContractUseCase';
import { DeleteContractUseCase } from '../../application/use-cases/DeleteContract/DeleteContractUseCase';
import { GetContractByIdUseCase } from '../../application/use-cases/GetContractById/GetContractByIdUseCase';
import { ListContractsUseCase } from '../../application/use-cases/ListContracts/ListContractsUseCase';
import { UpdateContractUseCase } from '../../application/use-cases/UpdateContract/UpdateContractUseCase';
import type { CreateContractDto, UpdateContractDto } from '../dto/contract.dto';

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly listContractsUseCase: ListContractsUseCase,
    private readonly getContractByIdUseCase: GetContractByIdUseCase,
    private readonly createContractUseCase: CreateContractUseCase,
    private readonly updateContractUseCase: UpdateContractUseCase,
    private readonly deleteContractUseCase: DeleteContractUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listContractsUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getContractByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateContractDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.createContractUseCase.execute(dto);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateContractDto,
  ) {
    try {
      this.extractBearerToken(authorization);
      return await this.updateContractUseCase.execute({ id, ...dto });
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
      await this.deleteContractUseCase.execute({ id });
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
      errorMessage.includes('between') ||
      errorMessage.includes('before')
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
