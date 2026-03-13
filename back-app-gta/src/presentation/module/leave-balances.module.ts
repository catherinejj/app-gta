import { Module } from '@nestjs/common';
import { LEAVE_BALANCE_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateLeaveBalanceUseCase } from '../../application/use-cases/CreateLeaveBalance/CreateLeaveBalanceUseCase';
import { DeleteLeaveBalanceUseCase } from '../../application/use-cases/DeleteLeaveBalance/DeleteLeaveBalanceUseCase';
import { GetLeaveBalanceByIdUseCase } from '../../application/use-cases/GetLeaveBalanceById/GetLeaveBalanceByIdUseCase';
import { ListLeaveBalancesUseCase } from '../../application/use-cases/ListLeaveBalances/ListLeaveBalancesUseCase';
import { UpdateLeaveBalanceUseCase } from '../../application/use-cases/UpdateLeaveBalance/UpdateLeaveBalanceUseCase';
import { PrismaLeaveBalanceRepository } from '../../infrastructure/database/repositories/prisma-leave-balance.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { LeaveBalancesController } from '../controller/leave-balances.controller';

@Module({
  controllers: [LeaveBalancesController],
  providers: [
    PrismaService,
    { provide: LEAVE_BALANCE_REPOSITORY, useClass: PrismaLeaveBalanceRepository },
    {
      provide: ListLeaveBalancesUseCase,
      useFactory: (repo) => new ListLeaveBalancesUseCase(repo),
      inject: [LEAVE_BALANCE_REPOSITORY],
    },
    {
      provide: GetLeaveBalanceByIdUseCase,
      useFactory: (repo) => new GetLeaveBalanceByIdUseCase(repo),
      inject: [LEAVE_BALANCE_REPOSITORY],
    },
    {
      provide: CreateLeaveBalanceUseCase,
      useFactory: (repo) => new CreateLeaveBalanceUseCase(repo),
      inject: [LEAVE_BALANCE_REPOSITORY],
    },
    {
      provide: UpdateLeaveBalanceUseCase,
      useFactory: (repo) => new UpdateLeaveBalanceUseCase(repo),
      inject: [LEAVE_BALANCE_REPOSITORY],
    },
    {
      provide: DeleteLeaveBalanceUseCase,
      useFactory: (repo) => new DeleteLeaveBalanceUseCase(repo),
      inject: [LEAVE_BALANCE_REPOSITORY],
    },
  ],
  exports: [
    ListLeaveBalancesUseCase,
    GetLeaveBalanceByIdUseCase,
    CreateLeaveBalanceUseCase,
    UpdateLeaveBalanceUseCase,
    DeleteLeaveBalanceUseCase,
  ],
})
export class LeaveBalancesModule {}
