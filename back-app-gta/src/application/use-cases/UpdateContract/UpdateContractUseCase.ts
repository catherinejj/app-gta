import { ContractRepository } from '../../../domain/repositories/contract.repository';
import type { UpdateContractDTO } from './UpdateContractDTO';
import { UpdateContractValidator } from './UpdateContractValidator';
import { toContractView, type ContractViewDTO } from '../GetContractById/ContractViewDTO';

export class UpdateContractUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(input: UpdateContractDTO): Promise<ContractViewDTO> {
    UpdateContractValidator.validate(input);

    const contract = await this.contractRepository.findById(input.id.trim());

    if (!contract) {
      throw new Error('Contract not found');
    }

    if (input.userId !== undefined) {
      contract.updateUserId(input.userId);
    }

    if (input.contractType !== undefined) {
      contract.updateContractType(input.contractType);
    }

    if (input.status !== undefined) {
      contract.updateStatus(input.status);
    }

    if (input.startDate !== undefined) {
      contract.updateStartDate(new Date(input.startDate));
    }

    if (input.endDate !== undefined) {
      contract.updateEndDate(input.endDate ? new Date(input.endDate) : null);
    }

    if (input.jobTitle !== undefined) {
      contract.updateJobTitle(input.jobTitle);
    }

    if (input.workingRate !== undefined) {
      contract.updateWorkingRate(input.workingRate);
    }

    if (input.teleworkEligible !== undefined) {
      contract.updateTeleworkEligible(input.teleworkEligible);
    }

    if (input.annualLeaveEntitlement !== undefined) {
      contract.updateAnnualLeaveEntitlement(input.annualLeaveEntitlement);
    }

    if (input.rttEntitlement !== undefined) {
      contract.updateRttEntitlement(input.rttEntitlement);
    }

    const savedContract = await this.contractRepository.save(contract);
    return toContractView(savedContract);
  }
}
