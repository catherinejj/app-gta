import { ContractStatus, ContractType } from '@prisma/client';
import type { CreateContractDTO } from './CreateContractDTO';

export class CreateContractValidator {
  static validate(input: CreateContractDTO): void {
    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }

    if (!Object.values(ContractType).includes(input.contractType)) {
      throw new Error('Invalid contract type');
    }

    if (input.status !== undefined && !Object.values(ContractStatus).includes(input.status)) {
      throw new Error('Invalid contract status');
    }

    this.validateDateString(input.startDate, 'Start date');

    if (input.endDate !== undefined && input.endDate !== null && input.endDate.trim()) {
      this.validateDateString(input.endDate, 'End date');
    }

    this.validatePercentage(input.workingRate, 'Working rate');
    this.validateNonNegativeNumber(input.annualLeaveEntitlement, 'Annual leave entitlement');
    this.validateNonNegativeNumber(input.rttEntitlement, 'RTT entitlement');
  }

  private static validateDateString(value: string, label: string): void {
    if (!value?.trim()) {
      throw new Error(`${label} is required`);
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`${label} is invalid`);
    }
  }

  private static validatePercentage(value: number | undefined, label: string): void {
    if (value === undefined) {
      return;
    }

    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0 || value > 100) {
      throw new Error(`${label} must be between 0 and 100`);
    }
  }

  private static validateNonNegativeNumber(value: number | undefined, label: string): void {
    if (value === undefined) {
      return;
    }

    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0) {
      throw new Error(`${label} cannot be negative`);
    }
  }
}
