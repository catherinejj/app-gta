import { ApprovalAction } from '@prisma/client';

export interface UpdateApprovalHistoryDTO {
  id: string;
  leaveRequestId?: string;
  actorId?: string;
  action?: ApprovalAction;
  comment?: string | null;
}
