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
import { CreateRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/CreateRequestTypeEligibilityRule/CreateRequestTypeEligibilityRuleUseCase';
import { DeleteRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/DeleteRequestTypeEligibilityRule/DeleteRequestTypeEligibilityRuleUseCase';
import { GetRequestTypeEligibilityRuleByIdUseCase } from '../../application/use-cases/GetRequestTypeEligibilityRuleById/GetRequestTypeEligibilityRuleByIdUseCase';
import { ListRequestTypeEligibilityRulesUseCase } from '../../application/use-cases/ListRequestTypeEligibilityRules/ListRequestTypeEligibilityRulesUseCase';
import { UpdateRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/UpdateRequestTypeEligibilityRule/UpdateRequestTypeEligibilityRuleUseCase';
import type {
  CreateRequestTypeEligibilityRuleDto,
  UpdateRequestTypeEligibilityRuleDto,
} from '../dto/request-type-eligibility-rule.dto';

@ApiTags('request-type-eligibility-rules')
@Controller('request-type-eligibility-rules')
export class RequestTypeEligibilityRulesController {
  constructor(
    private readonly listRequestTypeEligibilityRulesUseCase: ListRequestTypeEligibilityRulesUseCase,
    private readonly getRequestTypeEligibilityRuleByIdUseCase: GetRequestTypeEligibilityRuleByIdUseCase,
    private readonly createRequestTypeEligibilityRuleUseCase: CreateRequestTypeEligibilityRuleUseCase,
    private readonly updateRequestTypeEligibilityRuleUseCase: UpdateRequestTypeEligibilityRuleUseCase,
    private readonly deleteRequestTypeEligibilityRuleUseCase: DeleteRequestTypeEligibilityRuleUseCase,
  ) {}

  @Get()
  async list() {
    try {
      return await this.listRequestTypeEligibilityRulesUseCase.execute({});
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.getRequestTypeEligibilityRuleByIdUseCase.execute({ id });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: CreateRequestTypeEligibilityRuleDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.createRequestTypeEligibilityRuleUseCase.execute({
        requestTypeId: dto.requestTypeId,
        operator: dto.operator,
        contractType: dto.contractType,
        rqthRequired: dto.rqthRequired,
        teleworkEligibleOnly: dto.teleworkEligibleOnly,
        minSeniorityMonths: dto.minSeniorityMonths,
        maxSeniorityMonths: dto.maxSeniorityMonths,
        minWorkingRate: dto.minWorkingRate,
        maxWorkingRate: dto.maxWorkingRate,
        departmentId: dto.departmentId,
        isActive: dto.isActive,
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
    @Body() dto: UpdateRequestTypeEligibilityRuleDto,
  ) {
    try {
      this.extractBearerToken(authorization);

      return await this.updateRequestTypeEligibilityRuleUseCase.execute({
        id,
        requestTypeId: dto.requestTypeId,
        operator: dto.operator,
        contractType: dto.contractType,
        rqthRequired: dto.rqthRequired,
        teleworkEligibleOnly: dto.teleworkEligibleOnly,
        minSeniorityMonths: dto.minSeniorityMonths,
        maxSeniorityMonths: dto.maxSeniorityMonths,
        minWorkingRate: dto.minWorkingRate,
        maxWorkingRate: dto.maxWorkingRate,
        departmentId: dto.departmentId,
        isActive: dto.isActive,
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
      await this.deleteRequestTypeEligibilityRuleUseCase.execute({ id });
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
      errorMessage.includes('between') ||
      errorMessage.includes('greater')
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
