import { Module } from '@nestjs/common';
import {
  PUBLIC_HOLIDAY_REPOSITORY,
} from '../../application/ports/injection-tokens';
import { CreatePublicHolidayUseCase } from '../../application/use-cases/CreatePublicHoliday/CreatePublicHolidayUseCase';
import { DeletePublicHolidayUseCase } from '../../application/use-cases/DeletePublicHoliday/DeletePublicHolidayUseCase';
import { GetPublicHolidayByIdUseCase } from '../../application/use-cases/GetPublicHolidayById/GetPublicHolidayByIdUseCase';
import { ListPublicHolidaysUseCase } from '../../application/use-cases/ListPublicHolidays/ListPublicHolidaysUseCase';
import { UpdatePublicHolidayUseCase } from '../../application/use-cases/UpdatePublicHoliday/UpdatePublicHolidayUseCase';
import { PrismaPublicHolidayRepository } from '../../infrastructure/database/repositories/prisma-public-holiday.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { PublicHolidaysController } from '../controller/public-holidays.controller';

@Module({
  controllers: [PublicHolidaysController],
  providers: [
    PrismaService,
    { provide: PUBLIC_HOLIDAY_REPOSITORY, useClass: PrismaPublicHolidayRepository },
    {
      provide: ListPublicHolidaysUseCase,
      useFactory: (repo) => new ListPublicHolidaysUseCase(repo),
      inject: [PUBLIC_HOLIDAY_REPOSITORY],
    },
    {
      provide: GetPublicHolidayByIdUseCase,
      useFactory: (repo) => new GetPublicHolidayByIdUseCase(repo),
      inject: [PUBLIC_HOLIDAY_REPOSITORY],
    },
    {
      provide: CreatePublicHolidayUseCase,
      useFactory: (repo) => new CreatePublicHolidayUseCase(repo),
      inject: [PUBLIC_HOLIDAY_REPOSITORY],
    },
    {
      provide: UpdatePublicHolidayUseCase,
      useFactory: (repo) => new UpdatePublicHolidayUseCase(repo),
      inject: [PUBLIC_HOLIDAY_REPOSITORY],
    },
    {
      provide: DeletePublicHolidayUseCase,
      useFactory: (repo) => new DeletePublicHolidayUseCase(repo),
      inject: [PUBLIC_HOLIDAY_REPOSITORY],
    },
  ],
  exports: [
    ListPublicHolidaysUseCase,
    GetPublicHolidayByIdUseCase,
    CreatePublicHolidayUseCase,
    UpdatePublicHolidayUseCase,
    DeletePublicHolidayUseCase,
  ],
})
export class PublicHolidaysModule {}
