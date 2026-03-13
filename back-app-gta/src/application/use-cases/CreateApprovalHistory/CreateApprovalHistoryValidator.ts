import { ApprovalAction } from '@prisma/client';
import type { CreateApprovalHistoryDTO } from './CreateApprovalHistoryDTO';

export class CreateApprovalHistoryValidator {
  static validate(input: CreateApprovalHistoryDTO): void {
    if (!input.leaveRequestId?.trim()) {
      throw new Error('Leave request id is required');
    }

    if (!input.actorId?.trim()) {
      throw new Error('Actor id is required');
    }

    if (!Object.values(ApprovalAction).includes(input.action)) {
      throw new Error('Invalid approval action');
    }
  }
}
