import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import type { DeletePublicHolidayDTO } from './DeletePublicHolidayDTO';
import { DeletePublicHolidayValidator } from './DeletePublicHolidayValidator';

export class DeletePublicHolidayUseCase {
  constructor(private readonly publicHolidayRepository: PublicHolidayRepository) {}

  async execute(input: DeletePublicHolidayDTO): Promise<void> {
    DeletePublicHolidayValidator.validate(input);

    const holiday = await this.publicHolidayRepository.findById(input.id.trim());

    if (!holiday) {
      throw new Error('Public holiday not found');
    }

    await this.publicHolidayRepository.delete(input.id.trim());
  }
}
