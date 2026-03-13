import type { GetDepartmentByIdDTO } from './GetDepartmentByIdDTO';

export class GetDepartmentByIdValidator {
  static validate(input: GetDepartmentByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Department id is required');
    }
  }
}
