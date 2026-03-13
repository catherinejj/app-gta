import { Injectable } from '@nestjs/common';
import { RequestType } from '../../../domain/entities/request-type.entity';
import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRequestTypeRepository implements RequestTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequestType[]> {
    const records = await (this.prisma.requestType as any).findMany({
      orderBy: [{ displayOrder: 'asc' }, { label: 'asc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<RequestType | null> {
    const record = await (this.prisma.requestType as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByCode(code: string): Promise<RequestType | null> {
    const record = await (this.prisma.requestType as any).findUnique({
      where: { code },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(requestType: RequestType): Promise<RequestType> {
    if (requestType.id) {
      const record = await (this.prisma.requestType as any).update({
        where: { id: requestType.id },
        data: {
          code: requestType.code,
          label: requestType.label,
          description: requestType.description,
          category: requestType.category,
          parentId: requestType.parentId,
          requiresApproval: requestType.requiresApproval,
          requiresBalance: requestType.requiresBalance,
          requiresDocument: requestType.requiresDocument,
          rqthOnly: requestType.rqthOnly,
          requiresTeleworkEligibility: requestType.requiresTeleworkEligibility,
          color: requestType.color,
          icon: requestType.icon,
          displayOrder: requestType.displayOrder,
          isActive: requestType.isActive,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.requestType as any).create({
      data: {
        code: requestType.code,
        label: requestType.label,
        description: requestType.description,
        category: requestType.category,
        parentId: requestType.parentId,
        requiresApproval: requestType.requiresApproval,
        requiresBalance: requestType.requiresBalance,
        requiresDocument: requestType.requiresDocument,
        rqthOnly: requestType.rqthOnly,
        requiresTeleworkEligibility: requestType.requiresTeleworkEligibility,
        color: requestType.color,
        icon: requestType.icon,
        displayOrder: requestType.displayOrder,
        isActive: requestType.isActive,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.requestType as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): RequestType {
    return RequestType.create({
      id: record.id,
      code: record.code,
      label: record.label,
      description: record.description,
      category: record.category,
      parentId: record.parentId,
      requiresApproval: record.requiresApproval,
      requiresBalance: record.requiresBalance,
      requiresDocument: record.requiresDocument,
      rqthOnly: record.rqthOnly,
      requiresTeleworkEligibility: record.requiresTeleworkEligibility,
      color: record.color,
      icon: record.icon,
      displayOrder: record.displayOrder,
      isActive: record.isActive,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
