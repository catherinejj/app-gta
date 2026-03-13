import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import type { DeleteApprovalHistoryDTO } from './DeleteApprovalHistoryDTO';
import { DeleteApprovalHistoryValidator } from './DeleteApprovalHistoryValidator';

export class DeleteApprovalHistoryUseCase {
  constructor(private readonly approvalHistoryRepository: ApprovalHistoryRepository) {}

  async execute(input: DeleteApprovalHistoryDTO): Promise<void> {
    DeleteApprovalHistoryValidator.validate(input);

    const approvalHistory = await this.approvalHistoryRepository.findById(input.id.trim());

    if (!approvalHistory) {
      throw new Error('Approval history not found');
    }

    await this.approvalHistoryRepository.delete(input.id.trim());
  }
}
