import { Module } from '@nestjs/common';
import { DEPARTMENT_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateDepartmentUseCase } from '../../application/use-cases/CreateDepartment/CreateDepartmentUseCase';
import { DeleteDepartmentUseCase } from '../../application/use-cases/DeleteDepartment/DeleteDepartmentUseCase';
import { GetDepartmentByIdUseCase } from '../../application/use-cases/GetDepartmentById/GetDepartmentByIdUseCase';
import { ListDepartmentsUseCase } from '../../application/use-cases/ListDepartments/ListDepartmentsUseCase';
import { UpdateDepartmentUseCase } from '../../application/use-cases/UpdateDepartment/UpdateDepartmentUseCase';
import { PrismaDepartmentRepository } from '../../infrastructure/database/repositories/prisma-department.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { DepartmentsController } from '../controller/departments.controller';

@Module({
  controllers: [DepartmentsController],
  providers: [
    PrismaService,
    { provide: DEPARTMENT_REPOSITORY, useClass: PrismaDepartmentRepository },
    {
      provide: ListDepartmentsUseCase,
      useFactory: (repo) => new ListDepartmentsUseCase(repo),
      inject: [DEPARTMENT_REPOSITORY],
    },
    {
      provide: GetDepartmentByIdUseCase,
      useFactory: (repo) => new GetDepartmentByIdUseCase(repo),
      inject: [DEPARTMENT_REPOSITORY],
    },
    {
      provide: CreateDepartmentUseCase,
      useFactory: (repo) => new CreateDepartmentUseCase(repo),
      inject: [DEPARTMENT_REPOSITORY],
    },
    {
      provide: UpdateDepartmentUseCase,
      useFactory: (repo) => new UpdateDepartmentUseCase(repo),
      inject: [DEPARTMENT_REPOSITORY],
    },
    {
      provide: DeleteDepartmentUseCase,
      useFactory: (repo) => new DeleteDepartmentUseCase(repo),
      inject: [DEPARTMENT_REPOSITORY],
    },
  ],
  exports: [
    ListDepartmentsUseCase,
    GetDepartmentByIdUseCase,
    CreateDepartmentUseCase,
    UpdateDepartmentUseCase,
    DeleteDepartmentUseCase,
  ],
})
export class DepartmentsModule {}
