import { LeaveBalance } from '../entities/leave-balance.entity';

export interface LeaveBalanceRepository {
  findAll(): Promise<LeaveBalance[]>;
  findById(id: string): Promise<LeaveBalance | null>;
  findByUserRequestTypeAndYear(
    userId: string,
    requestTypeId: string,
    year: number,
  ): Promise<LeaveBalance | null>;
  save(leaveBalance: LeaveBalance): Promise<LeaveBalance>;
  delete(id: string): Promise<void>;
}
