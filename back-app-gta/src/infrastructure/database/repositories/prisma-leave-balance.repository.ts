import { Injectable } from '@nestjs/common';
import { LeaveBalance } from '../../../domain/entities/leave-balance.entity';
import { LeaveBalanceRepository } from '../../../domain/repositories/leave-balance.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaLeaveBalanceRepository implements LeaveBalanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LeaveBalance[]> {
    const records = await (this.prisma.leaveBalance as any).findMany({
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<LeaveBalance | null> {
    const record = await (this.prisma.leaveBalance as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByUserRequestTypeAndYear(
    userId: string,
    requestTypeId: string,
    year: number,
  ): Promise<LeaveBalance | null> {
    const record = await (this.prisma.leaveBalance as any).findUnique({
      where: {
        userId_requestTypeId_year: {
          userId,
          requestTypeId,
          year,
        },
      },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(leaveBalance: LeaveBalance): Promise<LeaveBalance> {
    if (leaveBalance.id) {
      const record = await (this.prisma.leaveBalance as any).update({
        where: { id: leaveBalance.id },
        data: {
          userId: leaveBalance.userId,
          requestTypeId: leaveBalance.requestTypeId,
          year: leaveBalance.year,
          acquiredDays: leaveBalance.acquiredDays,
          usedDays: leaveBalance.usedDays,
          pendingDays: leaveBalance.pendingDays,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.leaveBalance as any).create({
      data: {
        userId: leaveBalance.userId,
        requestTypeId: leaveBalance.requestTypeId,
        year: leaveBalance.year,
        acquiredDays: leaveBalance.acquiredDays,
        usedDays: leaveBalance.usedDays,
        pendingDays: leaveBalance.pendingDays,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.leaveBalance as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): LeaveBalance {
    return LeaveBalance.create({
      id: record.id,
      userId: record.userId,
      requestTypeId: record.requestTypeId,
      year: record.year,
      acquiredDays: record.acquiredDays,
      usedDays: record.usedDays,
      pendingDays: record.pendingDays,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
