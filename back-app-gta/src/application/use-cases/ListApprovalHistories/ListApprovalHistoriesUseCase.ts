import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import type { ListApprovalHistoriesDTO } from './ListApprovalHistoriesDTO';
import { ListApprovalHistoriesValidator } from './ListApprovalHistoriesValidator';
import { toApprovalHistoryView, type ApprovalHistoryViewDTO } from '../GetApprovalHistoryById/ApprovalHistoryViewDTO';

export class ListApprovalHistoriesUseCase {
  constructor(private readonly approvalHistoryRepository: ApprovalHistoryRepository) {}

  async execute(input: ListApprovalHistoriesDTO): Promise<ApprovalHistoryViewDTO[]> {
    ListApprovalHistoriesValidator.validate(input);

    const approvalHistories = await this.approvalHistoryRepository.findAll();
    return approvalHistories.map(toApprovalHistoryView);
  }
}
