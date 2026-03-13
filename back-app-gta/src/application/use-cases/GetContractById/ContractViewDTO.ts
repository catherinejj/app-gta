import { ContractStatus, ContractType } from '@prisma/client';

export interface ContractViewDTO {
  id: string;
  userId: string;
  contractType: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate: string | null;
  jobTitle: string | null;
  workingRate: number;
  teleworkEligible: boolean;
  annualLeaveEntitlement: number;
  rttEntitlement: number;
  createdAt: string;
  updatedAt: string;
}

export function toContractView(contract: {
  id: string;
  userId: string;
  contractType: ContractType;
  status: ContractStatus;
  startDate: Date;
  endDate: Date | null;
  jobTitle: string | null;
  workingRate: number;
  teleworkEligible: boolean;
  annualLeaveEntitlement: number;
  rttEntitlement: number;
  createdAt: Date;
  updatedAt: Date;
}): ContractViewDTO {
  return {
    id: contract.id,
    userId: contract.userId,
    contractType: contract.contractType,
    status: contract.status,
    startDate: contract.startDate.toISOString(),
    endDate: contract.endDate ? contract.endDate.toISOString() : null,
    jobTitle: contract.jobTitle,
    workingRate: contract.workingRate,
    teleworkEligible: contract.teleworkEligible,
    annualLeaveEntitlement: contract.annualLeaveEntitlement,
    rttEntitlement: contract.rttEntitlement,
    createdAt: contract.createdAt.toISOString(),
    updatedAt: contract.updatedAt.toISOString(),
  };
}
