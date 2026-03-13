import type { DeleteApprovalHistoryDTO } from './DeleteApprovalHistoryDTO';

export class DeleteApprovalHistoryValidator {
  static validate(input: DeleteApprovalHistoryDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Approval history id is required');
    }
  }
}
