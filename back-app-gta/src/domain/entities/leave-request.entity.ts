import { DayPart, RequestStatus } from '@prisma/client';

export class LeaveRequest {
  private constructor(
    public readonly id: string,
    private userIdValue: string,
    private requestTypeIdValue: string,
    private startDateValue: Date,
    private endDateValue: Date,
    private startPartValue: DayPart,
    private endPartValue: DayPart,
    private durationDaysValue: number,
    private reasonValue: string | null,
    private statusValue: RequestStatus,
    private documentPathValue: string | null,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    userId: string;
    requestTypeId: string;
    startDate: Date;
    endDate: Date;
    startPart?: DayPart;
    endPart?: DayPart;
    durationDays?: number;
    reason?: string | null;
    status?: RequestStatus;
    documentPath?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): LeaveRequest {
    const id = params.id?.trim() ?? '';
    const userId = params.userId?.trim() ?? '';
    const requestTypeId = params.requestTypeId?.trim() ?? '';
    const startDate = params.startDate;
    const endDate = params.endDate;
    const startPart = params.startPart ?? DayPart.FULL_DAY;
    const endPart = params.endPart ?? DayPart.FULL_DAY;
    const durationDays = params.durationDays ?? 0;
    const reason = params.reason?.trim() || null;
    const status = params.status ?? RequestStatus.PENDING;
    const documentPath = params.documentPath?.trim() || null;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    LeaveRequest.validateUserId(userId);
    LeaveRequest.validateRequestTypeId(requestTypeId);
    LeaveRequest.validateDate(startDate, 'Start date');
    LeaveRequest.validateDate(endDate, 'End date');
    LeaveRequest.validateDateRange(startDate, endDate);
    LeaveRequest.validateDayPart(startPart, 'Start part');
    LeaveRequest.validateDayPart(endPart, 'End part');
    LeaveRequest.validateDurationDays(durationDays);
    LeaveRequest.validateStatus(status);

    return new LeaveRequest(
      id,
      userId,
      requestTypeId,
      startDate,
      endDate,
      startPart,
      endPart,
      durationDays,
      reason,
      status,
      documentPath,
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

  get startDate(): Date {
    return this.startDateValue;
  }

  get endDate(): Date {
    return this.endDateValue;
  }

  get startPart(): DayPart {
    return this.startPartValue;
  }

  get endPart(): DayPart {
    return this.endPartValue;
  }

  get durationDays(): number {
    return this.durationDaysValue;
  }

  get reason(): string | null {
    return this.reasonValue;
  }

  get status(): RequestStatus {
    return this.statusValue;
  }

  get documentPath(): string | null {
    return this.documentPathValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateUserId(userId: string): void {
    const normalizedUserId = userId?.trim() ?? '';
    LeaveRequest.validateUserId(normalizedUserId);
    this.userIdValue = normalizedUserId;
  }

  updateRequestTypeId(requestTypeId: string): void {
    const normalizedRequestTypeId = requestTypeId?.trim() ?? '';
    LeaveRequest.validateRequestTypeId(normalizedRequestTypeId);
    this.requestTypeIdValue = normalizedRequestTypeId;
  }

  updateStartDate(startDate: Date): void {
    LeaveRequest.validateDate(startDate, 'Start date');
    LeaveRequest.validateDateRange(startDate, this.endDateValue);
    this.startDateValue = startDate;
  }

  updateEndDate(endDate: Date): void {
    LeaveRequest.validateDate(endDate, 'End date');
    LeaveRequest.validateDateRange(this.startDateValue, endDate);
    this.endDateValue = endDate;
  }

  updateStartPart(startPart: DayPart): void {
    LeaveRequest.validateDayPart(startPart, 'Start part');
    this.startPartValue = startPart;
  }

  updateEndPart(endPart: DayPart): void {
    LeaveRequest.validateDayPart(endPart, 'End part');
    this.endPartValue = endPart;
  }

  updateDurationDays(durationDays: number): void {
    LeaveRequest.validateDurationDays(durationDays);
    this.durationDaysValue = durationDays;
  }

  updateReason(reason: string | null | undefined): void {
    this.reasonValue = reason?.trim() || null;
  }

  updateStatus(status: RequestStatus): void {
    LeaveRequest.validateStatus(status);
    this.statusValue = status;
  }

  updateDocumentPath(documentPath: string | null | undefined): void {
    this.documentPathValue = documentPath?.trim() || null;
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

  private static validateDate(value: Date, label: string): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error(`${label} is invalid`);
    }
  }

  private static validateDateRange(startDate: Date, endDate: Date): void {
    if (endDate.getTime() < startDate.getTime()) {
      throw new Error('End date cannot be before start date');
    }
  }

  private static validateDayPart(value: DayPart, label: string): void {
    if (!Object.values(DayPart).includes(value)) {
      throw new Error(`${label} is invalid`);
    }
  }

  private static validateDurationDays(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error('Duration days must be a valid number');
    }

    if (value < 0) {
      throw new Error('Duration days cannot be negative');
    }
  }

  private static validateStatus(status: RequestStatus): void {
    if (!Object.values(RequestStatus).includes(status)) {
      throw new Error('Invalid request status');
    }
  }
}
