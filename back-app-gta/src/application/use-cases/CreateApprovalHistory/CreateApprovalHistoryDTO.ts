import { ApprovalAction } from '@prisma/client';

export interface CreateApprovalHistoryDTO {
  leaveRequestId: string;
  actorId: string;
  action: ApprovalAction;
  comment?: string | null;
}
