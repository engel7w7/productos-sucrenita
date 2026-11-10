import { ApiResponse, Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-aji-kilo',
    name: 'Ají Colorado Seleccionado (1 kg)',
    slug: 'aji-colorado-vaina-seleccionado-1kg',
    description: 'Ají colorado chuquisaqueño de primera calidad seleccionado a mano. Color rojo rubí vivo, aroma dulce acaramelado y picor tradicional para mondongo, saice y picantes. Disponible a Bs 100/kg primera calidad desvenado (o Bs 80/kg con pepa).',
    price: 100.0,
    stock: 80,
    imageUrl: '/productos/aji-calidad-kilo.jpeg',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-chicharron-tira',
    name: 'Chicharrón Artesanal en Tira (13 Unidades)',
    slug: 'chicharron-artesanal-tira-13-unidades',
    description: 'Tira tradicional de 13 paquetitos individuales de chicharrón crocante preparado en paila. Súper crujiente, liviano y con sal marina en su punto, ideal para tiendas y loncheras familiares.',
    price: 10.0,
    stock: 90,
    imageUrl: '/productos/chicharron-tira-13unidades.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-platanitos',
    name: 'Platanitos Chips Artesanales Crocantes (26 Unidades)',
    slug: 'platanitos-chips-artesanales-26-unidades',
    description: 'Novedad de Doña Sucreñita: Platanitos chips finamente cortados y fritos en su punto crocante con sal liviana. Paquete surtido de 26 unidades para compartir en familia o venta al paso.',
    price: 20.0,
    stock: 75,
    imageUrl: '/productos/platanitos-chips-26unidades.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-habas-26',
    name: 'Habas Saladas Fritas Crocantes (26 Unidades)',
    slug: 'habas-fritas-crocantes-sal-marina-250g',
    description: 'Paquete de 26 bolsitas de habas fritas de altura con sal marina pura. Tostado casero crujiente en paila, el acompañamiento tradicional preferido de Sucre.',
    price: 20.0,
    stock: 85,
    imageUrl: '/productos/habas-saladas-26unidades.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-mani-confitado-26',
    name: 'Maní Dulce Confitado Garrapiñado (26 Unidades)',
    slug: 'mani-dulce-garrapinado-250g',
    description: 'Paquete de 26 bolsitas de maní confitado dulce garrapiñado con receta casera. Caramelo crocante con toque de vainilla elaborado en paila de bronce tradicional.',
    price: 20.0,
    stock: 95,
    imageUrl: '/productos/mani-dulce-confitado-26unidades.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-chicharron-redondo',
    name: 'Chicharrón Artesanal Redondo Crocante (200g)',
    slug: 'chicharron-artesanal-crocante-200g',
    description: 'Chicharrón redondo artesanal elaborado en Sucre. Corteza seleccionada frita a temperatura exacta hasta lograr una crocancia dorada y liviana sin exceso de grasa.',
    price: 20.0,
    stock: 50,
    imageUrl: '/productos/chicharron-redondo.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-aji-secado',
    name: 'Ají Colorado Secado al Sol Chuquisaqueño (250g)',
    slug: 'aji-colorado-molido-picante-250g',
    description: 'Vainas de ají colorado puro secadas al sol en los valles chuquisaqueños sin químicos ni colorantes. Ideal para tostar en batán o moler fresco en casa para mondongo, saice y picantes.',
    price: 15.0,
    stock: 70,
    imageUrl: '/productos/aji-secado-tradicional.jpeg',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-chicharron-tira-detalle',
    name: 'Chicharrones Crocantes en Tira Doble (26 Unidades)',
    slug: 'chicharrones-crocantes-tira-26-unidades',
    description: 'Paquete de 26 unidades de chicharrón artesanal crocante en tiras de colgado para negocios y tiendas de barrio. Crujiente garantizado y empaque hermético contra la humedad.',
    price: 20.0,
    stock: 60,
    imageUrl: '/productos/chicharron-tira-detalle.jpeg',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-aji-quintal-1',
    name: 'Ají Colorado Primera Calidad por Quintal (Mayorista)',
    slug: 'aji-colorado-primera-calidad-quintal',
    description: 'Quintal de ají colorado chuquisaqueño de primera calidad (100 libras) para pensiones, restaurantes típicos y distribuidoras. Cosecha selecta de alto rendimiento culinario y color profundo.',
    price: 4000.0,
    stock: 20,
    imageUrl: '/productos/aji-quintal-primera.jpeg',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-aji-quintal-2',
    name: 'Ají Colorado con Pepa por Quintal (Mayorista)',
    slug: 'aji-colorado-con-pepa-quintal',
    description: 'Quintal de ají colorado con pepa tradicional (100 libras). Gran rendimiento para moler en volumen para negocios gastronómicos y preparaciones tradicionales de Sucre a precio de mayorista.',
    price: 2200.0,
    stock: 25,
    imageUrl: '/productos/aji-quintal-con-pepa.jpeg',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-mani-molido',
    name: 'Maní Molido Tradicional para Sopa (500g)',
    slug: 'mani-molido-tradicional-sopa-500g',
    description: 'Maní puro molido con la textura perfecta y aceites naturales conservados, esencial para preparar la auténtica y cremosa sopa de maní chuquisaqueña.',
    price: 15.0,
    stock: 60,
    imageUrl: '/productos/mani-crudo-molido.webp',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-mani-crudo',
    name: 'Maní Crudo Seleccionado (1 kg)',
    slug: 'mani-crudo-seleccionado-1kg',
    description: 'Grano de maní de primera calidad, limpio y seleccionado a mano. Ideal para tostar en casa, preparar confituras o utilizar en recetas tradicionales.',
    price: 18.0,
    stock: 70,
    imageUrl: '/productos/mani-crudo.jpg',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-aji-amarillo',
    name: 'Ají Amarillo Molido Sin Picante / Dulce (250g)',
    slug: 'aji-amarillo-molido-sin-picante-250g',
    description: 'Ají amarillo desvenado y molido fino. Aporta un color dorado apetitoso y un sabor aromático profundo sin picor, ideal para toda la familia.',
    price: 12.0,
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
];

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/products`);
    if (categorySlug) {
      url.searchParams.set('category', categorySlug);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json: ApiResponse<Product[]> = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn(`[getProducts] Conexión a ${API_BASE_URL} no disponible, utilizando catálogo local.`);
  }

  if (categorySlug) {
    return FALLBACK_PRODUCTS.filter((p) => p.category?.slug === categorySlug);
  }
  return FALLBACK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${normalizedSlug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const result = await res.json();
      const product = result.data || result;
      if (product && product.id && product.isActive) {
        return product;
      }
    }
  } catch (error) {
    console.warn(`[getProductBySlug] Conexión a ${API_BASE_URL} no disponible (${normalizedSlug}), utilizando catálogo local.`);
  }

  const fallback = FALLBACK_PRODUCTS.find(
    (p) => p.slug.toLowerCase() === normalizedSlug
  );
  return fallback || null;
}
