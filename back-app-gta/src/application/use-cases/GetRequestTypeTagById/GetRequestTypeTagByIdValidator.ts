import type { GetRequestTypeTagByIdDTO } from './GetRequestTypeTagByIdDTO';

export class GetRequestTypeTagByIdValidator {
  static validate(input: GetRequestTypeTagByIdDTO): void {
    if (!input.requestTypeId?.trim()) {
      throw new Error('Request type id is required');
    }

    if (!input.tagId?.trim()) {
      throw new Error('Tag id is required');
    }
  }
}
