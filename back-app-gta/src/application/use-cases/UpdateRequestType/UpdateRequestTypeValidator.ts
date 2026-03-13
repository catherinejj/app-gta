import { RequestCategory } from '@prisma/client';
import type { UpdateRequestTypeDTO } from './UpdateRequestTypeDTO';

export class UpdateRequestTypeValidator {
  static validate(input: UpdateRequestTypeDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Request type id is required');
    }

    if (input.code !== undefined && !input.code.trim()) {
      throw new Error('Code cannot be empty');
    }

    if (input.label !== undefined && !input.label.trim()) {
      throw new Error('Label cannot be empty');
    }

    if (
      input.category !== undefined &&
      !Object.values(RequestCategory).includes(input.category)
    ) {
      throw new Error('Invalid request category');
    }

    if (input.displayOrder !== undefined && !Number.isInteger(input.displayOrder)) {
      throw new Error('Display order must be an integer');
    }
  }
}
