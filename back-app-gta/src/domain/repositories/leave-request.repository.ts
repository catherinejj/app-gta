import { LeaveRequest } from '../entities/leave-request.entity';

export interface LeaveRequestRepository {
  findAll(): Promise<LeaveRequest[]>;
  findById(id: string): Promise<LeaveRequest | null>;
  save(leaveRequest: LeaveRequest): Promise<LeaveRequest>;
  delete(id: string): Promise<void>;
}
