import { RequestTypeEligibilityRule } from '../entities/request-type-eligibility-rule.entity';

export interface RequestTypeEligibilityRuleRepository {
  findAll(): Promise<RequestTypeEligibilityRule[]>;
  findById(id: string): Promise<RequestTypeEligibilityRule | null>;
  save(rule: RequestTypeEligibilityRule): Promise<RequestTypeEligibilityRule>;
  delete(id: string): Promise<void>;
}
