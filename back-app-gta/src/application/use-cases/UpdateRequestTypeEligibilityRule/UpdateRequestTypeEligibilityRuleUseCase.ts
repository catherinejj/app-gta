import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import type { UpdateRequestTypeEligibilityRuleDTO } from './UpdateRequestTypeEligibilityRuleDTO';
import { UpdateRequestTypeEligibilityRuleValidator } from './UpdateRequestTypeEligibilityRuleValidator';
import {
  toRequestTypeEligibilityRuleView,
  type RequestTypeEligibilityRuleViewDTO,
} from '../GetRequestTypeEligibilityRuleById/RequestTypeEligibilityRuleViewDTO';

export class UpdateRequestTypeEligibilityRuleUseCase {
  constructor(
    private readonly requestTypeEligibilityRuleRepository: RequestTypeEligibilityRuleRepository,
  ) {}

  async execute(
    input: UpdateRequestTypeEligibilityRuleDTO,
  ): Promise<RequestTypeEligibilityRuleViewDTO> {
    UpdateRequestTypeEligibilityRuleValidator.validate(input);

    const rule = await this.requestTypeEligibilityRuleRepository.findById(input.id.trim());

    if (!rule) {
      throw new Error('Request type eligibility rule not found');
    }

    if (input.requestTypeId !== undefined) {
      rule.updateRequestTypeId(input.requestTypeId);
    }

    if (input.operator !== undefined) {
      rule.updateOperator(input.operator);
    }

    if (input.contractType !== undefined) {
      rule.updateContractType(input.contractType);
    }

    if (input.rqthRequired !== undefined) {
      rule.updateRqthRequired(input.rqthRequired);
    }

    if (input.teleworkEligibleOnly !== undefined) {
      rule.updateTeleworkEligibleOnly(input.teleworkEligibleOnly);
    }

    if (input.minSeniorityMonths !== undefined) {
      rule.updateMinSeniorityMonths(input.minSeniorityMonths);
    }

    if (input.maxSeniorityMonths !== undefined) {
      rule.updateMaxSeniorityMonths(input.maxSeniorityMonths);
    }

    if (input.minWorkingRate !== undefined) {
      rule.updateMinWorkingRate(input.minWorkingRate);
    }

    if (input.maxWorkingRate !== undefined) {
      rule.updateMaxWorkingRate(input.maxWorkingRate);
    }

    if (input.departmentId !== undefined) {
      rule.updateDepartmentId(input.departmentId);
    }

    if (input.isActive !== undefined) {
      rule.updateIsActive(input.isActive);
    }

    const savedRule = await this.requestTypeEligibilityRuleRepository.save(rule);
    return toRequestTypeEligibilityRuleView(savedRule);
  }
}
