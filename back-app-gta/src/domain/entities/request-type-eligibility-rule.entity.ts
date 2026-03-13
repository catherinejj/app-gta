import { ContractType, EligibilityOperator } from '@prisma/client';

export class RequestTypeEligibilityRule {
  private constructor(
    public readonly id: string,
    private requestTypeIdValue: string,
    private operatorValue: EligibilityOperator,
    private contractTypeValue: ContractType | null,
    private rqthRequiredValue: boolean | null,
    private teleworkEligibleOnlyValue: boolean | null,
    private minSeniorityMonthsValue: number | null,
    private maxSeniorityMonthsValue: number | null,
    private minWorkingRateValue: number | null,
    private maxWorkingRateValue: number | null,
    private departmentIdValue: string | null,
    private isActiveValue: boolean,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
  }): RequestTypeEligibilityRule {
    const id = params.id?.trim() ?? '';
    const requestTypeId = params.requestTypeId?.trim() ?? '';
    const operator = params.operator ?? EligibilityOperator.OR;
    const contractType = params.contractType ?? null;
    const rqthRequired = params.rqthRequired ?? null;
    const teleworkEligibleOnly = params.teleworkEligibleOnly ?? null;
    const minSeniorityMonths = params.minSeniorityMonths ?? null;
    const maxSeniorityMonths = params.maxSeniorityMonths ?? null;
    const minWorkingRate = params.minWorkingRate ?? null;
    const maxWorkingRate = params.maxWorkingRate ?? null;
    const departmentId = params.departmentId?.trim() || null;
    const isActive = params.isActive ?? true;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    RequestTypeEligibilityRule.validateRequestTypeId(requestTypeId);
    RequestTypeEligibilityRule.validateOperator(operator);
    RequestTypeEligibilityRule.validateContractType(contractType);
    RequestTypeEligibilityRule.validateNonNegativeInteger(minSeniorityMonths, 'Min seniority months');
    RequestTypeEligibilityRule.validateNonNegativeInteger(maxSeniorityMonths, 'Max seniority months');
    RequestTypeEligibilityRule.validateMinMax(
      minSeniorityMonths,
      maxSeniorityMonths,
      'Min seniority months',
      'Max seniority months',
    );
    RequestTypeEligibilityRule.validateRate(minWorkingRate, 'Min working rate');
    RequestTypeEligibilityRule.validateRate(maxWorkingRate, 'Max working rate');
    RequestTypeEligibilityRule.validateMinMax(
      minWorkingRate,
      maxWorkingRate,
      'Min working rate',
      'Max working rate',
    );

    return new RequestTypeEligibilityRule(
      id,
      requestTypeId,
      operator,
      contractType,
      rqthRequired,
      teleworkEligibleOnly,
      minSeniorityMonths,
      maxSeniorityMonths,
      minWorkingRate,
      maxWorkingRate,
      departmentId,
      isActive,
      createdAt,
      updatedAt,
    );
  }

  get requestTypeId(): string {
    return this.requestTypeIdValue;
  }

  get operator(): EligibilityOperator {
    return this.operatorValue;
  }

  get contractType(): ContractType | null {
    return this.contractTypeValue;
  }

  get rqthRequired(): boolean | null {
    return this.rqthRequiredValue;
  }

  get teleworkEligibleOnly(): boolean | null {
    return this.teleworkEligibleOnlyValue;
  }

  get minSeniorityMonths(): number | null {
    return this.minSeniorityMonthsValue;
  }

  get maxSeniorityMonths(): number | null {
    return this.maxSeniorityMonthsValue;
  }

  get minWorkingRate(): number | null {
    return this.minWorkingRateValue;
  }

  get maxWorkingRate(): number | null {
    return this.maxWorkingRateValue;
  }

  get departmentId(): string | null {
    return this.departmentIdValue;
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

  updateRequestTypeId(requestTypeId: string): void {
    const normalizedRequestTypeId = requestTypeId?.trim() ?? '';
    RequestTypeEligibilityRule.validateRequestTypeId(normalizedRequestTypeId);
    this.requestTypeIdValue = normalizedRequestTypeId;
  }

  updateOperator(operator: EligibilityOperator): void {
    RequestTypeEligibilityRule.validateOperator(operator);
    this.operatorValue = operator;
  }

  updateContractType(contractType: ContractType | null): void {
    RequestTypeEligibilityRule.validateContractType(contractType);
    this.contractTypeValue = contractType;
  }

  updateRqthRequired(rqthRequired: boolean | null): void {
    this.rqthRequiredValue = rqthRequired;
  }

  updateTeleworkEligibleOnly(teleworkEligibleOnly: boolean | null): void {
    this.teleworkEligibleOnlyValue = teleworkEligibleOnly;
  }

  updateMinSeniorityMonths(minSeniorityMonths: number | null): void {
    RequestTypeEligibilityRule.validateNonNegativeInteger(minSeniorityMonths, 'Min seniority months');
    RequestTypeEligibilityRule.validateMinMax(
      minSeniorityMonths,
      this.maxSeniorityMonthsValue,
      'Min seniority months',
      'Max seniority months',
    );
    this.minSeniorityMonthsValue = minSeniorityMonths;
  }

  updateMaxSeniorityMonths(maxSeniorityMonths: number | null): void {
    RequestTypeEligibilityRule.validateNonNegativeInteger(maxSeniorityMonths, 'Max seniority months');
    RequestTypeEligibilityRule.validateMinMax(
      this.minSeniorityMonthsValue,
      maxSeniorityMonths,
      'Min seniority months',
      'Max seniority months',
    );
    this.maxSeniorityMonthsValue = maxSeniorityMonths;
  }

  updateMinWorkingRate(minWorkingRate: number | null): void {
    RequestTypeEligibilityRule.validateRate(minWorkingRate, 'Min working rate');
    RequestTypeEligibilityRule.validateMinMax(
      minWorkingRate,
      this.maxWorkingRateValue,
      'Min working rate',
      'Max working rate',
    );
    this.minWorkingRateValue = minWorkingRate;
  }

  updateMaxWorkingRate(maxWorkingRate: number | null): void {
    RequestTypeEligibilityRule.validateRate(maxWorkingRate, 'Max working rate');
    RequestTypeEligibilityRule.validateMinMax(
      this.minWorkingRateValue,
      maxWorkingRate,
      'Min working rate',
      'Max working rate',
    );
    this.maxWorkingRateValue = maxWorkingRate;
  }

  updateDepartmentId(departmentId: string | null | undefined): void {
    this.departmentIdValue = departmentId?.trim() || null;
  }

  updateIsActive(isActive: boolean): void {
    this.isActiveValue = isActive;
  }

  private static validateRequestTypeId(requestTypeId: string): void {
    if (!requestTypeId) {
      throw new Error('Request type id is required');
    }
  }

  private static validateOperator(operator: EligibilityOperator): void {
    if (!Object.values(EligibilityOperator).includes(operator)) {
      throw new Error('Invalid eligibility operator');
    }
  }

  private static validateContractType(contractType: ContractType | null): void {
    if (contractType !== null && !Object.values(ContractType).includes(contractType)) {
      throw new Error('Invalid contract type');
    }
  }

  private static validateNonNegativeInteger(value: number | null, label: string): void {
    if (value === null) {
      return;
    }

    if (!Number.isInteger(value)) {
      throw new Error(`${label} must be an integer`);
    }

    if (value < 0) {
      throw new Error(`${label} cannot be negative`);
    }
  }

  private static validateRate(value: number | null, label: string): void {
    if (value === null) {
      return;
    }

    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0 || value > 100) {
      throw new Error(`${label} must be between 0 and 100`);
    }
  }

  private static validateMinMax(
    min: number | null,
    max: number | null,
    minLabel: string,
    maxLabel: string,
  ): void {
    if (min !== null && max !== null && min > max) {
      throw new Error(`${minLabel} cannot be greater than ${maxLabel.toLowerCase()}`);
    }
  }
}
