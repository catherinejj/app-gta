import { Injectable } from '@nestjs/common';
import { ApprovalHistory } from '../../../domain/entities/approval-history.entity';
import { ApprovalHistoryRepository } from '../../../domain/repositories/approval-history.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaApprovalHistoryRepository implements ApprovalHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ApprovalHistory[]> {
    const records = await (this.prisma.approvalHistory as any).findMany({
      orderBy: { createdAt: 'desc' },
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<ApprovalHistory | null> {
    const record = await (this.prisma.approvalHistory as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(approvalHistory: ApprovalHistory): Promise<ApprovalHistory> {
    if (approvalHistory.id) {
      const record = await (this.prisma.approvalHistory as any).update({
        where: { id: approvalHistory.id },
        data: {
          leaveRequestId: approvalHistory.leaveRequestId,
          actorId: approvalHistory.actorId,
          action: approvalHistory.action,
          comment: approvalHistory.comment,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.approvalHistory as any).create({
      data: {
        leaveRequestId: approvalHistory.leaveRequestId,
        actorId: approvalHistory.actorId,
        action: approvalHistory.action,
        comment: approvalHistory.comment,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.approvalHistory as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): ApprovalHistory {
    return ApprovalHistory.create({
      id: record.id,
      leaveRequestId: record.leaveRequestId,
      actorId: record.actorId,
      action: record.action,
      comment: record.comment,
      createdAt: record.createdAt,
    });
  }
}
