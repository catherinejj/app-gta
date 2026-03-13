import { LeaveBalance } from '../../../domain/entities/leave-balance.entity';
import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import type { CreateLeaveBalanceDTO } from './CreateLeaveBalanceDTO';
import { CreateLeaveBalanceValidator } from './CreateLeaveBalanceValidator';
import { toLeaveBalanceView, type LeaveBalanceViewDTO } from '../GetLeaveBalanceById/LeaveBalanceViewDTO';

export class CreateLeaveBalanceUseCase {
  constructor(private readonly leaveBalanceRepository: LeaveBalanceRepository) {}

  async execute(input: CreateLeaveBalanceDTO): Promise<LeaveBalanceViewDTO> {
    CreateLeaveBalanceValidator.validate(input);

    const existingLeaveBalance = await this.leaveBalanceRepository.findByUserRequestTypeAndYear(
      input.userId.trim(),
      input.requestTypeId.trim(),
      input.year,
    );

    if (existingLeaveBalance) {
      throw new Error('Leave balance already exists for this user, request type and year');
    }

    const leaveBalance = LeaveBalance.create({
      userId: input.userId.trim(),
      requestTypeId: input.requestTypeId.trim(),
      year: input.year,
      acquiredDays: input.acquiredDays ?? 0,
      usedDays: input.usedDays ?? 0,
      pendingDays: input.pendingDays ?? 0,
    });

    const savedLeaveBalance = await this.leaveBalanceRepository.save(leaveBalance);
    return toLeaveBalanceView(savedLeaveBalance);
  }
}
