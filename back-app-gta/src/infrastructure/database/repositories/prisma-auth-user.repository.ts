import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../domain/entities/auth-user.entity';
import { AuthUserRepository } from '../../../domain/repositories/auth-user.repository';
import { UserRole } from '../../../domain/value-objects/user-role';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaAuthUserRepository implements AuthUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AuthUser[]> {
    const authModel = this.prisma.auth as any;
    const records = await authModel.findMany({
      include: { user: true },
      orderBy: { email: 'asc' },
    });

    return records.map((record) => this.toDomain(record));
  }

  async findByEmail(email: string): Promise<AuthUser | null> {
    const authModel = this.prisma.auth as any;
    const record = await authModel.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { user: true },
    });

    return record ? this.toDomain(record) : null;
  }

  async findById(id: string): Promise<AuthUser | null> {
    const authModel = this.prisma.auth as any;
    const record = await authModel.findUnique({
      where: { userId: id },
      include: { user: true },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByFirstName(firstName: string): Promise<AuthUser[]> {
    const userModel = this.prisma.user as any;
    const users = await userModel.findMany({
      where: { firstName: firstName.trim().toLowerCase() },
      include: { auth: true },
      orderBy: { firstName: 'asc' },
    });

    return users
      .filter((user) => Boolean(user.auth))
      .map((user) =>
        this.toDomain({
          ...user.auth,
          user,
        }),
      );
  }

  async findByLastName(lastName: string): Promise<AuthUser[]> {
    const userModel = this.prisma.user as any;
    const users = await userModel.findMany({
      where: { lastName: lastName.trim().toLowerCase() },
      include: { auth: true },
      orderBy: { lastName: 'asc' },
    });

    return users
      .filter((user) => Boolean(user.auth))
      .map((user) =>
        this.toDomain({
          ...user.auth,
          user,
        }),
      );
  }

  async save(user: AuthUser): Promise<AuthUser> {
    const authModel = this.prisma.auth as any;

    if (user.id) {
      await this.prisma.$transaction([
        (this.prisma.user as any).update({
          where: { id: user.id },
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            employeeNumber: user.employeeNumber,
            rqth: user.rqth,
          },
        }),
        authModel.update({
          where: { userId: user.id },
          data: {
            email: user.email,
            password: user.passwordHash,
            role: user.role,
            refreshTokenHash: user.refreshTokenHash,
            lastLoginAt: user.lastLoginAt,
            lastLogoutAt: user.lastLogoutAt,
          },
        }),
      ]);

      const updated = await authModel.findUnique({
        where: { userId: user.id },
        include: { user: true },
      });

      if (!updated) {
        throw new Error('User not found');
      }

      return this.toDomain(updated);
    }

    const created = await authModel.create({
      data: {
        email: user.email,
        password: user.passwordHash,
        role: user.role,
        refreshTokenHash: user.refreshTokenHash,
        lastLoginAt: user.lastLoginAt,
        lastLogoutAt: user.lastLogoutAt,
        user: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            employeeNumber: user.employeeNumber,
            rqth: user.rqth,
          },
        },
      },
      include: { user: true },
    });

    return this.toDomain(created);
  }

  private toDomain(record: {
    email: string;
    password: string;
    role: UserRole;
    lastLoginAt: Date | null;
    lastLogoutAt: Date | null;
    refreshTokenHash: string | null;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
      employeeNumber: string;
      rqth: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }): AuthUser {
    return AuthUser.rehydrate({
      id: record.user.id,
      email: record.email,
      firstName: record.user.firstName,
      lastName: record.user.lastName,
      birthDate: record.user.birthDate,
      employeeNumber: record.user.employeeNumber,
      rqth: record.user.rqth,
      userCreatedAt: record.user.createdAt,
      userUpdatedAt: record.user.updatedAt,
      lastLoginAt: record.lastLoginAt,
      lastLogoutAt: record.lastLogoutAt,
      passwordHash: record.password,
      role: record.role,
      refreshTokenHash: record.refreshTokenHash,
    });
  }
}
