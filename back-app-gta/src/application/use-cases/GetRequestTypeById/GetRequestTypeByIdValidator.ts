import type { GetRequestTypeByIdDTO } from './GetRequestTypeByIdDTO';

export class GetRequestTypeByIdValidator {
  static validate(input: GetRequestTypeByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request type id is required');
    }
  }
}
