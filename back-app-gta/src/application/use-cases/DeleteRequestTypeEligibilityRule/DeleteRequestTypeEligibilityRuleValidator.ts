import type { DeleteRequestTypeEligibilityRuleDTO } from './DeleteRequestTypeEligibilityRuleDTO';

export class DeleteRequestTypeEligibilityRuleValidator {
  static validate(input: DeleteRequestTypeEligibilityRuleDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request type eligibility rule id is required');
    }
  }
}
