import type { CreateLeaveBalanceDTO } from './CreateLeaveBalanceDTO';

export class CreateLeaveBalanceValidator {
  static validate(input: CreateLeaveBalanceDTO): void {
    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }

    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    if (!Number.isInteger(input.year)) {
      throw new Error('Year must be an integer');
    }

    if (input.year < 1900 || input.year > 2100) {
      throw new Error('Year is invalid');
    }

    this.validateNumber(input.acquiredDays, 'Acquired days');
    this.validateNumber(input.usedDays, 'Used days');
    this.validateNumber(input.pendingDays, 'Pending days');
  }

  private static validateNumber(value: number | undefined, label: string): void {
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
