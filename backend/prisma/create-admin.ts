import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const adminName = 'Jhojan Erick Romero Morales';
  const adminUsername = 'engel7u7';
  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Oppai666';

  const hashedPassword = hashPassword(rawPassword);

  const user = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {
      name: adminName,
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      name: adminName,
      username: adminUsername,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Usuario administrador listo: ${user.username} (${user.name})`);
}

main()
  .catch((e) => {
    console.error('Error al crear usuario administrador:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

