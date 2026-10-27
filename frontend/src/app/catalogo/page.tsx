import { getProducts } from '@/lib/api';
import { Metadata } from 'next';
import { MessageCircle, QrCode, Store, Truck } from 'lucide-react';
import { CatalogSearchFilter } from '@/components/CatalogSearchFilter';

export const metadata: Metadata = {
  title: 'Catálogo de Abarrotes y Snacks',
  description:
    'Explora nuestro inventario de maní crudo y molido para sopa, ají colorado y amarillo, condimentos criollos y snacks caseros crocantes en Sucre. Haz tu pedido directo por WhatsApp con pago Simple QR.',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-pastel-amber/80 text-pastel-amberText border border-pastel-amberBorder shadow-soft mb-3">
          <Store className="w-3.5 h-3.5" />
          Tienda Virtual Oficial &bull; Productos Sucreñita
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sucrenita-900 mt-2">
          Catálogo Artesanal de la Casa
        </h1>
        <p className="mt-3 text-sm sm:text-base text-sucrenita-600 max-w-xl mx-auto leading-relaxed">
          Elige los ingredientes que le darán el auténtico toque casero a tu comida o los snacks crujientes preparados por Doña Sucreñita. Agrega a tu lista o pide al instante por WhatsApp con cobro Simple QR.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-2xl bg-white/80 border border-pastel-sandDark shadow-soft text-xs text-sucrenita-700">
          <span className="flex items-center gap-2 font-medium">
            <QrCode className="w-4 h-4 text-pastel-peachText" />
            Pagos rápidos con Simple QR
          </span>
          <span className="hidden sm:inline text-pastel-sandDark">•</span>
          <span className="flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 text-pastel-amberText" />
            Entregas en Sucre y envíos nacionales
          </span>
          <span className="hidden sm:inline text-pastel-sandDark">•</span>
          <span className="flex items-center gap-2 font-medium">
            <MessageCircle className="w-4 h-4 text-pastel-sageText" />
            Atención personalizada por WhatsApp
          </span>
        </div>
      </div>

      <CatalogSearchFilter
        initialProducts={products}
        currentCategory={currentCategory}
      />
    </div>
  );
}
