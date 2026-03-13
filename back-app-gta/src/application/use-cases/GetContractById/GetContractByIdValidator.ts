import type { GetContractByIdDTO } from './GetContractByIdDTO';

export class GetContractByIdValidator {
  static validate(input: GetContractByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Contract id is required');
    }
  }
}
