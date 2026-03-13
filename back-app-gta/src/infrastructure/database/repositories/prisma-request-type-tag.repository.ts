import { Injectable } from '@nestjs/common';
import { RequestTypeTag } from '../../../domain/entities/request-type-tag.entity';
import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRequestTypeTagRepository implements RequestTypeTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequestTypeTag[]> {
    const records = await (this.prisma.requestTypeTag as any).findMany({
      orderBy: [{ requestTypeId: 'asc' }, { tagId: 'asc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findByIds(requestTypeId: string, tagId: string): Promise<RequestTypeTag | null> {
    const record = await (this.prisma.requestTypeTag as any).findUnique({
      where: {
        requestTypeId_tagId: {
          requestTypeId,
          tagId,
        },
      },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(
    requestTypeTag: RequestTypeTag,
    currentKeys?: { requestTypeId: string; tagId: string },
  ): Promise<RequestTypeTag> {
    if (currentKeys) {
      const record = await (this.prisma.requestTypeTag as any).update({
        where: {
          requestTypeId_tagId: {
            requestTypeId: currentKeys.requestTypeId,
            tagId: currentKeys.tagId,
          },
        },
        data: {
          requestTypeId: requestTypeTag.requestTypeId,
          tagId: requestTypeTag.tagId,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.requestTypeTag as any).create({
      data: {
        requestTypeId: requestTypeTag.requestTypeId,
        tagId: requestTypeTag.tagId,
      },
    });

    return this.toDomain(record);
  }

  async delete(requestTypeId: string, tagId: string): Promise<void> {
    await (this.prisma.requestTypeTag as any).delete({
      where: {
        requestTypeId_tagId: {
          requestTypeId,
          tagId,
        },
      },
    });
  }

  private toDomain(record: any): RequestTypeTag {
    return RequestTypeTag.create({
      requestTypeId: record.requestTypeId,
      tagId: record.tagId,
    });
  }
}
