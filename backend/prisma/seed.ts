import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de datos semilla para Sucrenita...');

  // Limpiar datos existentes de forma segura si existen
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categorías
  const chocolatesCat = await prisma.category.create({
    data: {
      name: 'Chocolates Tradicionales',
      slug: 'chocolates-tradicionales',
    },
  });

  const alfajoresCat = await prisma.category.create({
    data: {
      name: 'Alfajores y Galletas',
      slug: 'alfajores-galletas',
    },
  });

  const dulcesCat = await prisma.category.create({
    data: {
      name: 'Dulces Típicos y Bombones',
      slug: 'dulces-tipicos-bombones',
    },
  });

  // Productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Caja Surtida de Bombones de Sucre',
        slug: 'caja-surtida-bombones-sucre',
        description: 'Exquisita selección de 16 bombones artesanales rellenos de licor, manjar blanco y frutas deshidratadas de los valles chuquisaqueños.',
        price: 85.0,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
        categoryId: chocolatesCat.id,
        isActive: true,
      },
      {
        name: 'Tableta de Chocolate Amargo 70%',
        slug: 'tableta-chocolate-amargo-70',
        description: 'Cacao silvestre boliviano seleccionado con un balance perfecto de notas florales y tostadas.',
        price: 25.5,
        stock: 120,
        imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
        categoryId: chocolatesCat.id,
        isActive: true,
      },
      {
        name: 'Alfajores Sucrenses de Dulce de Leche',
        slug: 'alfajores-sucrenses-dulce-de-leche',
        description: 'Caja de 6 alfajores con masa suave de fécula de maíz y relleno abundante de manjar artesanal.',
        price: 35.0,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
        categoryId: alfajoresCat.id,
        isActive: true,
      },
      {
        name: 'Empanadas de Manjar de Leche (Gaznates)',
        slug: 'empanadas-manjar-leche-gaznates',
        description: 'Crujiente masa tradicional horneada, rellena de dulce de leche casero y toque de azúcar impalpable.',
        price: 30.0,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        categoryId: dulcesCat.id,
        isActive: true,
      },
    ],
  });

  console.log('✅ Semilla completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error al ejecutar semilla:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
