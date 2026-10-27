import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import {
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Wheat,
  Utensils,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ShareProductButtons } from '@/components/ShareProductButtons';
import { ProductDetailActions } from '@/components/ProductDetailActions';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productos-sucrenita.vercel.app';

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
    `Compra ${product.name} garantizado por Productos Sucreñita en Sucre, Bolivia. Abarrotes y snacks tradicionales con venta directa por WhatsApp y cobro Simple QR.`;
  const imageUrl =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80';

  const productUrl = `${siteUrl}/productos/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/productos/${product.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'es_BO',
      url: productUrl,
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
  const productUrl = `${siteUrl}/productos/${product.slug}`;

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
      url: productUrl,
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
        name: 'Catálogo',
        item: `${siteUrl}/catalogo`,
      },
      ...(product.category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: product.category.name,
              item: `${siteUrl}/catalogo?categoria=${product.category.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: product.name,
              item: productUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: product.name,
              item: productUrl,
            },
          ]),
    ],
  };

  const whatsappText = encodeURIComponent(
    `¡Hola Doña Sucreñita! Me interesa pedir: "${product.name}" (${formatPrice(
      product.price
    )}) desde su catálogo web. ¿Tienen disponible para coordinar la entrega y el cobro por Simple QR?`
  );
  const whatsappUrl = `https://wa.me/59170000000?text=${whatsappText}`;

  const getCookingTip = () => {
    const s = product.slug.toLowerCase();
    if (s.includes('sopa') || s.includes('mani-molido')) {
      return 'Para lograr la auténtica sopa de maní chuquisaqueña de domingo, sofríe primero tus verduras y carne, añade el caldo y agrega el maní molido disuelto en un poco de agua fría. Cocina a fuego lento durante 40 a 45 minutos sin tapar para que espese con su propia grasa natural.';
    }
    if (s.includes('aji-colorado')) {
      return 'Sofríe este ají molido a piedra a fuego muy bajo con un chorrito de aceite durante 10 minutos antes de añadirlo a tus carnes. Así libera todo su pigmento rojo rubí y su picor equilibrado para mondongos y picantes.';
    }
    if (s.includes('aji-amarillo')) {
      return 'Este ají dulce es el preferido para sajta de pollo y picante de lengua sin ardor. Mézclalo con cebollita sofrita y comino criollo para obtener una salsa dorada y aromática.';
    }
    if (s.includes('chicharron')) {
      return 'Corteza frita en su punto justo. Para disfrutarlo extra crocante en días húmedos, colócalo 3 minutos en sartén seca o en horno suave sin añadir aceite.';
    }
    if (s.includes('habas')) {
      return 'Habas de altura tostadas con sal marina, perfectas para acompañar con un queso criollo o disfrutar como snack energético a cualquier hora.';
    }
    return 'Elaborado bajo receta casera tradicional sucrense, seleccionado a mano y embolsado con total higiene para garantizar frescura en tu cocina.';
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-sucrenita-500">
            <li>
              <Link href="/" className="hover:text-sucrenita-900 transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/catalogo" className="hover:text-sucrenita-900 transition-colors">
                Catálogo
              </Link>
            </li>
            {product.category && (
              <>
                <li>/</li>
                <li>
                  <Link
                    href={`/catalogo?categoria=${product.category.slug}`}
                    className="hover:text-sucrenita-900 transition-colors"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-pastel-cream border border-pastel-sandDark shadow-soft">
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
                <div className="w-full h-full flex items-center justify-center text-pastel-amberText font-serif">
                  Productos Sucreñita
                </div>
              )}

              {product.category && (
                <span className="absolute top-4 left-4 px-3.5 py-1.5 text-xs font-semibold tracking-wide bg-white/95 backdrop-blur-md text-sucrenita-800 rounded-full border border-pastel-sandDark shadow-sm">
                  {product.category.name}
                </span>
              )}
            </div>

            <div className="p-4 rounded-3xl bg-pastel-sand/50 border border-pastel-sandDark text-xs text-sucrenita-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sucrenita-900">
                <Utensils className="w-4 h-4 text-pastel-peachText" />
                <span>Consejo de la Casa de Doña Sucreñita</span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                {getCookingTip()}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                    isAvailable
                      ? 'bg-pastel-sage text-pastel-sageText border-pastel-sageBorder'
                      : 'bg-pastel-rose text-rose-800 border-rose-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {isAvailable ? `Disponible (${product.stock} unidades en almacén)` : 'Agotado temporalmente'}
                </span>
                <span className="text-xs text-sucrenita-400">Código: {product.slug}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-sucrenita-500 uppercase tracking-wider font-medium">
                  (Precio en Bolivianos)
                </span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-3">
              <h2 className="font-serif font-bold text-sm text-sucrenita-900 uppercase tracking-wider flex items-center gap-2">
                <Wheat className="w-4 h-4 text-pastel-amberText" />
                <span>Descripción y Calidad Tradicional</span>
              </h2>
              <p className="text-sm text-sucrenita-700 leading-relaxed">
                {product.description ||
                  'Producto elaborado y seleccionado con los más altos estándares de calidad artesanal, conservando el auténtico sabor tradicional boliviano.'}
              </p>
            </div>

            <ProductDetailActions product={product} whatsappUrl={whatsappUrl} />

            <div className="p-4 rounded-3xl bg-pastel-amber/40 border border-pastel-amberBorder text-sucrenita-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <QrCode className="w-4 h-4 text-pastel-amberText shrink-0" />
                <span>Cobro seguro e inmediato con Simple QR</span>
              </div>
              <p className="leading-relaxed text-[11px] text-sucrenita-700">
                Aceptamos transferencias desde <strong>Banco Unión, BCP, BNB, Banco FIE, Mercantil Santa Cruz, Ganadero, Banco Sol</strong> y todas las aplicaciones bancarias de Bolivia. Al coordinar por WhatsApp te enviamos el código QR para pagar en un segundo sin comisiones.
              </p>
            </div>

            <ShareProductButtons productName={product.name} slug={product.slug} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-pastel-sandDark">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark/60">
                <Wheat className="w-4 h-4 text-pastel-amberText shrink-0" />
                <span className="text-xs text-sucrenita-700 font-medium">Granos limpios</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark/60">
                <ShieldCheck className="w-4 h-4 text-pastel-sageText shrink-0" />
                <span className="text-xs text-sucrenita-700 font-medium">Sazón casera</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark/60">
                <Truck className="w-4 h-4 text-pastel-peachText shrink-0" />
                <span className="text-xs text-sucrenita-700 font-medium">Envíos en Sucre</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 text-xs font-semibold text-sucrenita-600 hover:text-sucrenita-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al catálogo completo de productos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
