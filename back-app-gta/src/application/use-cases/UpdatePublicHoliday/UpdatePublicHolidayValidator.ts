import type { UpdatePublicHolidayDTO } from './UpdatePublicHolidayDTO';

export class UpdatePublicHolidayValidator {
  static validate(input: UpdatePublicHolidayDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Public holiday id is required');
    }

    if (input.date && input.date.trim()) {
      const date = new Date(input.date);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
    }

    if (input.label?.trim() === '') {
      throw new Error('Label cannot be empty');
    }
  }
}
