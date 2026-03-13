import { Contract } from '../entities/contract.entity';

export interface ContractRepository {
  findAll(): Promise<Contract[]>;
  findById(id: string): Promise<Contract | null>;
  save(contract: Contract): Promise<Contract>;
  delete(id: string): Promise<void>;
}
