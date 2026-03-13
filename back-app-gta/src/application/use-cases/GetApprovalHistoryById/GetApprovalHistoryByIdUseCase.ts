import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import type { GetApprovalHistoryByIdDTO } from './GetApprovalHistoryByIdDTO';
import { GetApprovalHistoryByIdValidator } from './GetApprovalHistoryByIdValidator';
import { toApprovalHistoryView, type ApprovalHistoryViewDTO } from './ApprovalHistoryViewDTO';

export class GetApprovalHistoryByIdUseCase {
  constructor(private readonly approvalHistoryRepository: ApprovalHistoryRepository) {}

  async execute(input: GetApprovalHistoryByIdDTO): Promise<ApprovalHistoryViewDTO> {
    GetApprovalHistoryByIdValidator.validate(input);

    const approvalHistory = await this.approvalHistoryRepository.findById(input.id.trim());

    if (!approvalHistory) {
      throw new Error('Approval history not found');
    }

    return toApprovalHistoryView(approvalHistory);
  }
}
