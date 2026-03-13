import type { UpdateDepartmentDTO } from './UpdateDepartmentDTO';

export class UpdateDepartmentValidator {
  static validate(input: UpdateDepartmentDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Department id is required');
    }

    if (input.name !== undefined && !input.name.trim()) {
      throw new Error('Name cannot be empty');
    }
  }
}
