import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Metadata } from 'next';
import { MessageCircle, QrCode, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Catálogo de Abarrotes y Snacks',
  description:
    'Explora nuestro inventario de maní crudo y molido para sopa, ají colorado y amarillo, condimentos criollos y snacks caseros crocantes. Haz tu pedido directo por WhatsApp con pago Simple QR.',
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
    { name: 'Abarrotes y Condimentos', slug: 'abarrotes-condimentos' },
    { name: 'Snacks Artesanales', slug: 'snacks-artesanales' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-pastel-amber/80 text-pastel-amberText border border-pastel-amberBorder shadow-soft mb-3">
          <Store className="w-3.5 h-3.5" />
          Tienda Virtual Oficial &bull; Productos Sucreñita
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sucrenita-900 mt-2">
          Catálogo Artesanal
        </h1>
        <p className="mt-3 text-sm sm:text-base text-sucrenita-600 max-w-xl mx-auto leading-relaxed">
          Selecciona tu categoría para explorar abarrotes de cocina tradicional y deliciosos snacks caseros. Realiza tu pedido directo por WhatsApp y paga mediante código QR.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-white/80 border border-pastel-sandDark shadow-soft text-xs text-sucrenita-700">
          <span className="flex items-center gap-2 font-medium">
            <QrCode className="w-4 h-4 text-pastel-peachText" />
            Pagos rápidos con Simple QR
          </span>
          <span className="hidden sm:inline text-pastel-sandDark">•</span>
          <span className="flex items-center gap-2 font-medium">
            <MessageCircle className="w-4 h-4 text-pastel-sageText" />
            Atención personalizada por WhatsApp
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          const href = cat.slug ? `/catalogo?categoria=${cat.slug}` : '/catalogo';

          return (
            <Link
              key={cat.name}
              href={href}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-sucrenita-600 text-white shadow-soft-lg scale-105'
                  : 'bg-white text-sucrenita-700 hover:bg-pastel-peach/60 hover:text-pastel-peachText border border-pastel-sandDark/80 shadow-soft'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-pastel-sandDark shadow-soft">
          <p className="font-serif text-xl text-sucrenita-800 font-bold">
            No se encontraron productos en esta categoría.
          </p>
          <p className="mt-2 text-xs text-sucrenita-500">
            Pronto actualizaremos el inventario con nuevos lotes frescos.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}
