import type { DeleteRequestTypeDTO } from './DeleteRequestTypeDTO';

export class DeleteRequestTypeValidator {
  static validate(input: DeleteRequestTypeDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request type id is required');
    }
  }
}
