import { DayPart, RequestStatus } from '@prisma/client';

export interface LeaveRequestViewDTO {
  id: string;
  userId: string;
  requestTypeId: string;
  startDate: string;
  endDate: string;
  startPart: DayPart;
  endPart: DayPart;
  durationDays: number;
  reason: string | null;
  status: RequestStatus;
  documentPath: string | null;
  createdAt: string;
  updatedAt: string;
}

export function toLeaveRequestView(leaveRequest: {
  id: string;
  userId: string;
  requestTypeId: string;
  startDate: Date;
  endDate: Date;
  startPart: DayPart;
  endPart: DayPart;
  durationDays: number;
  reason: string | null;
  status: RequestStatus;
  documentPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}): LeaveRequestViewDTO {
  return {
    id: leaveRequest.id,
    userId: leaveRequest.userId,
    requestTypeId: leaveRequest.requestTypeId,
    startDate: leaveRequest.startDate.toISOString(),
    endDate: leaveRequest.endDate.toISOString(),
    startPart: leaveRequest.startPart,
    endPart: leaveRequest.endPart,
    durationDays: leaveRequest.durationDays,
    reason: leaveRequest.reason,
    status: leaveRequest.status,
    documentPath: leaveRequest.documentPath,
    createdAt: leaveRequest.createdAt.toISOString(),
    updatedAt: leaveRequest.updatedAt.toISOString(),
  };
}
