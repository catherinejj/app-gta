import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import type { ListRequestTypeEligibilityRulesDTO } from './ListRequestTypeEligibilityRulesDTO';
import { ListRequestTypeEligibilityRulesValidator } from './ListRequestTypeEligibilityRulesValidator';
import {
  toRequestTypeEligibilityRuleView,
  type RequestTypeEligibilityRuleViewDTO,
} from '../GetRequestTypeEligibilityRuleById/RequestTypeEligibilityRuleViewDTO';

export class ListRequestTypeEligibilityRulesUseCase {
  constructor(
    private readonly requestTypeEligibilityRuleRepository: RequestTypeEligibilityRuleRepository,
  ) {}

  async execute(
    input: ListRequestTypeEligibilityRulesDTO,
  ): Promise<RequestTypeEligibilityRuleViewDTO[]> {
    ListRequestTypeEligibilityRulesValidator.validate(input);

    const rules = await this.requestTypeEligibilityRuleRepository.findAll();
    return rules.map(toRequestTypeEligibilityRuleView);
  }
}
