import type { GetLeaveBalanceByIdDTO } from './GetLeaveBalanceByIdDTO';

export class GetLeaveBalanceByIdValidator {
  static validate(input: GetLeaveBalanceByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Leave balance id is required');
    }
  }
}
