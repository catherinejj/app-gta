import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import type { DeleteRequestTypeEligibilityRuleDTO } from './DeleteRequestTypeEligibilityRuleDTO';
import { DeleteRequestTypeEligibilityRuleValidator } from './DeleteRequestTypeEligibilityRuleValidator';

export class DeleteRequestTypeEligibilityRuleUseCase {
  constructor(
    private readonly requestTypeEligibilityRuleRepository: RequestTypeEligibilityRuleRepository,
  ) {}

  async execute(input: DeleteRequestTypeEligibilityRuleDTO): Promise<void> {
    DeleteRequestTypeEligibilityRuleValidator.validate(input);

    const rule = await this.requestTypeEligibilityRuleRepository.findById(input.id.trim());

    if (!rule) {
      throw new Error('Request type eligibility rule not found');
    }

    await this.requestTypeEligibilityRuleRepository.delete(input.id.trim());
  }
}
