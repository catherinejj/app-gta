import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import type { GetLeaveRequestByIdDTO } from './GetLeaveRequestByIdDTO';
import { GetLeaveRequestByIdValidator } from './GetLeaveRequestByIdValidator';
import { toLeaveRequestView, type LeaveRequestViewDTO } from './LeaveRequestViewDTO';

export class GetLeaveRequestByIdUseCase {
  constructor(private readonly leaveRequestRepository: LeaveRequestRepository) {}

  async execute(input: GetLeaveRequestByIdDTO): Promise<LeaveRequestViewDTO> {
    GetLeaveRequestByIdValidator.validate(input);

    const leaveRequest = await this.leaveRequestRepository.findById(input.id.trim());

    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }

    return toLeaveRequestView(leaveRequest);
  }
}
