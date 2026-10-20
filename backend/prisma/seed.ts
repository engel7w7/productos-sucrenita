import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de datos semilla para Productos Sucreñita (Abarrotes & Snacks)...');

  // Limpiar datos existentes de forma segura si existen
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categorías principales del negocio familiar
  const abarrotesCat = await prisma.category.create({
    data: {
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
  });

  const snacksCat = await prisma.category.create({
    data: {
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
  });

  // Catálogo de Productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Maní Crudo Seleccionado (1 kg)',
        slug: 'mani-crudo-seleccionado-1kg',
        description: 'Grano de maní de primera calidad, limpio y seleccionado a mano. Ideal para tostar en casa, preparar confituras o utilizar en recetas tradicionales.',
        price: 18.0,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&w=800&q=80',
        categoryId: abarrotesCat.id,
        isActive: true,
      },
      {
        name: 'Maní Molido Tradicional para Sopa (500g)',
        slug: 'mani-molido-tradicional-sopa-500g',
        description: 'Maní puro molido con la textura perfecta y aceites naturales conservados, esencial para preparar la auténtica y cremosa sopa de maní chuquisaqueña.',
        price: 15.0,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
        categoryId: abarrotesCat.id,
        isActive: true,
      },
      {
        name: 'Ají Colorado Molido con Picante (250g)',
        slug: 'aji-colorado-molido-picante-250g',
        description: 'Ají rojo chuquisaqueño molido a piedra, de color intenso y picor vivo. Indispensable para picantes, saice tarijeño, ranga y mondongo sucrense.',
        price: 12.0,
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        categoryId: abarrotesCat.id,
        isActive: true,
      },
      {
        name: 'Ají Amarillo Molido Sin Picante / Dulce (250g)',
        slug: 'aji-amarillo-molido-sin-picante-250g',
        description: 'Ají amarillo desvenado y molido fino. Aporta un color dorado apetitoso y un sabor aromático profundo sin picor, ideal para toda la familia.',
        price: 12.0,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
        categoryId: abarrotesCat.id,
        isActive: true,
      },
      {
        name: 'Condimento Criollo Surtido (200g)',
        slug: 'condimento-criollo-surtido-200g',
        description: 'Mezcla artesanal de comino tostado, pimienta dulce y hierbas secas de la huerta. El sazonador indispensable para caldos, estofados y carnes.',
        price: 10.0,
        stock: 70,
        imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
        categoryId: abarrotesCat.id,
        isActive: true,
      },
      {
        name: 'Chicharrón Artesanal Crocante (200g)',
        slug: 'chicharron-artesanal-crocante-200g',
        description: 'Corteza seleccionada y frita en su punto exacto hasta lograr una crocancia dorada y liviana. El acompañamiento tradicional por excelencia.',
        price: 20.0,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        categoryId: snacksCat.id,
        isActive: true,
      },
      {
        name: 'Maní Dulce Garrapiñado (250g)',
        slug: 'mani-dulce-garrapinado-250g',
        description: 'Maní tostado cubierto con una capa crocante de caramelo artesanal y esencia de vainilla. Preparado en paila con receta tradicional casera.',
        price: 10.0,
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
        categoryId: snacksCat.id,
        isActive: true,
      },
      {
        name: 'Habas Fritas Crocantes con Sal Marina (250g)',
        slug: 'habas-fritas-crocantes-sal-marina-250g',
        description: 'Habas de altura seleccionadas, tostadas y fritas a fuego controlado con una pizca de sal marina. Snack crujiente, nutritivo y delicioso.',
        price: 10.0,
        stock: 65,
        imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
        categoryId: snacksCat.id,
        isActive: true,
      },
    ],
  });

  console.log('✅ Semilla de Productos Sucreñita completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error al ejecutar semilla:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
