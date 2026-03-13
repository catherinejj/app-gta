import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import type { UpdateDepartmentDTO } from './UpdateDepartmentDTO';
import { UpdateDepartmentValidator } from './UpdateDepartmentValidator';
import { toDepartmentView, type DepartmentViewDTO } from '../GetDepartmentById/DepartmentViewDTO';

export class UpdateDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(input: UpdateDepartmentDTO): Promise<DepartmentViewDTO> {
    UpdateDepartmentValidator.validate(input);

    const department = await this.departmentRepository.findById(input.id.trim());

    if (!department) {
      throw new Error('Department not found');
    }

    if (input.name !== undefined) {
      department.updateName(input.name);
    }

    if (input.description !== undefined) {
      department.updateDescription(input.description);
    }

    if (input.isActive !== undefined) {
      department.updateIsActive(input.isActive);
    }

    const conflictingDepartment = await this.departmentRepository.findByName(department.name);

    if (conflictingDepartment && conflictingDepartment.id !== department.id) {
      throw new Error('Department already exists for this name');
    }

    const savedDepartment = await this.departmentRepository.save(department);
    return toDepartmentView(savedDepartment);
  }
}
