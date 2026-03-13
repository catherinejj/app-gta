import type { UpdateRequestTypeTagDTO } from './UpdateRequestTypeTagDTO';

export class UpdateRequestTypeTagValidator {
  static validate(input: UpdateRequestTypeTagDTO): void {
    if (!input.currentRequestTypeId?.trim()) {
      throw new Error('Current request type id is required');
    }

    if (!input.currentTagId?.trim()) {
      throw new Error('Current tag id is required');
    }

    if (input.requestTypeId !== undefined && !input.requestTypeId.trim()) {
      throw new Error('Request type id cannot be empty');
    }

    if (input.tagId !== undefined && !input.tagId.trim()) {
      throw new Error('Tag id cannot be empty');
    }
  }
}
