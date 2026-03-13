export interface LeaveBalanceViewDTO {
  id: string;
  userId: string;
  requestTypeId: string;
  year: number;
  acquiredDays: number;
  usedDays: number;
  pendingDays: number;
  createdAt: string;
  updatedAt: string;
}

export function toLeaveBalanceView(leaveBalance: {
  id: string;
  userId: string;
  requestTypeId: string;
  year: number;
  acquiredDays: number;
  usedDays: number;
  pendingDays: number;
  createdAt: Date;
  updatedAt: Date;
}): LeaveBalanceViewDTO {
  return {
    id: leaveBalance.id,
    userId: leaveBalance.userId,
    requestTypeId: leaveBalance.requestTypeId,
    year: leaveBalance.year,
    acquiredDays: leaveBalance.acquiredDays,
    usedDays: leaveBalance.usedDays,
    pendingDays: leaveBalance.pendingDays,
    createdAt: leaveBalance.createdAt.toISOString(),
    updatedAt: leaveBalance.updatedAt.toISOString(),
  };
}
