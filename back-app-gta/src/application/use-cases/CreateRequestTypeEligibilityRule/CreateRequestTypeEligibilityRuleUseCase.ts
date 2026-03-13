import { ContractType, EligibilityOperator } from '@prisma/client';
import { RequestTypeEligibilityRule } from '../../../domain/entities/request-type-eligibility-rule.entity';
import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import type { CreateRequestTypeEligibilityRuleDTO } from './CreateRequestTypeEligibilityRuleDTO';
import { CreateRequestTypeEligibilityRuleValidator } from './CreateRequestTypeEligibilityRuleValidator';
import {
  toRequestTypeEligibilityRuleView,
  type RequestTypeEligibilityRuleViewDTO,
} from '../GetRequestTypeEligibilityRuleById/RequestTypeEligibilityRuleViewDTO';

export class CreateRequestTypeEligibilityRuleUseCase {
  constructor(
    private readonly requestTypeEligibilityRuleRepository: RequestTypeEligibilityRuleRepository,
  ) {}

  async execute(
    input: CreateRequestTypeEligibilityRuleDTO,
  ): Promise<RequestTypeEligibilityRuleViewDTO> {
    CreateRequestTypeEligibilityRuleValidator.validate(input);

    const rule = RequestTypeEligibilityRule.create({
      requestTypeId: input.requestTypeId.trim(),
      operator: input.operator ?? EligibilityOperator.OR,
      contractType: input.contractType ?? null,
      rqthRequired: input.rqthRequired ?? null,
      teleworkEligibleOnly: input.teleworkEligibleOnly ?? null,
      minSeniorityMonths: input.minSeniorityMonths ?? null,
      maxSeniorityMonths: input.maxSeniorityMonths ?? null,
      minWorkingRate: input.minWorkingRate ?? null,
      maxWorkingRate: input.maxWorkingRate ?? null,
      departmentId: input.departmentId,
      isActive: input.isActive ?? true,
    });

    const savedRule = await this.requestTypeEligibilityRuleRepository.save(rule);
    return toRequestTypeEligibilityRuleView(savedRule);
  }
}
