import { Module } from '@nestjs/common';
import { REQUEST_TYPE_TAG_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateRequestTypeTagUseCase } from '../../application/use-cases/CreateRequestTypeTag/CreateRequestTypeTagUseCase';
import { DeleteRequestTypeTagUseCase } from '../../application/use-cases/DeleteRequestTypeTag/DeleteRequestTypeTagUseCase';
import { GetRequestTypeTagByIdUseCase } from '../../application/use-cases/GetRequestTypeTagById/GetRequestTypeTagByIdUseCase';
import { ListRequestTypeTagsUseCase } from '../../application/use-cases/ListRequestTypeTags/ListRequestTypeTagsUseCase';
import { UpdateRequestTypeTagUseCase } from '../../application/use-cases/UpdateRequestTypeTag/UpdateRequestTypeTagUseCase';
import { PrismaRequestTypeTagRepository } from '../../infrastructure/database/repositories/prisma-request-type-tag.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { RequestTypeTagsController } from '../controller/request-type-tags.controller';

@Module({
  controllers: [RequestTypeTagsController],
  providers: [
    PrismaService,
    { provide: REQUEST_TYPE_TAG_REPOSITORY, useClass: PrismaRequestTypeTagRepository },
    {
      provide: ListRequestTypeTagsUseCase,
      useFactory: (repo) => new ListRequestTypeTagsUseCase(repo),
      inject: [REQUEST_TYPE_TAG_REPOSITORY],
    },
    {
      provide: GetRequestTypeTagByIdUseCase,
      useFactory: (repo) => new GetRequestTypeTagByIdUseCase(repo),
      inject: [REQUEST_TYPE_TAG_REPOSITORY],
    },
    {
      provide: CreateRequestTypeTagUseCase,
      useFactory: (repo) => new CreateRequestTypeTagUseCase(repo),
      inject: [REQUEST_TYPE_TAG_REPOSITORY],
    },
    {
      provide: UpdateRequestTypeTagUseCase,
      useFactory: (repo) => new UpdateRequestTypeTagUseCase(repo),
      inject: [REQUEST_TYPE_TAG_REPOSITORY],
    },
    {
      provide: DeleteRequestTypeTagUseCase,
      useFactory: (repo) => new DeleteRequestTypeTagUseCase(repo),
      inject: [REQUEST_TYPE_TAG_REPOSITORY],
    },
  ],
  exports: [
    ListRequestTypeTagsUseCase,
    GetRequestTypeTagByIdUseCase,
    CreateRequestTypeTagUseCase,
    UpdateRequestTypeTagUseCase,
    DeleteRequestTypeTagUseCase,
  ],
})
export class RequestTypeTagsModule {}
