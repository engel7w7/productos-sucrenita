import { ApiResponse, Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

// Catálogo de respaldo para Productos Sucreñita (Abarrotes y Snacks Artesanales)
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Maní Crudo Seleccionado (1 kg)',
    slug: 'mani-crudo-seleccionado-1kg',
    description: 'Grano de maní de primera calidad, limpio y seleccionado a mano. Ideal para tostar en casa, preparar confituras o utilizar en recetas tradicionales.',
    price: 18.0,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-2',
    name: 'Maní Molido Tradicional para Sopa (500g)',
    slug: 'mani-molido-tradicional-sopa-500g',
    description: 'Maní puro molido con la textura perfecta y aceites naturales conservados, esencial para preparar la auténtica y cremosa sopa de maní chuquisaqueña.',
    price: 15.0,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-3',
    name: 'Ají Colorado Molido con Picante (250g)',
    slug: 'aji-colorado-molido-picante-250g',
    description: 'Ají rojo chuquisaqueño molido a piedra, de color intenso y picor vivo. Indispensable para picantes, saice tarijeño, ranga y mondongo sucrense.',
    price: 12.0,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-4',
    name: 'Ají Amarillo Molido Sin Picante / Dulce (250g)',
    slug: 'aji-amarillo-molido-sin-picante-250g',
    description: 'Ají amarillo desvenado y molido fino. Aporta un color dorado apetitoso y un sabor aromático profundo sin picor, ideal para toda la familia.',
    price: 12.0,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-abarrotes',
    category: {
      id: 'cat-abarrotes',
      name: 'Abarrotes y Condimentos',
      slug: 'abarrotes-condimentos',
    },
    isActive: true,
  },
  {
    id: 'prod-5',
    name: 'Chicharrón Artesanal Crocante (200g)',
    slug: 'chicharron-artesanal-crocante-200g',
    description: 'Corteza seleccionada y frita en su punto exacto hasta lograr una crocancia dorada y liviana. El acompañamiento tradicional por excelencia.',
    price: 20.0,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-6',
    name: 'Maní Dulce Garrapiñado (250g)',
    slug: 'mani-dulce-garrapinado-250g',
    description: 'Maní tostado cubierto con una capa crocante de caramelo artesanal y esencia de vainilla. Preparado en paila con receta tradicional casera.',
    price: 10.0,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
  {
    id: 'prod-7',
    name: 'Habas Fritas Crocantes con Sal Marina (250g)',
    slug: 'habas-fritas-crocantes-sal-marina-250g',
    description: 'Habas de altura seleccionadas, tostadas y fritas a fuego controlado con una pizca de sal marina. Snack crujiente, nutritivo y delicioso.',
    price: 10.0,
    stock: 65,
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-snacks',
    category: {
      id: 'cat-snacks',
      name: 'Snacks Artesanales',
      slug: 'snacks-artesanales',
    },
    isActive: true,
  },
];

/**
 * Obtiene todos los productos desde la API REST o datos de reserva
 */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/products`);
    if (categorySlug) {
      url.searchParams.set('category', categorySlug);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR cada 60 segundos
    });

    if (!res.ok) {
      throw new Error(`Error en API: ${res.statusText}`);
    }

    const json: ApiResponse<Product[]> = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn(`[getProducts] Conexión a ${API_BASE_URL} no disponible, utilizando catálogo local.`);
    if (categorySlug) {
      return FALLBACK_PRODUCTS.filter((p) => p.category?.slug === categorySlug);
    }
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Obtiene el detalle de un producto por su slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error en API: ${res.statusText}`);
    }

    const json: ApiResponse<Product> = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn(`[getProductBySlug] Conexión a ${API_BASE_URL} no disponible, buscando en catálogo local.`);
    const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return fallback || null;
  }
}
