import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import type { UpdateLeaveRequestDTO } from './UpdateLeaveRequestDTO';
import { UpdateLeaveRequestValidator } from './UpdateLeaveRequestValidator';
import { toLeaveRequestView, type LeaveRequestViewDTO } from '../GetLeaveRequestById/LeaveRequestViewDTO';

export class UpdateLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepository: LeaveRequestRepository) {}

  async execute(input: UpdateLeaveRequestDTO): Promise<LeaveRequestViewDTO> {
    UpdateLeaveRequestValidator.validate(input);

    const leaveRequest = await this.leaveRequestRepository.findById(input.id.trim());

    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }

    if (input.userId !== undefined) {
      leaveRequest.updateUserId(input.userId);
    }

    if (input.requestTypeId !== undefined) {
      leaveRequest.updateRequestTypeId(input.requestTypeId);
    }

    if (input.startDate !== undefined) {
      leaveRequest.updateStartDate(new Date(input.startDate));
    }

    if (input.endDate !== undefined) {
      leaveRequest.updateEndDate(new Date(input.endDate));
    }

    if (input.startPart !== undefined) {
      leaveRequest.updateStartPart(input.startPart);
    }

    if (input.endPart !== undefined) {
      leaveRequest.updateEndPart(input.endPart);
    }

    if (input.durationDays !== undefined) {
      leaveRequest.updateDurationDays(input.durationDays);
    }

    if (input.reason !== undefined) {
      leaveRequest.updateReason(input.reason);
    }

    if (input.status !== undefined) {
      leaveRequest.updateStatus(input.status);
    }

    if (input.documentPath !== undefined) {
      leaveRequest.updateDocumentPath(input.documentPath);
    }

    const savedLeaveRequest = await this.leaveRequestRepository.save(leaveRequest);
    return toLeaveRequestView(savedLeaveRequest);
  }
}
