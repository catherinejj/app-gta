import { ApprovalAction } from '@prisma/client';

export interface CreateApprovalHistoryDto {
  leaveRequestId: string;
  actorId: string;
  action: ApprovalAction;
  comment?: string | null;
}

export interface UpdateApprovalHistoryDto {
  leaveRequestId?: string;
  actorId?: string;
  action?: ApprovalAction;
  comment?: string | null;
}
