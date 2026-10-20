import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sucrenita-web.onrender.com';

/**
 * Generación dinámica de Metadata SEO para Googlebot y redes sociales
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no está disponible en este momento.',
    };
  }

  const title = `${product.name} | Sucrenita`;
  const description =
    product.description ||
    `Compra ${product.name} artesanal elaborado en Sucre, Bolivia. Cacao selecto y sabor inigualable.`;
  const imageUrl =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&h=630&q=80';

  return {
    title,
    description,
    alternates: {
      canonical: `/productos/${product.slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'es_BO',
      url: `${siteUrl}/productos/${product.slug}`,
      title,
      description,
      siteName: 'Sucrenita',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const isAvailable = product.stock > 0;
  const numericPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  // Datos estructurados Schema.org para Googlebot (Rich Results: Product)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl ? [product.imageUrl] : [],
    description: product.description || `Delicioso ${product.name} artesanal elaborado por Sucrenita.`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Sucrenita',
    },
    category: product.category?.name || 'Chocolatería y Repostería',
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/productos/${product.slug}`,
      priceCurrency: 'BOB',
      price: Number(numericPrice).toFixed(2),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Sucrenita',
      },
    },
  };

  // Mensaje preparado para pedido por WhatsApp
  const whatsappText = encodeURIComponent(
    `¡Hola Sucrenita! Me interesa pedir el producto: "${product.name}" (${formatPrice(
      product.price
    )}) desde su catálogo web.`
  );
  const whatsappUrl = `https://wa.me/59170000000?text=${whatsappText}`;

  return (
    <>
      {/* Inyección JSON-LD Schema.org para Googlebot */}
      <JsonLd data={productSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb de navegación */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-sucrenita-500">
            <li>
              <Link href="/" className="hover:text-sucrenita-800 transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/catalogo" className="hover:text-sucrenita-800 transition-colors">
                Catálogo
              </Link>
            </li>
            {product.category && (
              <>
                <li>/</li>
                <li>
                  <Link
                    href={`/catalogo?categoria=${product.category.slug}`}
                    className="hover:text-sucrenita-800 transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="font-semibold text-sucrenita-900 truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Detalle Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Galería / Imagen */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-white border border-sucrenita-200/80 shadow-lg">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sucrenita-400 font-serif">
                  Sucrenita Artesanal
                </div>
              )}

              {product.category && (
                <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-sucrenita-800 rounded-full shadow-md">
                  {product.category.name}
                </span>
              )}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {isAvailable ? `Disponible (${product.stock} en inventario)` : 'Agotado'}
                </span>
                <span className="text-xs text-sucrenita-400">SKU: {product.id}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-800">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-sucrenita-500 uppercase tracking-wider font-semibold">
                  (Incluye impuestos de ley)
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="p-5 rounded-2xl bg-white border border-sucrenita-200/80 shadow-sm space-y-3">
              <h2 className="font-serif font-bold text-sm text-sucrenita-900 uppercase tracking-wider">
                Descripción Artesanal
              </h2>
              <p className="text-sm text-sucrenita-700 leading-relaxed">
                {product.description ||
                  'Delicada preparación elaborada según la auténtica receta tradicional de Sucre. Cuidamos cada detalle desde la selección del cacao hasta el empaque final.'}
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Pedir por WhatsApp</span>
              </a>

              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold bg-white hover:bg-sucrenita-100 text-sucrenita-800 border border-sucrenita-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Catálogo</span>
              </Link>
            </div>

            {/* Beneficios & Garantías */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sucrenita-200">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-sucrenita-gold" />
                <span className="text-xs text-sucrenita-700 font-medium">Envío refrigerado</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-sucrenita-gold" />
                <span className="text-xs text-sucrenita-700 font-medium">100% Cacao fino</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-sucrenita-gold" />
                <span className="text-xs text-sucrenita-700 font-medium">Garantía artesanal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
