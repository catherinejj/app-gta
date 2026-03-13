import { ApprovalHistory } from '../../../domain/entities/approval-history.entity';
import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import type { CreateApprovalHistoryDTO } from './CreateApprovalHistoryDTO';
import { CreateApprovalHistoryValidator } from './CreateApprovalHistoryValidator';
import { toApprovalHistoryView, type ApprovalHistoryViewDTO } from '../GetApprovalHistoryById/ApprovalHistoryViewDTO';

export class CreateApprovalHistoryUseCase {
  constructor(private readonly approvalHistoryRepository: ApprovalHistoryRepository) {}

  async execute(input: CreateApprovalHistoryDTO): Promise<ApprovalHistoryViewDTO> {
    CreateApprovalHistoryValidator.validate(input);

    const approvalHistory = ApprovalHistory.create({
      leaveRequestId: input.leaveRequestId.trim(),
      actorId: input.actorId.trim(),
      action: input.action,
      comment: input.comment,
    });

    const savedApprovalHistory = await this.approvalHistoryRepository.save(approvalHistory);
    return toApprovalHistoryView(savedApprovalHistory);
  }
}
