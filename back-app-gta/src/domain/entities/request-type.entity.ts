import { RequestCategory } from '@prisma/client';

export class RequestType {
  private constructor(
    public readonly id: string,
    private codeValue: string,
    private labelValue: string,
    private descriptionValue: string | null,
    private categoryValue: RequestCategory,
    private parentIdValue: string | null,
    private requiresApprovalValue: boolean,
    private requiresBalanceValue: boolean,
    private requiresDocumentValue: boolean,
    private rqthOnlyValue: boolean,
    private requiresTeleworkEligibilityValue: boolean,
    private colorValue: string | null,
    private iconValue: string | null,
    private displayOrderValue: number,
    private isActiveValue: boolean,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
  }): RequestType {
    const id = params.id?.trim() ?? '';
    const code = RequestType.normalizeCode(params.code);
    const label = params.label?.trim() ?? '';
    const description = params.description?.trim() || null;
    const category = params.category;
    const parentId = params.parentId?.trim() || null;
    const requiresApproval = params.requiresApproval ?? true;
    const requiresBalance = params.requiresBalance ?? true;
    const requiresDocument = params.requiresDocument ?? false;
    const rqthOnly = params.rqthOnly ?? false;
    const requiresTeleworkEligibility = params.requiresTeleworkEligibility ?? false;
    const color = params.color?.trim() || null;
    const icon = params.icon?.trim() || null;
    const displayOrder = params.displayOrder ?? 0;
    const isActive = params.isActive ?? true;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    if (!code) {
      throw new Error('Code is required');
    }

    if (!label) {
      throw new Error('Label is required');
    }

    if (!Object.values(RequestCategory).includes(category)) {
      throw new Error('Invalid request category');
    }

    if (!Number.isInteger(displayOrder)) {
      throw new Error('Display order must be an integer');
    }

    return new RequestType(
      id,
      code,
      label,
      description,
      category,
      parentId,
      requiresApproval,
      requiresBalance,
      requiresDocument,
      rqthOnly,
      requiresTeleworkEligibility,
      color,
      icon,
      displayOrder,
      isActive,
      createdAt,
      updatedAt,
    );
  }

  get code(): string {
    return this.codeValue;
  }

  get label(): string {
    return this.labelValue;
  }

  get description(): string | null {
    return this.descriptionValue;
  }

  get category(): RequestCategory {
    return this.categoryValue;
  }

  get parentId(): string | null {
    return this.parentIdValue;
  }

  get requiresApproval(): boolean {
    return this.requiresApprovalValue;
  }

  get requiresBalance(): boolean {
    return this.requiresBalanceValue;
  }

  get requiresDocument(): boolean {
    return this.requiresDocumentValue;
  }

  get rqthOnly(): boolean {
    return this.rqthOnlyValue;
  }

  get requiresTeleworkEligibility(): boolean {
    return this.requiresTeleworkEligibilityValue;
  }

  get color(): string | null {
    return this.colorValue;
  }

  get icon(): string | null {
    return this.iconValue;
  }

  get displayOrder(): number {
    return this.displayOrderValue;
  }

  get isActive(): boolean {
    return this.isActiveValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateCode(code: string): void {
    const normalizedCode = RequestType.normalizeCode(code);
    if (!normalizedCode) {
      throw new Error('Code is required');
    }
    this.codeValue = normalizedCode;
  }

  updateLabel(label: string): void {
    const normalizedLabel = label?.trim() ?? '';
    if (!normalizedLabel) {
      throw new Error('Label is required');
    }
    this.labelValue = normalizedLabel;
  }

  updateDescription(description: string | null | undefined): void {
    this.descriptionValue = description?.trim() || null;
  }

  updateCategory(category: RequestCategory): void {
    if (!Object.values(RequestCategory).includes(category)) {
      throw new Error('Invalid request category');
    }
    this.categoryValue = category;
  }

  updateParentId(parentId: string | null | undefined): void {
    this.parentIdValue = parentId?.trim() || null;
  }

  updateRequiresApproval(requiresApproval: boolean): void {
    this.requiresApprovalValue = requiresApproval;
  }

  updateRequiresBalance(requiresBalance: boolean): void {
    this.requiresBalanceValue = requiresBalance;
  }

  updateRequiresDocument(requiresDocument: boolean): void {
    this.requiresDocumentValue = requiresDocument;
  }

  updateRqthOnly(rqthOnly: boolean): void {
    this.rqthOnlyValue = rqthOnly;
  }

  updateRequiresTeleworkEligibility(requiresTeleworkEligibility: boolean): void {
    this.requiresTeleworkEligibilityValue = requiresTeleworkEligibility;
  }

  updateColor(color: string | null | undefined): void {
    this.colorValue = color?.trim() || null;
  }

  updateIcon(icon: string | null | undefined): void {
    this.iconValue = icon?.trim() || null;
  }

  updateDisplayOrder(displayOrder: number): void {
    if (!Number.isInteger(displayOrder)) {
      throw new Error('Display order must be an integer');
    }
    this.displayOrderValue = displayOrder;
  }

  updateIsActive(isActive: boolean): void {
    this.isActiveValue = isActive;
  }

  private static normalizeCode(code: string): string {
    return code?.trim().toUpperCase() ?? '';
  }
}
