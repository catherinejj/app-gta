import type { DeletePublicHolidayDTO } from './DeletePublicHolidayDTO';

export class DeletePublicHolidayValidator {
  static validate(input: DeletePublicHolidayDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Public holiday id is required');
    }
  }
}
