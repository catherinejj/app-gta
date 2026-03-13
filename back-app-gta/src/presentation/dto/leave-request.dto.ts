import { DayPart, RequestStatus } from '@prisma/client';

export interface CreateLeaveRequestDto {
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

export interface UpdateLeaveRequestDto {
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
