import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import type { GetLeaveBalanceByIdDTO } from './GetLeaveBalanceByIdDTO';
import { GetLeaveBalanceByIdValidator } from './GetLeaveBalanceByIdValidator';
import { toLeaveBalanceView, type LeaveBalanceViewDTO } from './LeaveBalanceViewDTO';

export class GetLeaveBalanceByIdUseCase {
  constructor(private readonly leaveBalanceRepository: LeaveBalanceRepository) {}

  async execute(input: GetLeaveBalanceByIdDTO): Promise<LeaveBalanceViewDTO> {
    GetLeaveBalanceByIdValidator.validate(input);

    const leaveBalance = await this.leaveBalanceRepository.findById(input.id.trim());

    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }

    return toLeaveBalanceView(leaveBalance);
  }
}
