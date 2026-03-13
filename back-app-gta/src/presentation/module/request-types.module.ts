import { Module } from '@nestjs/common';
import { REQUEST_TYPE_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateRequestTypeUseCase } from '../../application/use-cases/CreateRequestType/CreateRequestTypeUseCase';
import { CreateRequestTypeTagUseCase } from '../../application/use-cases/CreateRequestTypeTag/CreateRequestTypeTagUseCase';
import { DeleteRequestTypeUseCase } from '../../application/use-cases/DeleteRequestType/DeleteRequestTypeUseCase';
import { DeleteRequestTypeTagUseCase } from '../../application/use-cases/DeleteRequestTypeTag/DeleteRequestTypeTagUseCase';
import { GetRequestTypeByIdUseCase } from '../../application/use-cases/GetRequestTypeById/GetRequestTypeByIdUseCase';
import { ListRequestTypesUseCase } from '../../application/use-cases/ListRequestTypes/ListRequestTypesUseCase';
import { UpdateRequestTypeUseCase } from '../../application/use-cases/UpdateRequestType/UpdateRequestTypeUseCase';
import { PrismaRequestTypeRepository } from '../../infrastructure/database/repositories/prisma-request-type.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { RequestTypeTagsModule } from './request-type-tags.module';
import { RequestTypesController } from '../controller/request-types.controller';

@Module({
  imports: [RequestTypeTagsModule],
  controllers: [RequestTypesController],
  providers: [
    PrismaService,
    { provide: REQUEST_TYPE_REPOSITORY, useClass: PrismaRequestTypeRepository },
    {
      provide: ListRequestTypesUseCase,
      useFactory: (repo) => new ListRequestTypesUseCase(repo),
      inject: [REQUEST_TYPE_REPOSITORY],
    },
    {
      provide: GetRequestTypeByIdUseCase,
      useFactory: (repo) => new GetRequestTypeByIdUseCase(repo),
      inject: [REQUEST_TYPE_REPOSITORY],
    },
    {
      provide: CreateRequestTypeUseCase,
      useFactory: (repo) => new CreateRequestTypeUseCase(repo),
      inject: [REQUEST_TYPE_REPOSITORY],
    },
    {
      provide: UpdateRequestTypeUseCase,
      useFactory: (repo) => new UpdateRequestTypeUseCase(repo),
      inject: [REQUEST_TYPE_REPOSITORY],
    },
    {
      provide: DeleteRequestTypeUseCase,
      useFactory: (repo) => new DeleteRequestTypeUseCase(repo),
      inject: [REQUEST_TYPE_REPOSITORY],
    },
  ],
  exports: [
    ListRequestTypesUseCase,
    GetRequestTypeByIdUseCase,
    CreateRequestTypeUseCase,
    UpdateRequestTypeUseCase,
    DeleteRequestTypeUseCase,
  ],
})
export class RequestTypesModule {}
