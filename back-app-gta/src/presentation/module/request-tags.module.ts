import { Module } from '@nestjs/common';
import { REQUEST_TAG_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateRequestTagUseCase } from '../../application/use-cases/CreateRequestTag/CreateRequestTagUseCase';
import { DeleteRequestTagUseCase } from '../../application/use-cases/DeleteRequestTag/DeleteRequestTagUseCase';
import { GetRequestTagByIdUseCase } from '../../application/use-cases/GetRequestTagById/GetRequestTagByIdUseCase';
import { ListRequestTagsUseCase } from '../../application/use-cases/ListRequestTags/ListRequestTagsUseCase';
import { UpdateRequestTagUseCase } from '../../application/use-cases/UpdateRequestTag/UpdateRequestTagUseCase';
import { PrismaRequestTagRepository } from '../../infrastructure/database/repositories/prisma-request-tag.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { RequestTagsController } from '../controller/request-tags.controller';

@Module({
  controllers: [RequestTagsController],
  providers: [
    PrismaService,
    { provide: REQUEST_TAG_REPOSITORY, useClass: PrismaRequestTagRepository },
    {
      provide: ListRequestTagsUseCase,
      useFactory: (repo) => new ListRequestTagsUseCase(repo),
      inject: [REQUEST_TAG_REPOSITORY],
    },
    {
      provide: GetRequestTagByIdUseCase,
      useFactory: (repo) => new GetRequestTagByIdUseCase(repo),
      inject: [REQUEST_TAG_REPOSITORY],
    },
    {
      provide: CreateRequestTagUseCase,
      useFactory: (repo) => new CreateRequestTagUseCase(repo),
      inject: [REQUEST_TAG_REPOSITORY],
    },
    {
      provide: UpdateRequestTagUseCase,
      useFactory: (repo) => new UpdateRequestTagUseCase(repo),
      inject: [REQUEST_TAG_REPOSITORY],
    },
    {
      provide: DeleteRequestTagUseCase,
      useFactory: (repo) => new DeleteRequestTagUseCase(repo),
      inject: [REQUEST_TAG_REPOSITORY],
    },
  ],
  exports: [
    ListRequestTagsUseCase,
    GetRequestTagByIdUseCase,
    CreateRequestTagUseCase,
    UpdateRequestTagUseCase,
    DeleteRequestTagUseCase,
  ],
})
export class RequestTagsModule {}
