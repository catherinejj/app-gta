import { ContractType, EligibilityOperator } from '@prisma/client';

export interface CreateRequestTypeEligibilityRuleDto {
  requestTypeId: string;
  operator?: EligibilityOperator;
  contractType?: ContractType | null;
  rqthRequired?: boolean | null;
  teleworkEligibleOnly?: boolean | null;
  minSeniorityMonths?: number | null;
  maxSeniorityMonths?: number | null;
  minWorkingRate?: number | null;
  maxWorkingRate?: number | null;
  departmentId?: string | null;
  isActive?: boolean;
}

export interface UpdateRequestTypeEligibilityRuleDto {
  requestTypeId?: string;
  operator?: EligibilityOperator;
  contractType?: ContractType | null;
  rqthRequired?: boolean | null;
  teleworkEligibleOnly?: boolean | null;
  minSeniorityMonths?: number | null;
  maxSeniorityMonths?: number | null;
  minWorkingRate?: number | null;
  maxWorkingRate?: number | null;
  departmentId?: string | null;
  isActive?: boolean;
}
