import type { GetRequestTypeEligibilityRuleByIdDTO } from './GetRequestTypeEligibilityRuleByIdDTO';

export class GetRequestTypeEligibilityRuleByIdValidator {
  static validate(input: GetRequestTypeEligibilityRuleByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request type eligibility rule id is required');
    }
  }
}
