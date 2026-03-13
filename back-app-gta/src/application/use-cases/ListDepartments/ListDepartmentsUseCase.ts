import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import type { ListDepartmentsDTO } from './ListDepartmentsDTO';
import { ListDepartmentsValidator } from './ListDepartmentsValidator';
import { toDepartmentView, type DepartmentViewDTO } from '../GetDepartmentById/DepartmentViewDTO';

export class ListDepartmentsUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(input: ListDepartmentsDTO): Promise<DepartmentViewDTO[]> {
    ListDepartmentsValidator.validate(input);

    const departments = await this.departmentRepository.findAll();
    return departments.map(toDepartmentView);
  }
}
