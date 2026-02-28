import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@local.test';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!';
  const adminFirstName =
    (process.env.SEED_ADMIN_FIRST_NAME ?? 'Admin').trim().toLowerCase();
  const adminLastName =
    (process.env.SEED_ADMIN_LAST_NAME ?? 'User').trim().toLowerCase();
  const adminBirthDate =
    process.env.SEED_ADMIN_BIRTH_DATE ?? '1990-01-01T00:00:00.000Z';
  const adminEmployeeNumber =
    process.env.SEED_ADMIN_EMPLOYEE_NUMBER ?? 'ADMIN-001';

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const birthDate = new Date(adminBirthDate);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error('SEED_ADMIN_BIRTH_DATE must be a valid ISO date');
  }

  const adminAuth = await prisma.auth.upsert({
    where: { email: adminEmail },
    update: {
      password: passwordHash,
      role: Role.ADMIN,
      refreshTokenHash: null,
      user: {
        update: {
          firstName: adminFirstName,
          lastName: adminLastName,
          birthDate,
          employeeNumber: adminEmployeeNumber,
          rqth: false,
        },
      },
    },
    create: {
      email: adminEmail,
      password: passwordHash,
      role: Role.ADMIN,
      refreshTokenHash: null,
      user: {
        create: {
          firstName: adminFirstName,
          lastName: adminLastName,
          birthDate,
          employeeNumber: adminEmployeeNumber,
          rqth: false,
        },
      },
    },
    include: { user: true },
  });

  console.log('Admin seeded:', adminAuth.email, adminAuth.role, adminAuth.user.id);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
