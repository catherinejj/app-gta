import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import type { DeleteDepartmentDTO } from './DeleteDepartmentDTO';
import { DeleteDepartmentValidator } from './DeleteDepartmentValidator';

export class DeleteDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(input: DeleteDepartmentDTO): Promise<void> {
    DeleteDepartmentValidator.validate(input);

    const department = await this.departmentRepository.findById(input.id.trim());

    if (!department) {
      throw new Error('Department not found');
    }

    await this.departmentRepository.delete(input.id.trim());
  }
}
