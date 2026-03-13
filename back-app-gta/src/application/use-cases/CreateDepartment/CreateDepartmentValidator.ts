import type { CreateDepartmentDTO } from './CreateDepartmentDTO';

export class CreateDepartmentValidator {
  static validate(input: CreateDepartmentDTO): void {
    if (!input.name?.trim()) {
      throw new Error('Name is required');
    }
  }
}
