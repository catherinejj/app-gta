import { Injectable } from '@nestjs/common';
import { PublicHoliday } from '../../../domain/entities/public-holiday.entity';
import { PublicHolidayRepository } from '../../../domain/repositories/public-holiday.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPublicHolidayRepository implements PublicHolidayRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PublicHoliday[]> {
    const records = await (this.prisma.publicHoliday as any).findMany({
      orderBy: { date: 'asc' },
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<PublicHoliday | null> {
    const record = await (this.prisma.publicHoliday as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByDate(date: Date): Promise<PublicHoliday | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const record = await (this.prisma.publicHoliday as any).findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(holiday: PublicHoliday): Promise<PublicHoliday> {
    if (holiday.id) {
      const record = await (this.prisma.publicHoliday as any).update({
        where: { id: holiday.id },
        data: {
          date: holiday.date,
          label: holiday.label,
          region: holiday.region,
          isRecurring: holiday.isRecurring,
        },
      });

      return this.toDomain(record);
    } else {
      const record = await (this.prisma.publicHoliday as any).create({
        data: {
          date: holiday.date,
          label: holiday.label,
          region: holiday.region,
          isRecurring: holiday.isRecurring,
        },
      });

      return this.toDomain(record);
    }
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.publicHoliday as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): PublicHoliday {
    return PublicHoliday.create({
      id: record.id,
      date: record.date,
      label: record.label,
      region: record.region,
      isRecurring: record.isRecurring,
      createdAt: record.createdAt,
    });
  }
}
