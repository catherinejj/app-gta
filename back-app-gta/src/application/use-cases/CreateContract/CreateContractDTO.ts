import { ContractStatus, ContractType } from '@prisma/client';

export interface CreateContractDTO {
  userId: string;
  contractType: ContractType;
  status?: ContractStatus;
  startDate: string;
  endDate?: string | null;
  jobTitle?: string | null;
  workingRate?: number;
  teleworkEligible?: boolean;
  annualLeaveEntitlement?: number;
  rttEntitlement?: number;
}
