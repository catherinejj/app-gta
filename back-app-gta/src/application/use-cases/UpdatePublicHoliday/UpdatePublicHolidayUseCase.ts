import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import type { UpdatePublicHolidayDTO } from './UpdatePublicHolidayDTO';
import { UpdatePublicHolidayValidator } from './UpdatePublicHolidayValidator';
import { toPublicHolidayView, type PublicHolidayViewDTO } from '../GetPublicHolidayById/PublicHolidayViewDTO';

export class UpdatePublicHolidayUseCase {
  constructor(private readonly publicHolidayRepository: PublicHolidayRepository) {}

  async execute(input: UpdatePublicHolidayDTO): Promise<PublicHolidayViewDTO> {
    UpdatePublicHolidayValidator.validate(input);

    const holiday = await this.publicHolidayRepository.findById(input.id.trim());

    if (!holiday) {
      throw new Error('Public holiday not found');
    }

    if (input.date) {
      holiday.updateDate(new Date(input.date));
    }

    if (input.label) {
      holiday.updateLabel(input.label);
    }

    if (input.region !== undefined) {
      holiday.updateRegion(input.region);
    }

    if (input.isRecurring !== undefined) {
      holiday.updateIsRecurring(input.isRecurring);
    }

    const savedHoliday = await this.publicHolidayRepository.save(holiday);
    return toPublicHolidayView(savedHoliday);
  }
}
