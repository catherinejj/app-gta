import type { GetRequestTagByIdDTO } from './GetRequestTagByIdDTO';

export class GetRequestTagByIdValidator {
  static validate(input: GetRequestTagByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request tag id is required');
    }
  }
}
