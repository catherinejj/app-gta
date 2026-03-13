import { Module } from '@nestjs/common';
import { LEAVE_REQUEST_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateLeaveRequestUseCase } from '../../application/use-cases/CreateLeaveRequest/CreateLeaveRequestUseCase';
import { DeleteLeaveRequestUseCase } from '../../application/use-cases/DeleteLeaveRequest/DeleteLeaveRequestUseCase';
import { GetLeaveRequestByIdUseCase } from '../../application/use-cases/GetLeaveRequestById/GetLeaveRequestByIdUseCase';
import { ListLeaveRequestsUseCase } from '../../application/use-cases/ListLeaveRequests/ListLeaveRequestsUseCase';
import { UpdateLeaveRequestUseCase } from '../../application/use-cases/UpdateLeaveRequest/UpdateLeaveRequestUseCase';
import { PrismaLeaveRequestRepository } from '../../infrastructure/database/repositories/prisma-leave-request.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { LeaveRequestsController } from '../controller/leave-requests.controller';

@Module({
  controllers: [LeaveRequestsController],
  providers: [
    PrismaService,
    { provide: LEAVE_REQUEST_REPOSITORY, useClass: PrismaLeaveRequestRepository },
    {
      provide: ListLeaveRequestsUseCase,
      useFactory: (repo) => new ListLeaveRequestsUseCase(repo),
      inject: [LEAVE_REQUEST_REPOSITORY],
    },
    {
      provide: GetLeaveRequestByIdUseCase,
      useFactory: (repo) => new GetLeaveRequestByIdUseCase(repo),
      inject: [LEAVE_REQUEST_REPOSITORY],
    },
    {
      provide: CreateLeaveRequestUseCase,
      useFactory: (repo) => new CreateLeaveRequestUseCase(repo),
      inject: [LEAVE_REQUEST_REPOSITORY],
    },
    {
      provide: UpdateLeaveRequestUseCase,
      useFactory: (repo) => new UpdateLeaveRequestUseCase(repo),
      inject: [LEAVE_REQUEST_REPOSITORY],
    },
    {
      provide: DeleteLeaveRequestUseCase,
      useFactory: (repo) => new DeleteLeaveRequestUseCase(repo),
      inject: [LEAVE_REQUEST_REPOSITORY],
    },
  ],
  exports: [
    ListLeaveRequestsUseCase,
    GetLeaveRequestByIdUseCase,
    CreateLeaveRequestUseCase,
    UpdateLeaveRequestUseCase,
    DeleteLeaveRequestUseCase,
  ],
})
export class LeaveRequestsModule {}
