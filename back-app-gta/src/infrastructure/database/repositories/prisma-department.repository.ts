import { Injectable } from '@nestjs/common';
import { Department } from '../../../domain/entities/department.entity';
import { DepartmentRepository } from '../../../domain/repositories/department.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaDepartmentRepository implements DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Department[]> {
    const records = await (this.prisma.department as any).findMany({
      orderBy: [{ name: 'asc' }],
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id: string): Promise<Department | null> {
    const record = await (this.prisma.department as any).findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByName(name: string): Promise<Department | null> {
    const record = await (this.prisma.department as any).findUnique({
      where: { name },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(department: Department): Promise<Department> {
    if (department.id) {
      const record = await (this.prisma.department as any).update({
        where: { id: department.id },
        data: {
          name: department.name,
          description: department.description,
          isActive: department.isActive,
        },
      });

      return this.toDomain(record);
    }

    const record = await (this.prisma.department as any).create({
      data: {
        name: department.name,
        description: department.description,
        isActive: department.isActive,
      },
    });

    return this.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await (this.prisma.department as any).delete({
      where: { id },
    });
  }

  private toDomain(record: any): Department {
    return Department.create({
      id: record.id,
      name: record.name,
      description: record.description,
      isActive: record.isActive,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
