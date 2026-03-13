import type { UpdateRequestTagDTO } from './UpdateRequestTagDTO';

export class UpdateRequestTagValidator {
  static validate(input: UpdateRequestTagDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request tag id is required');
    }

    if (input.code !== undefined && !input.code.trim()) {
      throw new Error('Code cannot be empty');
    }

    if (input.label !== undefined && !input.label.trim()) {
      throw new Error('Label cannot be empty');
    }
  }
}
