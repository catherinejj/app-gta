import { Injectable } from '@nestjs/common';
import { Contract } from '../../../domain/entities/contract.entity';
import { ContractRepository } from '../../../domain/repositories/contract.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaContractRepository implements ContractRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Contract[]> {
    const records = await (this.prisma.contract as any).findMany({
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<Contract | null> {
    const record = await (this.prisma.contract as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(contract: Contract): Promise<Contract> {
    if (contract.id) {
      const record = await (this.prisma.contract as any).update({
        where: { id: contract.id },
        data: {
          userId: contract.userId,
          contractType: contract.contractType,
          status: contract.status,
          startDate: contract.startDate,
          endDate: contract.endDate,
          jobTitle: contract.jobTitle,
          workingRate: contract.workingRate,
          teleworkEligible: contract.teleworkEligible,
          annualLeaveEntitlement: contract.annualLeaveEntitlement,
          rttEntitlement: contract.rttEntitlement,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.contract as any).create({
      data: {
        userId: contract.userId,
        contractType: contract.contractType,
        status: contract.status,
        startDate: contract.startDate,
        endDate: contract.endDate,
        jobTitle: contract.jobTitle,
        workingRate: contract.workingRate,
        teleworkEligible: contract.teleworkEligible,
        annualLeaveEntitlement: contract.annualLeaveEntitlement,
        rttEntitlement: contract.rttEntitlement,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.contract as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): Contract {
    return Contract.create({
      id: record.id,
      userId: record.userId,
      contractType: record.contractType,
      status: record.status,
      startDate: record.startDate,
      endDate: record.endDate,
      jobTitle: record.jobTitle,
      workingRate: record.workingRate,
      teleworkEligible: record.teleworkEligible,
      annualLeaveEntitlement: record.annualLeaveEntitlement,
      rttEntitlement: record.rttEntitlement,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
