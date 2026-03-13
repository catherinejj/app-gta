import type { GetPublicHolidayByIdDTO } from './GetPublicHolidayByIdDTO';

export class GetPublicHolidayByIdValidator {
  static validate(input: GetPublicHolidayByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Public holiday id is required');
    }
  }
}
