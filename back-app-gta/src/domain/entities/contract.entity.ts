import { ContractStatus, ContractType } from '@prisma/client';

export class Contract {
  private constructor(
    public readonly id: string,
    private userIdValue: string,
    private contractTypeValue: ContractType,
    private statusValue: ContractStatus,
    private startDateValue: Date,
    private endDateValue: Date | null,
    private jobTitleValue: string | null,
    private workingRateValue: number,
    private teleworkEligibleValue: boolean,
    private annualLeaveEntitlementValue: number,
    private rttEntitlementValue: number,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    userId: string;
    contractType: ContractType;
    status?: ContractStatus;
    startDate: Date;
    endDate?: Date | null;
    jobTitle?: string | null;
    workingRate?: number;
    teleworkEligible?: boolean;
    annualLeaveEntitlement?: number;
    rttEntitlement?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }): Contract {
    const id = params.id?.trim() ?? '';
    const userId = params.userId?.trim() ?? '';
    const contractType = params.contractType;
    const status = params.status ?? ContractStatus.ACTIVE;
    const startDate = params.startDate;
    const endDate = params.endDate ?? null;
    const jobTitle = params.jobTitle?.trim() || null;
    const workingRate = params.workingRate ?? 100;
    const teleworkEligible = params.teleworkEligible ?? false;
    const annualLeaveEntitlement = params.annualLeaveEntitlement ?? 25;
    const rttEntitlement = params.rttEntitlement ?? 0;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    Contract.validateUserId(userId);
    Contract.validateContractType(contractType);
    Contract.validateStatus(status);
    Contract.validateDate(startDate, 'Start date');
    if (endDate) {
      Contract.validateDate(endDate, 'End date');
    }
    Contract.validateDateRange(startDate, endDate);
    Contract.validatePercentage(workingRate, 'Working rate');
    Contract.validateNonNegativeNumber(annualLeaveEntitlement, 'Annual leave entitlement');
    Contract.validateNonNegativeNumber(rttEntitlement, 'RTT entitlement');

    return new Contract(
      id,
      userId,
      contractType,
      status,
      startDate,
      endDate,
      jobTitle,
      workingRate,
      teleworkEligible,
      annualLeaveEntitlement,
      rttEntitlement,
      createdAt,
      updatedAt,
    );
  }

  get userId(): string {
    return this.userIdValue;
  }

  get contractType(): ContractType {
    return this.contractTypeValue;
  }

  get status(): ContractStatus {
    return this.statusValue;
  }

  get startDate(): Date {
    return this.startDateValue;
  }

  get endDate(): Date | null {
    return this.endDateValue;
  }

  get jobTitle(): string | null {
    return this.jobTitleValue;
  }

  get workingRate(): number {
    return this.workingRateValue;
  }

  get teleworkEligible(): boolean {
    return this.teleworkEligibleValue;
  }

  get annualLeaveEntitlement(): number {
    return this.annualLeaveEntitlementValue;
  }

  get rttEntitlement(): number {
    return this.rttEntitlementValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateUserId(userId: string): void {
    const normalizedUserId = userId?.trim() ?? '';
    Contract.validateUserId(normalizedUserId);
    this.userIdValue = normalizedUserId;
  }

  updateContractType(contractType: ContractType): void {
    Contract.validateContractType(contractType);
    this.contractTypeValue = contractType;
  }

  updateStatus(status: ContractStatus): void {
    Contract.validateStatus(status);
    this.statusValue = status;
  }

  updateStartDate(startDate: Date): void {
    Contract.validateDate(startDate, 'Start date');
    Contract.validateDateRange(startDate, this.endDateValue);
    this.startDateValue = startDate;
  }

  updateEndDate(endDate: Date | null): void {
    if (endDate) {
      Contract.validateDate(endDate, 'End date');
    }
    Contract.validateDateRange(this.startDateValue, endDate);
    this.endDateValue = endDate;
  }

  updateJobTitle(jobTitle: string | null | undefined): void {
    this.jobTitleValue = jobTitle?.trim() || null;
  }

  updateWorkingRate(workingRate: number): void {
    Contract.validatePercentage(workingRate, 'Working rate');
    this.workingRateValue = workingRate;
  }

  updateTeleworkEligible(teleworkEligible: boolean): void {
    this.teleworkEligibleValue = teleworkEligible;
  }

  updateAnnualLeaveEntitlement(annualLeaveEntitlement: number): void {
    Contract.validateNonNegativeNumber(annualLeaveEntitlement, 'Annual leave entitlement');
    this.annualLeaveEntitlementValue = annualLeaveEntitlement;
  }

  updateRttEntitlement(rttEntitlement: number): void {
    Contract.validateNonNegativeNumber(rttEntitlement, 'RTT entitlement');
    this.rttEntitlementValue = rttEntitlement;
  }

  private static validateUserId(userId: string): void {
    if (!userId) {
      throw new Error('User id is required');
    }
  }

  private static validateContractType(contractType: ContractType): void {
    if (!Object.values(ContractType).includes(contractType)) {
      throw new Error('Invalid contract type');
    }
  }

  private static validateStatus(status: ContractStatus): void {
    if (!Object.values(ContractStatus).includes(status)) {
      throw new Error('Invalid contract status');
    }
  }

  private static validateDate(value: Date, label: string): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error(`${label} is invalid`);
    }
  }

  private static validateDateRange(startDate: Date, endDate: Date | null): void {
    if (endDate && endDate.getTime() < startDate.getTime()) {
      throw new Error('End date cannot be before start date');
    }
  }

  private static validatePercentage(value: number, label: string): void {
    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0 || value > 100) {
      throw new Error(`${label} must be between 0 and 100`);
    }
  }

  private static validateNonNegativeNumber(value: number, label: string): void {
    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0) {
      throw new Error(`${label} cannot be negative`);
    }
  }
}
