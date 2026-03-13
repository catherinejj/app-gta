import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import type { GetDepartmentByIdDTO } from './GetDepartmentByIdDTO';
import { GetDepartmentByIdValidator } from './GetDepartmentByIdValidator';
import { toDepartmentView, type DepartmentViewDTO } from './DepartmentViewDTO';

export class GetDepartmentByIdUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(input: GetDepartmentByIdDTO): Promise<DepartmentViewDTO> {
    GetDepartmentByIdValidator.validate(input);

    const department = await this.departmentRepository.findById(input.id.trim());

    if (!department) {
      throw new Error('Department not found');
    }

    return toDepartmentView(department);
  }
}
