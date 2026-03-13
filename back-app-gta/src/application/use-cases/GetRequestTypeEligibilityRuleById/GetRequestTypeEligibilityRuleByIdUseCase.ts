import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import type { GetRequestTypeEligibilityRuleByIdDTO } from './GetRequestTypeEligibilityRuleByIdDTO';
import { GetRequestTypeEligibilityRuleByIdValidator } from './GetRequestTypeEligibilityRuleByIdValidator';
import {
  toRequestTypeEligibilityRuleView,
  type RequestTypeEligibilityRuleViewDTO,
} from './RequestTypeEligibilityRuleViewDTO';

export class GetRequestTypeEligibilityRuleByIdUseCase {
  constructor(
    private readonly requestTypeEligibilityRuleRepository: RequestTypeEligibilityRuleRepository,
  ) {}

  async execute(
    input: GetRequestTypeEligibilityRuleByIdDTO,
  ): Promise<RequestTypeEligibilityRuleViewDTO> {
    GetRequestTypeEligibilityRuleByIdValidator.validate(input);

    const rule = await this.requestTypeEligibilityRuleRepository.findById(input.id.trim());

    if (!rule) {
      throw new Error('Request type eligibility rule not found');
    }

    return toRequestTypeEligibilityRuleView(rule);
  }
}
