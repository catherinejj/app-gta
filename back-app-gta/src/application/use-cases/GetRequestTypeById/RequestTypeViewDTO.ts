import { RequestCategory } from '@prisma/client';

export interface RequestTypeViewDTO {
  id: string;
  code: string;
  label: string;
  description: string | null;
  category: RequestCategory;
  parentId: string | null;
  requiresApproval: boolean;
  requiresBalance: boolean;
  requiresDocument: boolean;
  rqthOnly: boolean;
  requiresTeleworkEligibility: boolean;
  color: string | null;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function toRequestTypeView(requestType: {
  id: string;
  code: string;
  label: string;
  description: string | null;
  category: RequestCategory;
  parentId: string | null;
  requiresApproval: boolean;
  requiresBalance: boolean;
  requiresDocument: boolean;
  rqthOnly: boolean;
  requiresTeleworkEligibility: boolean;
  color: string | null;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): RequestTypeViewDTO {
  return {
    id: requestType.id,
    code: requestType.code,
    label: requestType.label,
    description: requestType.description,
    category: requestType.category,
    parentId: requestType.parentId,
    requiresApproval: requestType.requiresApproval,
    requiresBalance: requestType.requiresBalance,
    requiresDocument: requestType.requiresDocument,
    rqthOnly: requestType.rqthOnly,
    requiresTeleworkEligibility: requestType.requiresTeleworkEligibility,
    color: requestType.color,
    icon: requestType.icon,
    displayOrder: requestType.displayOrder,
    isActive: requestType.isActive,
    createdAt: requestType.createdAt.toISOString(),
    updatedAt: requestType.updatedAt.toISOString(),
  };
}
