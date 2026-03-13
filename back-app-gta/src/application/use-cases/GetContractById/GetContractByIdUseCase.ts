import { ContractRepository } from '../../../domain/repositories/contract.repository';
import type { GetContractByIdDTO } from './GetContractByIdDTO';
import { GetContractByIdValidator } from './GetContractByIdValidator';
import { toContractView, type ContractViewDTO } from './ContractViewDTO';

export class GetContractByIdUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(input: GetContractByIdDTO): Promise<ContractViewDTO> {
    GetContractByIdValidator.validate(input);

    const contract = await this.contractRepository.findById(input.id.trim());

    if (!contract) {
      throw new Error('Contract not found');
    }

    return toContractView(contract);
  }
}
