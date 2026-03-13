import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import type { GetPublicHolidayByIdDTO } from './GetPublicHolidayByIdDTO';
import { GetPublicHolidayByIdValidator } from './GetPublicHolidayByIdValidator';
import { toPublicHolidayView, type PublicHolidayViewDTO } from './PublicHolidayViewDTO';

export class GetPublicHolidayByIdUseCase {
  constructor(private readonly publicHolidayRepository: PublicHolidayRepository) {}

  async execute(input: GetPublicHolidayByIdDTO): Promise<PublicHolidayViewDTO> {
    GetPublicHolidayByIdValidator.validate(input);

    const holiday = await this.publicHolidayRepository.findById(input.id.trim());

    if (!holiday) {
      throw new Error('Public holiday not found');
    }

    return toPublicHolidayView(holiday);
  }
}
