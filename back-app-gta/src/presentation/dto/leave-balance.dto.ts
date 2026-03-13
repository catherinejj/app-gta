export interface CreateLeaveBalanceDto {
  userId: string;
  requestTypeId: string;
  year: number;
  acquiredDays?: number;
  usedDays?: number;
  pendingDays?: number;
}

export interface UpdateLeaveBalanceDto {
  userId?: string;
  requestTypeId?: string;
  year?: number;
  acquiredDays?: number;
  usedDays?: number;
  pendingDays?: number;
}
