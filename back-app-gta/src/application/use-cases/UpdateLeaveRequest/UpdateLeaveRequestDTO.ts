import { DayPart, RequestStatus } from '@prisma/client';

export interface UpdateLeaveRequestDTO {
  id: string;
  userId?: string;
  requestTypeId?: string;
  startDate?: string;
  endDate?: string;
  startPart?: DayPart;
  endPart?: DayPart;
  durationDays?: number;
  reason?: string | null;
  status?: RequestStatus;
  documentPath?: string | null;
}
