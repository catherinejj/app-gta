import { ContractRepository } from '../../../domain/repositories/contract.repository';
import type { ListContractsDTO } from './ListContractsDTO';
import { ListContractsValidator } from './ListContractsValidator';
import { toContractView, type ContractViewDTO } from '../GetContractById/ContractViewDTO';

export class ListContractsUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(input: ListContractsDTO): Promise<ContractViewDTO[]> {
    ListContractsValidator.validate(input);

    const contracts = await this.contractRepository.findAll();
    return contracts.map(toContractView);
  }
}
