import type { CreatePublicHolidayDTO } from './CreatePublicHolidayDTO';

export class CreatePublicHolidayValidator {
  static validate(input: CreatePublicHolidayDTO): void {
    if (!input.date?.trim()) {
      throw new Error('Date is required');
    }

    if (!input.label?.trim()) {
      throw new Error('Label is required');
    }

    // Validate date format
    const date = new Date(input.date);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  }
}
