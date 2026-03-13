import { PublicHoliday } from '../../../domain/entities/public-holiday.entity';
import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import type { CreatePublicHolidayDTO } from './CreatePublicHolidayDTO';
import { CreatePublicHolidayValidator } from './CreatePublicHolidayValidator';
import { toPublicHolidayView, type PublicHolidayViewDTO } from '../GetPublicHolidayById/PublicHolidayViewDTO';

export class CreatePublicHolidayUseCase {
  constructor(private readonly publicHolidayRepository: PublicHolidayRepository) {}

  async execute(input: CreatePublicHolidayDTO): Promise<PublicHolidayViewDTO> {
    CreatePublicHolidayValidator.validate(input);

    const date = new Date(input.date);
    const region = input.region?.trim() || null;
    const isRecurring = input.isRecurring ?? false;

    const holiday = PublicHoliday.create({
      date,
      label: input.label,
      region,
      isRecurring,
    });

    const savedHoliday = await this.publicHolidayRepository.save(holiday);
    return toPublicHolidayView(savedHoliday);
  }
}
