import { DayPart, RequestStatus } from '@prisma/client';
import type { CreateLeaveRequestDTO } from './CreateLeaveRequestDTO';

export class CreateLeaveRequestValidator {
  static validate(input: CreateLeaveRequestDTO): void {
    if (!input.userId?.trim()) {
      throw new Error('User id is required');
    }

    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    this.validateDateString(input.startDate, 'Start date');
    this.validateDateString(input.endDate, 'End date');

    if (input.startPart !== undefined && !Object.values(DayPart).includes(input.startPart)) {
      throw new Error('Start part is invalid');
    }

    if (input.endPart !== undefined && !Object.values(DayPart).includes(input.endPart)) {
      throw new Error('End part is invalid');
    }

    if (input.durationDays !== undefined) {
      if (!Number.isFinite(input.durationDays)) {
        throw new Error('Duration days must be a valid number');
      }

      if (input.durationDays < 0) {
        throw new Error('Duration days cannot be negative');
      }
    }

    if (input.status !== undefined && !Object.values(RequestStatus).includes(input.status)) {
      throw new Error('Invalid request status');
    }
  }

  private static validateDateString(value: string, label: string): void {
    if (!value?.trim()) {
      throw new Error(`${label} is required`);
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`${label} is invalid`);
    }
  }
}
