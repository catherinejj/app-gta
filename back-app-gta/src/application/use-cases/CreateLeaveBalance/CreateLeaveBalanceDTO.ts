export interface CreateLeaveBalanceDTO {
  userId: string;
  requestTypeId: string;
  year: number;
  acquiredDays?: number;
  usedDays?: number;
  pendingDays?: number;
}
