import { DayPart, RequestStatus } from '@prisma/client';

export interface CreateLeaveRequestDTO {
  userId: string;
  requestTypeId: string;
  startDate: string;
  endDate: string;
  startPart?: DayPart;
  endPart?: DayPart;
  durationDays?: number;
  reason?: string | null;
  status?: RequestStatus;
  documentPath?: string | null;
}
