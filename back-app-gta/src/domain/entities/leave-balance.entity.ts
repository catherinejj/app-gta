export class LeaveBalance {
  private constructor(
    public readonly id: string,
    private userIdValue: string,
    private requestTypeIdValue: string,
    private yearValue: number,
    private acquiredDaysValue: number,
    private usedDaysValue: number,
    private pendingDaysValue: number,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    userId: string;
    requestTypeId: string;
    year: number;
    acquiredDays?: number;
    usedDays?: number;
    pendingDays?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }): LeaveBalance {
    const id = params.id?.trim() ?? '';
    const userId = params.userId?.trim() ?? '';
    const requestTypeId = params.requestTypeId?.trim() ?? '';
    const year = params.year;
    const acquiredDays = params.acquiredDays ?? 0;
    const usedDays = params.usedDays ?? 0;
    const pendingDays = params.pendingDays ?? 0;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    LeaveBalance.validateUserId(userId);
    LeaveBalance.validateRequestTypeId(requestTypeId);
    LeaveBalance.validateYear(year);
    LeaveBalance.validateDays(acquiredDays, 'Acquired days');
    LeaveBalance.validateDays(usedDays, 'Used days');
    LeaveBalance.validateDays(pendingDays, 'Pending days');
    LeaveBalance.validateTotals(acquiredDays, usedDays, pendingDays);

    return new LeaveBalance(
      id,
      userId,
      requestTypeId,
      year,
      acquiredDays,
      usedDays,
      pendingDays,
      createdAt,
      updatedAt,
    );
  }

  get userId(): string {
    return this.userIdValue;
  }

  get requestTypeId(): string {
    return this.requestTypeIdValue;
  }

  get year(): number {
    return this.yearValue;
  }

  get acquiredDays(): number {
    return this.acquiredDaysValue;
  }

  get usedDays(): number {
    return this.usedDaysValue;
  }

  get pendingDays(): number {
    return this.pendingDaysValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateUserId(userId: string): void {
    const normalizedUserId = userId?.trim() ?? '';
    LeaveBalance.validateUserId(normalizedUserId);
    this.userIdValue = normalizedUserId;
  }

  updateRequestTypeId(requestTypeId: string): void {
    const normalizedRequestTypeId = requestTypeId?.trim() ?? '';
    LeaveBalance.validateRequestTypeId(normalizedRequestTypeId);
    this.requestTypeIdValue = normalizedRequestTypeId;
  }

  updateYear(year: number): void {
    LeaveBalance.validateYear(year);
    this.yearValue = year;
  }

  updateAcquiredDays(acquiredDays: number): void {
    LeaveBalance.validateDays(acquiredDays, 'Acquired days');
    LeaveBalance.validateTotals(acquiredDays, this.usedDaysValue, this.pendingDaysValue);
    this.acquiredDaysValue = acquiredDays;
  }

  updateUsedDays(usedDays: number): void {
    LeaveBalance.validateDays(usedDays, 'Used days');
    LeaveBalance.validateTotals(this.acquiredDaysValue, usedDays, this.pendingDaysValue);
    this.usedDaysValue = usedDays;
  }

  updatePendingDays(pendingDays: number): void {
    LeaveBalance.validateDays(pendingDays, 'Pending days');
    LeaveBalance.validateTotals(this.acquiredDaysValue, this.usedDaysValue, pendingDays);
    this.pendingDaysValue = pendingDays;
  }

  private static validateUserId(userId: string): void {
    if (!userId) {
      throw new Error('User id is required');
    }
  }

  private static validateRequestTypeId(requestTypeId: string): void {
    if (!requestTypeId) {
      throw new Error('Request type id is required');
    }
  }

  private static validateYear(year: number): void {
    if (!Number.isInteger(year)) {
      throw new Error('Year must be an integer');
    }

    if (year < 1900 || year > 2100) {
      throw new Error('Year is invalid');
    }
  }

  private static validateDays(value: number, label: string): void {
    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a valid number`);
    }

    if (value < 0) {
      throw new Error(`${label} cannot be negative`);
    }
  }

  private static validateTotals(
    acquiredDays: number,
    usedDays: number,
    pendingDays: number,
  ): void {
    if (usedDays + pendingDays > acquiredDays) {
      throw new Error('Used days and pending days cannot exceed acquired days');
    }
  }
}
