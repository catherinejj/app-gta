import { Injectable } from '@nestjs/common';
import { RequestTag } from '../../../domain/entities/request-tag.entity';
import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRequestTagRepository implements RequestTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequestTag[]> {
    const records = await (this.prisma.requestTag as any).findMany({
      orderBy: [{ label: 'asc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<RequestTag | null> {
    const record = await (this.prisma.requestTag as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByCode(code: string): Promise<RequestTag | null> {
    const record = await (this.prisma.requestTag as any).findUnique({
      where: { code },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(requestTag: RequestTag): Promise<RequestTag> {
    if (requestTag.id) {
      const record = await (this.prisma.requestTag as any).update({
        where: { id: requestTag.id },
        data: {
          code: requestTag.code,
          label: requestTag.label,
          color: requestTag.color,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.requestTag as any).create({
      data: {
        code: requestTag.code,
        label: requestTag.label,
        color: requestTag.color,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.requestTag as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): RequestTag {
    return RequestTag.create({
      id: record.id,
      code: record.code,
      label: record.label,
      color: record.color,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
