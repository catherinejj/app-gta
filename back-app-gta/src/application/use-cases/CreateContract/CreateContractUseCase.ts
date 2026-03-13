import { ContractStatus } from '@prisma/client';
import { Contract } from '../../../domain/entities/contract.entity';
import { ContractRepository } from '../../../domain/repositories/contract.repository';
import type { CreateContractDTO } from './CreateContractDTO';
import { CreateContractValidator } from './CreateContractValidator';
import { toContractView, type ContractViewDTO } from '../GetContractById/ContractViewDTO';

export class CreateContractUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(input: CreateContractDTO): Promise<ContractViewDTO> {
    CreateContractValidator.validate(input);

    const contract = Contract.create({
      userId: input.userId.trim(),
      contractType: input.contractType,
      status: input.status ?? ContractStatus.ACTIVE,
      startDate: new Date(input.startDate),
      endDate: input.endDate ? new Date(input.endDate) : null,
      jobTitle: input.jobTitle,
      workingRate: input.workingRate,
      teleworkEligible: input.teleworkEligible,
      annualLeaveEntitlement: input.annualLeaveEntitlement,
      rttEntitlement: input.rttEntitlement,
    });

    const savedContract = await this.contractRepository.save(contract);
    return toContractView(savedContract);
  }
}
