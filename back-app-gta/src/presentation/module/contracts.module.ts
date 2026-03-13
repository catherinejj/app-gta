import { Module } from '@nestjs/common';
import { CONTRACT_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateContractUseCase } from '../../application/use-cases/CreateContract/CreateContractUseCase';
import { DeleteContractUseCase } from '../../application/use-cases/DeleteContract/DeleteContractUseCase';
import { GetContractByIdUseCase } from '../../application/use-cases/GetContractById/GetContractByIdUseCase';
import { ListContractsUseCase } from '../../application/use-cases/ListContracts/ListContractsUseCase';
import { UpdateContractUseCase } from '../../application/use-cases/UpdateContract/UpdateContractUseCase';
import { PrismaContractRepository } from '../../infrastructure/database/repositories/prisma-contract.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { ContractsController } from '../controller/contracts.controller';

@Module({
  controllers: [ContractsController],
  providers: [
    PrismaService,
    { provide: CONTRACT_REPOSITORY, useClass: PrismaContractRepository },
    {
      provide: ListContractsUseCase,
      useFactory: (repo) => new ListContractsUseCase(repo),
      inject: [CONTRACT_REPOSITORY],
    },
    {
      provide: GetContractByIdUseCase,
      useFactory: (repo) => new GetContractByIdUseCase(repo),
      inject: [CONTRACT_REPOSITORY],
    },
    {
      provide: CreateContractUseCase,
      useFactory: (repo) => new CreateContractUseCase(repo),
      inject: [CONTRACT_REPOSITORY],
    },
    {
      provide: UpdateContractUseCase,
      useFactory: (repo) => new UpdateContractUseCase(repo),
      inject: [CONTRACT_REPOSITORY],
    },
    {
      provide: DeleteContractUseCase,
      useFactory: (repo) => new DeleteContractUseCase(repo),
      inject: [CONTRACT_REPOSITORY],
    },
  ],
  exports: [
    ListContractsUseCase,
    GetContractByIdUseCase,
    CreateContractUseCase,
    UpdateContractUseCase,
    DeleteContractUseCase,
  ],
})
export class ContractsModule {}
