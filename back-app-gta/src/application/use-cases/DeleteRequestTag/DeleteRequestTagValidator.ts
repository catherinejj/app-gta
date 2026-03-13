import type { DeleteRequestTagDTO } from './DeleteRequestTagDTO';

export class DeleteRequestTagValidator {
  static validate(input: DeleteRequestTagDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request tag id is required');
    }
  }
}
