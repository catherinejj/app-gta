import { ApprovalAction } from '@prisma/client';

export interface ApprovalHistoryViewDTO {
  id: string;
  leaveRequestId: string;
  actorId: string;
  action: ApprovalAction;
  comment: string | null;
  createdAt: string;
}

export function toApprovalHistoryView(approvalHistory: {
  id: string;
  leaveRequestId: string;
  actorId: string;
  action: ApprovalAction;
  comment: string | null;
  createdAt: Date;
}): ApprovalHistoryViewDTO {
  return {
    id: approvalHistory.id,
    leaveRequestId: approvalHistory.leaveRequestId,
    actorId: approvalHistory.actorId,
    action: approvalHistory.action,
    comment: approvalHistory.comment,
    createdAt: approvalHistory.createdAt.toISOString(),
  };
}
