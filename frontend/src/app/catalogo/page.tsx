import { getProducts } from '@/lib/api';
import { Metadata } from 'next';
import { MessageCircle, QrCode, Store, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { CatalogSearchFilter } from '@/components/CatalogSearchFilter';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Catálogo de Abarrotes y Snacks Artesanales',
  description:
    'Explora nuestro inventario de maní crudo y molido para sopa, ají colorado y amarillo puro en batán, condimentos criollos y snacks caseros crocantes en Sucre, Bolivia. Haz tu pedido directo por WhatsApp con cobro Simple QR o PayPal.',
  alternates: {
    canonical: '/catalogo',
  },
};

export const revalidate = 60;

interface CatalogoPageProps {
  searchParams: {
    categoria?: string;
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productos-sucrenita.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Catálogo Oficial',
      item: `${siteUrl}/catalogo`,
    },
  ],
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const currentCategory = searchParams.categoria;
  const products = await getProducts(currentCategory);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-pastel-amber/80 text-pastel-amberText border border-pastel-amberBorder shadow-soft">
            <Store className="w-3.5 h-3.5" />
            <span>Tienda Virtual Oficial &bull; Productos Sucreñita</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sucrenita-900 tracking-tight">
            Catálogo Artesanal de la Casa
          </h1>

          <p className="text-sm sm:text-base text-sucrenita-600 max-w-2xl mx-auto leading-relaxed">
            Ingredientes seleccionados para dar el auténtico toque chuquisaqueño a tus recetas familiares y snacks recién tostados para disfrutar en cualquier momento.
          </p>

          <div className="pt-2 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-2xl bg-white/80 border border-pastel-sandDark shadow-soft text-xs text-sucrenita-700">
            <span className="flex items-center gap-2 font-medium">
              <QrCode className="w-4 h-4 text-pastel-peachText" />
              Simple QR sin comisiones
            </span>
            <span className="hidden sm:inline text-pastel-sandDark">&bull;</span>
            <span className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-pastel-amberText" />
              Entregas en Sucre y flotas al interior
            </span>
            <span className="hidden sm:inline text-pastel-sandDark">&bull;</span>
            <span className="flex items-center gap-2 font-medium">
              <MessageCircle className="w-4 h-4 text-pastel-sageText" />
              WhatsApp directo (+591 71152182)
            </span>
          </div>
        </div>

        <CatalogSearchFilter
          initialProducts={products}
          currentCategory={currentCategory}
        />
      </div>
    </>
  );
}
