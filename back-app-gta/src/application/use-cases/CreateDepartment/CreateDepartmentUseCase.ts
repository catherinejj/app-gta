import { Department } from '../../../domain/entities/department.entity';
import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import type { CreateDepartmentDTO } from './CreateDepartmentDTO';
import { CreateDepartmentValidator } from './CreateDepartmentValidator';
import { toDepartmentView, type DepartmentViewDTO } from '../GetDepartmentById/DepartmentViewDTO';

export class CreateDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(input: CreateDepartmentDTO): Promise<DepartmentViewDTO> {
    CreateDepartmentValidator.validate(input);

    const existingDepartment = await this.departmentRepository.findByName(input.name.trim());

    if (existingDepartment) {
      throw new Error('Department already exists for this name');
    }

    const department = Department.create({
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    });

    const savedDepartment = await this.departmentRepository.save(department);
    return toDepartmentView(savedDepartment);
  }
}
