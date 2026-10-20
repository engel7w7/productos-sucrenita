import { ApiResponse, Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

// Catálogo fallback para garantizar compilación SSR/SSG impecable si la API aún no está activa
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Caja Surtida de Bombones de Sucre',
    slug: 'caja-surtida-bombones-sucre',
    description: 'Exquisita selección de 16 bombones artesanales rellenos de licor, manjar blanco y frutas deshidratadas de los valles chuquisaqueños.',
    price: 85.0,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-chocolates',
    category: {
      id: 'cat-chocolates',
      name: 'Chocolates Tradicionales',
      slug: 'chocolates-tradicionales',
    },
    isActive: true,
  },
  {
    id: 'prod-2',
    name: 'Tableta de Chocolate Amargo 70%',
    slug: 'tableta-chocolate-amargo-70',
    description: 'Cacao silvestre boliviano seleccionado con un balance perfecto de notas florales y tostadas.',
    price: 25.5,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-chocolates',
    category: {
      id: 'cat-chocolates',
      name: 'Chocolates Tradicionales',
      slug: 'chocolates-tradicionales',
    },
    isActive: true,
  },
  {
    id: 'prod-3',
    name: 'Alfajores Sucrenses de Dulce de Leche',
    slug: 'alfajores-sucrenses-dulce-de-leche',
    description: 'Caja de 6 alfajores con masa suave de fécula de maíz y relleno abundante de manjar artesanal.',
    price: 35.0,
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-alfajores',
    category: {
      id: 'cat-alfajores',
      name: 'Alfajores y Galletas',
      slug: 'alfajores-galletas',
    },
    isActive: true,
  },
  {
    id: 'prod-4',
    name: 'Empanadas de Manjar de Leche (Gaznates)',
    slug: 'empanadas-manjar-leche-gaznates',
    description: 'Crujiente masa tradicional horneada, rellena de dulce de leche casero y toque de azúcar impalpable.',
    price: 30.0,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    categoryId: 'cat-dulces',
    category: {
      id: 'cat-dulces',
      name: 'Dulces Típicos y Bombones',
      slug: 'dulces-tipicos-bombones',
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
