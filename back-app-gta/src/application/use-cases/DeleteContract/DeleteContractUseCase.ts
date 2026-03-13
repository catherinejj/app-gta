import { ContractRepository } from '../../../domain/repositories/contract.repository';
import type { DeleteContractDTO } from './DeleteContractDTO';
import { DeleteContractValidator } from './DeleteContractValidator';

export class DeleteContractUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(input: DeleteContractDTO): Promise<void> {
    DeleteContractValidator.validate(input);

    const contract = await this.contractRepository.findById(input.id.trim());

    if (!contract) {
      throw new Error('Contract not found');
    }

    await this.contractRepository.delete(input.id.trim());
  }
}
