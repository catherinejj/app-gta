import { ApprovalAction } from '@prisma/client';
import type { UpdateApprovalHistoryDTO } from './UpdateApprovalHistoryDTO';

export class UpdateApprovalHistoryValidator {
  static validate(input: UpdateApprovalHistoryDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Approval history id is required');
    }

    if (input.leaveRequestId !== undefined && !input.leaveRequestId.trim()) {
      throw new Error('Leave request id cannot be empty');
    }

    if (input.actorId !== undefined && !input.actorId.trim()) {
      throw new Error('Actor id cannot be empty');
    }

    if (input.action !== undefined && !Object.values(ApprovalAction).includes(input.action)) {
      throw new Error('Invalid approval action');
    }
  }
}
