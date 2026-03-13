import type { CreateRequestTypeTagDTO } from './CreateRequestTypeTagDTO';

export class CreateRequestTypeTagValidator {
  static validate(input: CreateRequestTypeTagDTO): void {
    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    if (!input.tagId?.trim()) {
      throw new Error('Tag id is required');
    }
  }
}
