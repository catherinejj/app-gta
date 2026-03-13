import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import type { DeleteLeaveBalanceDTO } from './DeleteLeaveBalanceDTO';
import { DeleteLeaveBalanceValidator } from './DeleteLeaveBalanceValidator';

export class DeleteLeaveBalanceUseCase {
  constructor(private readonly leaveBalanceRepository: LeaveBalanceRepository) {}

  async execute(input: DeleteLeaveBalanceDTO): Promise<void> {
    DeleteLeaveBalanceValidator.validate(input);

    const leaveBalance = await this.leaveBalanceRepository.findById(input.id.trim());

    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }

    await this.leaveBalanceRepository.delete(input.id.trim());
  }
}
