import { Injectable } from '@nestjs/common';
import { LeaveRequest } from '../../../domain/entities/leave-request.entity';
import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaLeaveRequestRepository implements LeaveRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LeaveRequest[]> {
    const records = await (this.prisma.leaveRequest as any).findMany({
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<LeaveRequest | null> {
    const record = await (this.prisma.leaveRequest as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(leaveRequest: LeaveRequest): Promise<LeaveRequest> {
    if (leaveRequest.id) {
      const record = await (this.prisma.leaveRequest as any).update({
        where: { id: leaveRequest.id },
        data: {
          userId: leaveRequest.userId,
          requestTypeId: leaveRequest.requestTypeId,
          startDate: leaveRequest.startDate,
          endDate: leaveRequest.endDate,
          startPart: leaveRequest.startPart,
          endPart: leaveRequest.endPart,
          durationDays: leaveRequest.durationDays,
          reason: leaveRequest.reason,
          status: leaveRequest.status,
          documentPath: leaveRequest.documentPath,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.leaveRequest as any).create({
      data: {
        userId: leaveRequest.userId,
        requestTypeId: leaveRequest.requestTypeId,
        startDate: leaveRequest.startDate,
        endDate: leaveRequest.endDate,
        startPart: leaveRequest.startPart,
        endPart: leaveRequest.endPart,
        durationDays: leaveRequest.durationDays,
        reason: leaveRequest.reason,
        status: leaveRequest.status,
        documentPath: leaveRequest.documentPath,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.leaveRequest as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): LeaveRequest {
    return LeaveRequest.create({
      id: record.id,
      userId: record.userId,
      requestTypeId: record.requestTypeId,
      startDate: record.startDate,
      endDate: record.endDate,
      startPart: record.startPart,
      endPart: record.endPart,
      durationDays: record.durationDays,
      reason: record.reason,
      status: record.status,
      documentPath: record.documentPath,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
