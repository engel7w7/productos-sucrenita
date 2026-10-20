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
  QrCode,
  ShieldCheck,
  Sparkles,
  Truck,
  Wheat,
} from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sucrenita-web.onrender.com';

/**
 * Generación dinámica de Metadata SEO para Googlebot y redes sociales
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no está disponible en este momento.',
    };
  }

  const title = `${product.name} | Productos Sucreñita`;
  const description =
    product.description ||
    `Compra ${product.name} garantizado por Productos Sucreñita. Abarrotes y snacks tradicionales con venta directa por WhatsApp y cobro QR.`;
  const imageUrl =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80';

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
      siteName: 'Productos Sucreñita',
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

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
    description: product.description || `Calidad garantizada de ${product.name} por Productos Sucreñita.`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Productos Sucreñita',
    },
    category: product.category?.name || 'Abarrotes y Snacks',
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
        name: 'Productos Sucreñita',
      },
    },
  };

  // Mensaje preparado para pedido por WhatsApp
  const whatsappText = encodeURIComponent(
    `¡Hola Productos Sucreñita! Me interesa pedir el producto: "${product.name}" (${formatPrice(
      product.price
    )}) desde su catálogo web. ¿Tienen disponible para coordinar la entrega y el cobro por QR?`
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
              <Link href="/" className="hover:text-amber-800 transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/catalogo" className="hover:text-amber-800 transition-colors">
                Catálogo
              </Link>
            </li>
            {product.category && (
              <>
                <li>/</li>
                <li>
                  <Link
                    href={`/catalogo?categoria=${product.category.slug}`}
                    className="hover:text-amber-800 transition-colors"
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
                <div className="w-full h-full flex items-center justify-center text-amber-600 font-serif">
                  Productos Sucreñita
                </div>
              )}

              {product.category && (
                <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-amber-900 rounded-full shadow-md">
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
                  {isAvailable ? `Disponible (${product.stock} unidades en almacén)` : 'Agotado temporalmente'}
                </span>
                <span className="text-xs text-sucrenita-400">SKU: {product.id}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-800">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-sucrenita-500 uppercase tracking-wider font-semibold">
                  (Precio por unidad / paquete)
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="p-5 rounded-2xl bg-white border border-sucrenita-200/80 shadow-sm space-y-3">
              <h2 className="font-serif font-bold text-sm text-sucrenita-900 uppercase tracking-wider flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-600" />
                Detalles del Producto y Calidad
              </h2>
              <p className="text-sm text-sucrenita-700 leading-relaxed">
                {product.description ||
                  'Producto elaborado y seleccionado con los más altos estándares de calidad artesanal, conservando el auténtico sabor tradicional boliviano.'}
              </p>
            </div>

            {/* Cobro con QR y Pedido */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-amber-700">
                <QrCode className="w-5 h-5" />
              </div>
              <p className="leading-snug">
                <strong>Pago fácil y seguro con código QR:</strong> Coordina tu pedido por chat y realiza la transferencia directa mediante Simple QR sin comisiones adicionales.
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold bg-white hover:bg-amber-50 text-sucrenita-800 border border-sucrenita-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Catálogo</span>
              </Link>
            </div>

            {/* Beneficios & Garantías */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sucrenita-200">
              <div className="flex items-center gap-3">
                <Wheat className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-sucrenita-700 font-medium">Granos limpios</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-sucrenita-700 font-medium">Calidad casera</span>
              </div>
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-sucrenita-700 font-medium">Pago Simple QR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
