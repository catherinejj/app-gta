import { DayPart, RequestStatus } from '@prisma/client';
import type { UpdateLeaveRequestDTO } from './UpdateLeaveRequestDTO';

export class UpdateLeaveRequestValidator {
  static validate(input: UpdateLeaveRequestDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Leave request id is required');
    }

    if (input.userId !== undefined && !input.userId.trim()) {
      throw new Error('User id cannot be empty');
    }

    if (input.requestTypeId !== undefined && !input.requestTypeId.trim()) {
      throw new Error('Request type id cannot be empty');
    }

    if (input.startDate !== undefined) {
      this.validateDateString(input.startDate, 'Start date');
    }

    if (input.endDate !== undefined) {
      this.validateDateString(input.endDate, 'End date');
    }

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
      throw new Error(`${label} cannot be empty`);
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`${label} is invalid`);
    }
  }
}
