import { ApprovalAction } from '@prisma/client';

export class ApprovalHistory {
  private constructor(
    public readonly id: string,
    private leaveRequestIdValue: string,
    private actorIdValue: string,
    private actionValue: ApprovalAction,
    private commentValue: string | null,
    private createdAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    leaveRequestId: string;
    actorId: string;
    action: ApprovalAction;
    comment?: string | null;
    createdAt?: Date;
  }): ApprovalHistory {
    const id = params.id?.trim() ?? '';
    const leaveRequestId = params.leaveRequestId?.trim() ?? '';
    const actorId = params.actorId?.trim() ?? '';
    const action = params.action;
    const comment = params.comment?.trim() || null;
    const createdAt = params.createdAt ?? new Date();

    ApprovalHistory.validateLeaveRequestId(leaveRequestId);
    ApprovalHistory.validateActorId(actorId);
    ApprovalHistory.validateAction(action);

    return new ApprovalHistory(
      id,
      leaveRequestId,
      actorId,
      action,
      comment,
      createdAt,
    );
  }

  get leaveRequestId(): string {
    return this.leaveRequestIdValue;
  }

  get actorId(): string {
    return this.actorIdValue;
  }

  get action(): ApprovalAction {
    return this.actionValue;
  }

  get comment(): string | null {
    return this.commentValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  updateLeaveRequestId(leaveRequestId: string): void {
    const normalizedLeaveRequestId = leaveRequestId?.trim() ?? '';
    ApprovalHistory.validateLeaveRequestId(normalizedLeaveRequestId);
    this.leaveRequestIdValue = normalizedLeaveRequestId;
  }

  updateActorId(actorId: string): void {
    const normalizedActorId = actorId?.trim() ?? '';
    ApprovalHistory.validateActorId(normalizedActorId);
    this.actorIdValue = normalizedActorId;
  }

  updateAction(action: ApprovalAction): void {
    ApprovalHistory.validateAction(action);
    this.actionValue = action;
  }

  updateComment(comment: string | null | undefined): void {
    this.commentValue = comment?.trim() || null;
  }

  private static validateLeaveRequestId(leaveRequestId: string): void {
    if (!leaveRequestId) {
      throw new Error('Leave request id is required');
    }
  }

  private static validateActorId(actorId: string): void {
    if (!actorId) {
      throw new Error('Actor id is required');
    }
  }

  private static validateAction(action: ApprovalAction): void {
    if (!Object.values(ApprovalAction).includes(action)) {
      throw new Error('Invalid approval action');
    }
  }
}
