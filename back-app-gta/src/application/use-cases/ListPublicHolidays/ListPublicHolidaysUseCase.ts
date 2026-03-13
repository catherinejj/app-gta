import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import type { ListPublicHolidaysDTO } from './ListPublicHolidaysDTO';
import { ListPublicHolidaysValidator } from './ListPublicHolidaysValidator';
import { toPublicHolidayView, type PublicHolidayViewDTO } from '../GetPublicHolidayById/PublicHolidayViewDTO';

export class ListPublicHolidaysUseCase {
  constructor(private readonly publicHolidayRepository: PublicHolidayRepository) {}

  async execute(input: ListPublicHolidaysDTO): Promise<PublicHolidayViewDTO[]> {
    ListPublicHolidaysValidator.validate(input);

    const holidays = await this.publicHolidayRepository.findAll();
    return holidays.map(toPublicHolidayView);
  }
}
