export interface UpdateLeaveBalanceDTO {
  id: string;
  userId?: string;
  requestTypeId?: string;
  year?: number;
  acquiredDays?: number;
  usedDays?: number;
  pendingDays?: number;
}
