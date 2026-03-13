import { ContractType, EligibilityOperator } from '@prisma/client';

export interface RequestTypeEligibilityRuleViewDTO {
  id: string;
  requestTypeId: string;
  operator: EligibilityOperator;
  contractType: ContractType | null;
  rqthRequired: boolean | null;
  teleworkEligibleOnly: boolean | null;
  minSeniorityMonths: number | null;
  maxSeniorityMonths: number | null;
  minWorkingRate: number | null;
  maxWorkingRate: number | null;
  departmentId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function toRequestTypeEligibilityRuleView(rule: {
  id: string;
  requestTypeId: string;
  operator: EligibilityOperator;
  contractType: ContractType | null;
  rqthRequired: boolean | null;
  teleworkEligibleOnly: boolean | null;
  minSeniorityMonths: number | null;
  maxSeniorityMonths: number | null;
  minWorkingRate: number | null;
  maxWorkingRate: number | null;
  departmentId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): RequestTypeEligibilityRuleViewDTO {
  return {
    id: rule.id,
    requestTypeId: rule.requestTypeId,
    operator: rule.operator,
    contractType: rule.contractType,
    rqthRequired: rule.rqthRequired,
    teleworkEligibleOnly: rule.teleworkEligibleOnly,
    minSeniorityMonths: rule.minSeniorityMonths,
    maxSeniorityMonths: rule.maxSeniorityMonths,
    minWorkingRate: rule.minWorkingRate,
    maxWorkingRate: rule.maxWorkingRate,
    departmentId: rule.departmentId,
    isActive: rule.isActive,
    createdAt: rule.createdAt.toISOString(),
    updatedAt: rule.updatedAt.toISOString(),
  };
}
