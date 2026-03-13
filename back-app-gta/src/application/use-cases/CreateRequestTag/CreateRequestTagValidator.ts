import type { CreateRequestTagDTO } from './CreateRequestTagDTO';

export class CreateRequestTagValidator {
  static validate(input: CreateRequestTagDTO): void {
    if (!input.code?.trim()) {
      throw new Error('Code is required');
    }

    if (!input.label?.trim()) {
      throw new Error('Label is required');
    }
  }
}
