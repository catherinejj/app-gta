import { ApprovalHistory } from '../entities/approval-history.entity';

export interface ApprovalHistoryRepository {
  findAll(): Promise<ApprovalHistory[]>;
  findById(id: string): Promise<ApprovalHistory | null>;
  save(approvalHistory: ApprovalHistory): Promise<ApprovalHistory>;
  delete(id: string): Promise<void>;
}
