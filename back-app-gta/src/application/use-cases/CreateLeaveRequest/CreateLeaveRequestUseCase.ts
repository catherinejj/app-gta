import { DayPart, RequestStatus } from '@prisma/client';
import { LeaveRequest } from '../../../domain/entities/leave-request.entity';
import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import type { CreateLeaveRequestDTO } from './CreateLeaveRequestDTO';
import { CreateLeaveRequestValidator } from './CreateLeaveRequestValidator';
import { toLeaveRequestView, type LeaveRequestViewDTO } from '../GetLeaveRequestById/LeaveRequestViewDTO';

export class CreateLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepository: LeaveRequestRepository) {}

  async execute(input: CreateLeaveRequestDTO): Promise<LeaveRequestViewDTO> {
    CreateLeaveRequestValidator.validate(input);

    const leaveRequest = LeaveRequest.create({
      userId: input.userId.trim(),
      requestTypeId: input.requestTypeId.trim(),
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      startPart: input.startPart ?? DayPart.FULL_DAY,
      endPart: input.endPart ?? DayPart.FULL_DAY,
      durationDays: input.durationDays ?? 0,
      reason: input.reason,
      status: input.status ?? RequestStatus.PENDING,
      documentPath: input.documentPath,
    });

    const savedLeaveRequest = await this.leaveRequestRepository.save(leaveRequest);
    return toLeaveRequestView(savedLeaveRequest);
  }
}
