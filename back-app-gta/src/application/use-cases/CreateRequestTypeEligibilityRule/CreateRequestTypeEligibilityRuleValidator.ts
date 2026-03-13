import { ContractType, EligibilityOperator } from '@prisma/client';
import type { CreateRequestTypeEligibilityRuleDTO } from './CreateRequestTypeEligibilityRuleDTO';

export class CreateRequestTypeEligibilityRuleValidator {
  static validate(input: CreateRequestTypeEligibilityRuleDTO): void {
    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    if (
      input.operator !== undefined &&
      !Object.values(EligibilityOperator).includes(input.operator)
    ) {
      throw new Error('Invalid eligibility operator');
    }

    if (
      input.contractType !== undefined &&
      input.contractType !== null &&
      !Object.values(ContractType).includes(input.contractType)
    ) {
      throw new Error('Invalid contract type');
    }

    this.validateInteger(input.minSeniorityMonths, 'Min seniority months');
    this.validateInteger(input.maxSeniorityMonths, 'Max seniority months');
    this.validateRate(input.minWorkingRate, 'Min working rate');
    this.validateRate(input.maxWorkingRate, 'Max working rate');
  }

  private static validateInteger(value: number | null | undefined, label: string): void {
    if (value === undefined || value === null) {
      return;
    }

    if (!Number.isInteger(value)) {
      throw new Error(`${label} must be an integer`);
    }

    if (value < 0) {
      throw new Error(`${label} cannot be negative`);
    }
  }

  private static validateRate(value: number | null | undefined, label: string): void {
    if (value === undefined || value === null) {
      return;
    }

    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0 || value > 100) {
      throw new Error(`${label} must be between 0 and 100`);
    }
  }
}
