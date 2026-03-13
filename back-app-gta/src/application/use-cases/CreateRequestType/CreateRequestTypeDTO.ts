import { RequestCategory } from '@prisma/client';

export interface CreateRequestTypeDTO {
  code: string;
  label: string;
  description?: string | null;
  category: RequestCategory;
  parentId?: string | null;
  requiresApproval?: boolean;
  requiresBalance?: boolean;
  requiresDocument?: boolean;
  rqthOnly?: boolean;
  requiresTeleworkEligibility?: boolean;
  color?: string | null;
  icon?: string | null;
  displayOrder?: number;
  isActive?: boolean;
}
