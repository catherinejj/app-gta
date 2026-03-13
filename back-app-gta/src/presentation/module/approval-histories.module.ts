import { Module } from '@nestjs/common';
import { APPROVAL_HISTORY_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateApprovalHistoryUseCase } from '../../application/use-cases/CreateApprovalHistory/CreateApprovalHistoryUseCase';
import { DeleteApprovalHistoryUseCase } from '../../application/use-cases/DeleteApprovalHistory/DeleteApprovalHistoryUseCase';
import { GetApprovalHistoryByIdUseCase } from '../../application/use-cases/GetApprovalHistoryById/GetApprovalHistoryByIdUseCase';
import { ListApprovalHistoriesUseCase } from '../../application/use-cases/ListApprovalHistories/ListApprovalHistoriesUseCase';
import { UpdateApprovalHistoryUseCase } from '../../application/use-cases/UpdateApprovalHistory/UpdateApprovalHistoryUseCase';
import { PrismaApprovalHistoryRepository } from '../../infrastructure/database/repositories/prisma-approval-history.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { ApprovalHistoriesController } from '../controller/approval-histories.controller';

@Module({
  controllers: [ApprovalHistoriesController],
  providers: [
    PrismaService,
    { provide: APPROVAL_HISTORY_REPOSITORY, useClass: PrismaApprovalHistoryRepository },
    {
      provide: ListApprovalHistoriesUseCase,
      useFactory: (repo) => new ListApprovalHistoriesUseCase(repo),
      inject: [APPROVAL_HISTORY_REPOSITORY],
    },
    {
      provide: GetApprovalHistoryByIdUseCase,
      useFactory: (repo) => new GetApprovalHistoryByIdUseCase(repo),
      inject: [APPROVAL_HISTORY_REPOSITORY],
    },
    {
      provide: CreateApprovalHistoryUseCase,
      useFactory: (repo) => new CreateApprovalHistoryUseCase(repo),
      inject: [APPROVAL_HISTORY_REPOSITORY],
    },
    {
      provide: UpdateApprovalHistoryUseCase,
      useFactory: (repo) => new UpdateApprovalHistoryUseCase(repo),
      inject: [APPROVAL_HISTORY_REPOSITORY],
    },
    {
      provide: DeleteApprovalHistoryUseCase,
      useFactory: (repo) => new DeleteApprovalHistoryUseCase(repo),
      inject: [APPROVAL_HISTORY_REPOSITORY],
    },
  ],
  exports: [
    ListApprovalHistoriesUseCase,
    GetApprovalHistoryByIdUseCase,
    CreateApprovalHistoryUseCase,
    UpdateApprovalHistoryUseCase,
    DeleteApprovalHistoryUseCase,
  ],
})
export class ApprovalHistoriesModule {}
