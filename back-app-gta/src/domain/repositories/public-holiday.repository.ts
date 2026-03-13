import { PublicHoliday } from '../entities/public-holiday.entity';

export interface PublicHolidayRepository {
  findAll(): Promise<PublicHoliday[]>;
  findById(id: string): Promise<PublicHoliday | null>;
  findByDate(date: Date): Promise<PublicHoliday | null>;
  save(holiday: PublicHoliday): Promise<PublicHoliday>;
  delete(id: string): Promise<void>;
}
