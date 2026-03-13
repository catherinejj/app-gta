import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import type { UpdateLeaveBalanceDTO } from './UpdateLeaveBalanceDTO';
import { UpdateLeaveBalanceValidator } from './UpdateLeaveBalanceValidator';
import { toLeaveBalanceView, type LeaveBalanceViewDTO } from '../GetLeaveBalanceById/LeaveBalanceViewDTO';

export class UpdateLeaveBalanceUseCase {
  constructor(private readonly leaveBalanceRepository: LeaveBalanceRepository) {}

  async execute(input: UpdateLeaveBalanceDTO): Promise<LeaveBalanceViewDTO> {
    UpdateLeaveBalanceValidator.validate(input);

    const leaveBalance = await this.leaveBalanceRepository.findById(input.id.trim());

    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }

    if (input.userId !== undefined) {
      leaveBalance.updateUserId(input.userId);
    }

    if (input.requestTypeId !== undefined) {
      leaveBalance.updateRequestTypeId(input.requestTypeId);
    }

    if (input.year !== undefined) {
      leaveBalance.updateYear(input.year);
    }

    if (input.acquiredDays !== undefined) {
      leaveBalance.updateAcquiredDays(input.acquiredDays);
    }

    if (input.usedDays !== undefined) {
      leaveBalance.updateUsedDays(input.usedDays);
    }

    if (input.pendingDays !== undefined) {
      leaveBalance.updatePendingDays(input.pendingDays);
    }

    const conflictingLeaveBalance = await this.leaveBalanceRepository.findByUserRequestTypeAndYear(
      leaveBalance.userId,
      leaveBalance.requestTypeId,
      leaveBalance.year,
    );

    if (conflictingLeaveBalance && conflictingLeaveBalance.id !== leaveBalance.id) {
      throw new Error('Leave balance already exists for this user, request type and year');
    }

    const savedLeaveBalance = await this.leaveBalanceRepository.save(leaveBalance);
    return toLeaveBalanceView(savedLeaveBalance);
  }
}
