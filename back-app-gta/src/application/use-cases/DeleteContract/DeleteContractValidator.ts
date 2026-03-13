import type { DeleteContractDTO } from './DeleteContractDTO';

export class DeleteContractValidator {
  static validate(input: DeleteContractDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Contract id is required');
    }
  }
}
