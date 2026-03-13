import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import type { ListLeaveRequestsDTO } from './ListLeaveRequestsDTO';
import { ListLeaveRequestsValidator } from './ListLeaveRequestsValidator';
import { toLeaveRequestView, type LeaveRequestViewDTO } from '../GetLeaveRequestById/LeaveRequestViewDTO';

export class ListLeaveRequestsUseCase {
  constructor(private readonly leaveRequestRepository: LeaveRequestRepository) {}

  async execute(input: ListLeaveRequestsDTO): Promise<LeaveRequestViewDTO[]> {
    ListLeaveRequestsValidator.validate(input);

    const leaveRequests = await this.leaveRequestRepository.findAll();
    return leaveRequests.map(toLeaveRequestView);
  }
}
