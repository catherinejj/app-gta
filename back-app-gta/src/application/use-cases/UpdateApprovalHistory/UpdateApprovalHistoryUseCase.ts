import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import type { UpdateApprovalHistoryDTO } from './UpdateApprovalHistoryDTO';
import { UpdateApprovalHistoryValidator } from './UpdateApprovalHistoryValidator';
import { toApprovalHistoryView, type ApprovalHistoryViewDTO } from '../GetApprovalHistoryById/ApprovalHistoryViewDTO';

export class UpdateApprovalHistoryUseCase {
  constructor(private readonly approvalHistoryRepository: ApprovalHistoryRepository) {}

  async execute(input: UpdateApprovalHistoryDTO): Promise<ApprovalHistoryViewDTO> {
    UpdateApprovalHistoryValidator.validate(input);

    const approvalHistory = await this.approvalHistoryRepository.findById(input.id.trim());

    if (!approvalHistory) {
      throw new Error('Approval history not found');
    }

    if (input.leaveRequestId !== undefined) {
      approvalHistory.updateLeaveRequestId(input.leaveRequestId);
    }

    if (input.actorId !== undefined) {
      approvalHistory.updateActorId(input.actorId);
    }

    if (input.action !== undefined) {
      approvalHistory.updateAction(input.action);
    }

    if (input.comment !== undefined) {
      approvalHistory.updateComment(input.comment);
    }

    const savedApprovalHistory = await this.approvalHistoryRepository.save(approvalHistory);
    return toApprovalHistoryView(savedApprovalHistory);
  }
}
