import type { GetApprovalHistoryByIdDTO } from './GetApprovalHistoryByIdDTO';

export class GetApprovalHistoryByIdValidator {
  static validate(input: GetApprovalHistoryByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Approval history id is required');
    }
  }
}
