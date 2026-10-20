import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Productos',
  description:
    'Explora nuestra selección completa de chocolates finos, alfajores artesanales y dulces típicos de Sucre. Envíos a todo el país.',
};

export const revalidate = 60;

interface CatalogoPageProps {
  searchParams: {
    categoria?: string;
  };
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const currentCategory = searchParams.categoria;
  const products = await getProducts(currentCategory);

  const categories = [
    { name: 'Todos los Productos', slug: undefined },
    { name: 'Chocolates Tradicionales', slug: 'chocolates-tradicionales' },
    { name: 'Alfajores y Galletas', slug: 'alfajores-galletas' },
    { name: 'Dulces Típicos y Bombones', slug: 'dulces-tipicos-bombones' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-sucrenita-500">
          Tienda Oficial Sucrenita
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sucrenita-900 mt-2">
          Catálogo Artesanal
        </h1>
        <p className="mt-4 text-sm sm:text-base text-sucrenita-600">
          Elaboración diaria con ingredientes 100% bolivianos. Selecciona tu categoría favorita y haz tu pedido en línea.
        </p>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          const href = cat.slug ? `/catalogo?categoria=${cat.slug}` : '/catalogo';

          return (
            <Link
              key={cat.name}
              href={href}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sucrenita-700 text-white shadow-md'
                  : 'bg-white text-sucrenita-700 hover:bg-sucrenita-100 border border-sucrenita-200'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Grid de Productos */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-sucrenita-300">
          <p className="font-serif text-xl text-sucrenita-800 font-bold">
            No se encontraron productos en esta categoría.
          </p>
          <p className="mt-2 text-xs text-sucrenita-500">
            Pronto añadiremos nuevas delicias recién horneadas.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold bg-sucrenita-700 text-white"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}
