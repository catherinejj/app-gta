import type { DeleteDepartmentDTO } from './DeleteDepartmentDTO';

export class DeleteDepartmentValidator {
  static validate(input: DeleteDepartmentDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Department id is required');
    }
  }
}
