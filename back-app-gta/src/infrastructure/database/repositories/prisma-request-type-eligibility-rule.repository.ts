import { Injectable } from '@nestjs/common';
import { RequestTypeEligibilityRule } from '../../../domain/entities/request-type-eligibility-rule.entity';
import { RequestTypeEligibilityRuleRepository } from '../../../domain/repositories/request-type-eligibility-rule.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRequestTypeEligibilityRuleRepository
  implements RequestTypeEligibilityRuleRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequestTypeEligibilityRule[]> {
    const records = await (this.prisma.requestTypeEligibilityRule as any).findMany({
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<RequestTypeEligibilityRule | null> {
    const record = await (this.prisma.requestTypeEligibilityRule as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(rule: RequestTypeEligibilityRule): Promise<RequestTypeEligibilityRule> {
    if (rule.id) {
      const record = await (this.prisma.requestTypeEligibilityRule as any).update({
        where: { id: rule.id },
        data: {
          requestTypeId: rule.requestTypeId,
          operator: rule.operator,
          contractType: rule.contractType,
          rqthRequired: rule.rqthRequired,
          teleworkEligibleOnly: rule.teleworkEligibleOnly,
          minSeniorityMonths: rule.minSeniorityMonths,
          maxSeniorityMonths: rule.maxSeniorityMonths,
          minWorkingRate: rule.minWorkingRate,
          maxWorkingRate: rule.maxWorkingRate,
          departmentId: rule.departmentId,
          isActive: rule.isActive,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.requestTypeEligibilityRule as any).create({
      data: {
        requestTypeId: rule.requestTypeId,
        operator: rule.operator,
        contractType: rule.contractType,
        rqthRequired: rule.rqthRequired,
        teleworkEligibleOnly: rule.teleworkEligibleOnly,
        minSeniorityMonths: rule.minSeniorityMonths,
        maxSeniorityMonths: rule.maxSeniorityMonths,
        minWorkingRate: rule.minWorkingRate,
        maxWorkingRate: rule.maxWorkingRate,
        departmentId: rule.departmentId,
        isActive: rule.isActive,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.requestTypeEligibilityRule as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): RequestTypeEligibilityRule {
    return RequestTypeEligibilityRule.create({
      id: record.id,
      requestTypeId: record.requestTypeId,
      operator: record.operator,
      contractType: record.contractType,
      rqthRequired: record.rqthRequired,
      teleworkEligibleOnly: record.teleworkEligibleOnly,
      minSeniorityMonths: record.minSeniorityMonths,
      maxSeniorityMonths: record.maxSeniorityMonths,
      minWorkingRate: record.minWorkingRate,
      maxWorkingRate: record.maxWorkingRate,
      departmentId: record.departmentId,
      isActive: record.isActive,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
