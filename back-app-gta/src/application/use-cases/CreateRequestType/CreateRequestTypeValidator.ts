import { RequestCategory } from '@prisma/client';
import type { CreateRequestTypeDTO } from './CreateRequestTypeDTO';

export class CreateRequestTypeValidator {
  static validate(input: CreateRequestTypeDTO): void {
    if (!input.code?.trim()) {
      throw new Error('Code is required');
    }

    if (!input.label?.trim()) {
      throw new Error('Label is required');
    }

    if (!Object.values(RequestCategory).includes(input.category)) {
      throw new Error('Invalid request category');
    }

    if (input.displayOrder !== undefined && !Number.isInteger(input.displayOrder)) {
      throw new Error('Display order must be an integer');
    }
  }
}
