import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import type { ListLeaveBalancesDTO } from './ListLeaveBalancesDTO';
import { ListLeaveBalancesValidator } from './ListLeaveBalancesValidator';
import { toLeaveBalanceView, type LeaveBalanceViewDTO } from '../GetLeaveBalanceById/LeaveBalanceViewDTO';

export class ListLeaveBalancesUseCase {
  constructor(private readonly leaveBalanceRepository: LeaveBalanceRepository) {}

  async execute(input: ListLeaveBalancesDTO): Promise<LeaveBalanceViewDTO[]> {
    ListLeaveBalancesValidator.validate(input);

    const leaveBalances = await this.leaveBalanceRepository.findAll();
    return leaveBalances.map(toLeaveBalanceView);
  }
}
