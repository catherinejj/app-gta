import type { DeleteLeaveBalanceDTO } from './DeleteLeaveBalanceDTO';

export class DeleteLeaveBalanceValidator {
  static validate(input: DeleteLeaveBalanceDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Leave balance id is required');
    }
  }
}
