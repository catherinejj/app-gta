import type { DeleteRequestTypeTagDTO } from './DeleteRequestTypeTagDTO';

export class DeleteRequestTypeTagValidator {
  static validate(input: DeleteRequestTypeTagDTO): void {
    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    if (!input.tagId?.trim()) {
      throw new Error('Tag id is required');
    }
  }
}
