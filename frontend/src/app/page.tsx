import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { VideoMarketingSection } from '@/components/VideoMarketingSection';
import { FAQSection } from '@/components/FAQSection';
import { BrandStorySection } from '@/components/BrandStorySection';
import { CulinaryCalculatorSection } from '@/components/CulinaryCalculatorSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { JsonLd } from '@/components/JsonLd';
import {
  ArrowRight,
  MessageCircle,
  QrCode,
  Store,
  Utensils,
  Wheat,
  Facebook,
  Instagram,
  Heart,
  CheckCircle2,
  Sparkles,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { TikTokIcon, PayPalIcon, WhatsAppIcon } from '@/components/SocialIcons';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productos-sucrenita.vercel.app';

export const metadata: Metadata = {
  title: 'Productos Sucreñita | Abarrotes, Ajíes de Chuquisaca y Snacks Artesanales',
  description:
    'Catálogo oficial de Productos Sucreñita en Sucre, Bolivia. Maní seleccionado para la auténtica sopa de maní, ají colorado y dulce molidos en batán de piedra, y snacks crocantes caseros. Compra directa por WhatsApp con cobro Simple QR y pasarela PayPal.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: siteUrl,
    title: 'Productos Sucreñita | Abarrotes, Ajíes de Chuquisaca y Snacks Artesanales',
    description:
      'Maní puro para sopa de maní, ají chuquisaqueño molido a piedra y snacks crocantes con venta directa en Sucre y envíos a toda Bolivia. Paga con Simple QR o PayPal.',
    siteName: 'Productos Sucreñita',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Productos Sucreñita - Abarrotes y Snacks Tradicionales en Sucre, Bolivia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks de Sucre, Bolivia',
    description:
      'Maní para sopa, ají colorado molido y snacks tradicionales de Chuquisaca. Cobros con Simple QR y PayPal.',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo preparo la auténtica Sopa de Maní con el maní molido Sucreñita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestro maní ya viene molido fino conservando sus aceites naturales. Para 6 platos, disuelve 250g en agua fría antes de agregar a la olla con el caldo hirviendo. Deja hervir a fuego medio-bajo durante 45 a 55 minutos para que emulsione parejo sin generar espuma excedente ni cortarse.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre el Ají Colorado y el Ají Amarillo molido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Ají Colorado molido a piedra tiene un picor vivo y un color rojo rubí intenso para mondongo, saice y picantes. El Ají Amarillo dulce está desvenado y despepitado: aporta aroma profundo y color dorado sin picar, ideal para toda la familia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funcionan las entregas en Sucre y los envíos a toda Bolivia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En Sucre realizamos entregas a domicilio en menos de 24 horas. Para el resto de Bolivia (La Paz, Cochabamba, Santa Cruz, Potosí, Oruro, Tarija, Beni y Pando), enviamos dos veces por semana por encomienda en flota con empaque al vacío o hermético.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué formas de pago aceptan en la tienda virtual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aceptamos Simple QR bancario boliviano sin comisiones, pasarela PayPal internacional con tarjeta de crédito o débito al tipo de cambio referencial, y efectivo contra entrega en la ciudad de Sucre.',
      },
    },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  name: 'Productos Sucreñita',
  image: `${siteUrl}/logo-profile.jpg`,
  logo: `${siteUrl}/logo-profile.jpg`,
  url: siteUrl,
  telephone: '+59171152182',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle San Alberto, Zona San Roque y Centro Histórico',
    addressLocality: 'Sucre',
    addressRegion: 'Chuquisaca',
    postalCode: '0000',
    addressCountry: 'BO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -19.0353,
    longitude: -65.2627,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  paymentAccepted: 'Simple QR, PayPal, Tarjeta de Crédito, Efectivo contra entrega',
  currenciesAccepted: 'BOB, USD',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61595923780807',
    'https://www.instagram.com/productossucrenita',
    'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
    'https://wa.me/59171152182',
  ],
};

const websiteSearchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: siteUrl,
  name: 'Productos Sucreñita',
  description: 'Catálogo de abarrotes tradicionales chuquisaqueños, maní para sopa, ají molido y snacks crocantes.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/catalogo?buscar={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default async function HomePage() {
  const products = await getProducts();
  const prioritizedSlugs = new Set([
    'aji-colorado-vaina-seleccionado-1kg',
    'mani-molido-tradicional-sopa-500g',
    'chicharron-artesanal-tira-13-unidades',
    'platanitos-chips-artesanales-26-unidades',
  ]);
  const featured = products.filter((p) => prioritizedSlugs.has(p.slug));
  const featuredProducts = featured.length >= 4 ? featured : products.slice(0, 4);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Productos Destacados de Sucreñita',
    description: 'Selección de abarrotes y snacks artesanales más solicitados en Sucre y Bolivia.',
    itemListElement: featuredProducts.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        url: `${siteUrl}/productos/${p.slug}`,
        image: p.imageUrl ? [p.imageUrl] : [],
        description: p.description || `Calidad garantizada de ${p.name} por Productos Sucreñita.`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'BOB',
          price: (typeof p.price === 'string' ? parseFloat(p.price) : p.price).toFixed(2),
          availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchemaData} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSearchSchema} />
      <JsonLd data={itemListSchema} />

      <div className="flex flex-col gap-16 md:gap-24 pb-20">
        <section className="relative overflow-hidden bg-pastel-sand/60 dark:bg-cacao-900/60 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-pastel-sandDark dark:border-cacao-700 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-800 dark:text-[#E8DFC8] shadow-soft">
                  <Wheat className="w-4 h-4 text-sucrenita-700 dark:text-[#D4A853]" />
                  <span>Emprendimiento Familiar Chuquisaqueño &bull; Taller Tradicional en Sucre</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] tracking-tight leading-[1.15]">
                  Los auténticos <br className="hidden sm:inline" />
                  <span className="text-sucrenita-800 dark:text-[#D4A853] underline decoration-sucrenita-400/60 dark:decoration-[#874C37]/60 decoration-wavy underline-offset-8">
                    abarrotes y snacks
                  </span> <br className="hidden sm:inline" />
                  de Sucreñita
                </h1>

                <p className="text-base sm:text-lg text-sucrenita-600 dark:text-[#CBBFB6] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Maní puro sin harinas de relleno para la auténtica sopa de maní, ají colorado y dulce molidos en batán de piedra, y snacks crocantes preparados con receta de antaño en nuestro taller familiar en Sucre, Bolivia.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/catalogo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-sucrenita-800 hover:bg-sucrenita-900 dark:bg-cacao-800 dark:hover:bg-cacao-700 text-white shadow-soft transition-all transform hover:-translate-y-0.5"
                  >
                    <Store className="w-4 h-4 text-pastel-sand" />
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <WhatsAppButton
                    url="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido%20desde%20su%20cat%C3%A1logo%20web"
                    source="hero"
                    label="Pedir por WhatsApp (+591 71152182)"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-[#FAF6F0] border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3 pt-8 border-t border-pastel-sandDark dark:border-cacao-700">
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900 dark:text-[#FAF6F0]">100%</span>
                    <span className="text-[11px] text-sucrenita-600 dark:text-[#A8988C]">Puro Sin Relleno</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900 dark:text-[#FAF6F0]">Simple QR</span>
                    <span className="text-[11px] text-sucrenita-600 dark:text-[#A8988C]">Bancos de Bolivia</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900 dark:text-[#FAF6F0]">PayPal</span>
                    <span className="text-[11px] text-sucrenita-600 dark:text-[#A8988C]">Cambio Paralelo</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900 dark:text-[#FAF6F0]">B2C</span>
                    <span className="text-[11px] text-sucrenita-600 dark:text-[#A8988C]">Directo del Taller</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg border border-pastel-sandDark dark:border-cacao-700 bg-white dark:bg-cacao-900">
                  <Image
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                    alt="Ajíes y condimentos tradicionales de Sucre Productos Sucreñita"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-900/60 dark:from-cacao-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-pastel text-sucrenita-900 dark:text-[#FAF6F0] shadow-soft">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D4A853]" />
                      <span className="text-[11px] uppercase tracking-wider text-sucrenita-700 dark:text-[#D4A853] font-bold">
                        Desde Sucre, Bolivia &bull; San Roque
                      </span>
                    </div>
                    <p className="font-serif text-lg font-bold">Maní, Ajíes & Snacks Artesanales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-cacao-800 text-sucrenita-800 dark:text-[#E8DFC8] border border-pastel-sandDark dark:border-cacao-700 shadow-soft mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D4A853]" />
              Nuestras Dos Líneas Comerciales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
              Escoge tu sabor preferido
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-900 dark:text-[#FAF6F0] shadow-soft flex flex-col justify-between min-h-[240px] hover:border-sucrenita-300 dark:hover:border-cacao-600 transition-colors">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-[#D1C3B8] border border-pastel-sandDark dark:border-cacao-700 shadow-soft mb-3">
                  Línea de Cocina Tradicional
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
                  Abarrotes & Condimentos
                </h3>
                <p className="mt-2 text-sm text-sucrenita-600 dark:text-[#A8988C] max-w-sm leading-relaxed">
                  Maní crudo y molido con la proporción exacta para la auténtica sopa de maní, ají colorado picante chuquisaqueño y ají dulce amarillo puro molido en batán.
                </p>
              </div>
              <Link
                href="/catalogo?categoria=abarrotes-condimentos"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sucrenita-800 dark:text-[#D4A853] hover:text-sucrenita-950 dark:hover:text-white transition-colors"
              >
                <span>Explorar productos de cocina</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative rounded-3xl p-8 sm:p-10 bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-900 dark:text-[#FAF6F0] shadow-soft flex flex-col justify-between min-h-[240px] hover:border-sucrenita-300 dark:hover:border-cacao-600 transition-colors">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-[#D1C3B8] border border-pastel-sandDark dark:border-cacao-700 shadow-soft mb-3">
                  Línea de Degustación
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
                  Snacks Artesanales
                </h3>
                <p className="mt-2 text-sm text-sucrenita-600 dark:text-[#A8988C] max-w-sm leading-relaxed">
                  Chicharrones crujientes sin grasa excedente, maní garrapiñado acaramelado a fuego lento y habas fritas saladas para compartir en familia.
                </p>
              </div>
              <Link
                href="/catalogo?categoria=snacks-artesanales"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sucrenita-800 dark:text-[#D4A853] hover:text-sucrenita-950 dark:hover:text-white transition-colors"
              >
                <span>Ver todos los snacks caseros</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#A8988C]">
                Inventario Disponible
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] mt-1">
                Productos Destacados
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sucrenita-800 dark:text-[#D4A853] hover:text-sucrenita-950 dark:hover:text-white transition-colors"
            >
              <span>Ver todo el catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <CulinaryCalculatorSection />

        <BrandStorySection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-cacao-800 text-sucrenita-800 dark:text-[#E8DFC8] border border-pastel-sandDark dark:border-cacao-700 shadow-soft mb-2">
              <Clock className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D4A853]" />
              Experiencia de Compra Sencilla
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
              ¿Cómo realizar tu pedido?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-900 dark:text-[#FAF6F0] font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-[#FAF6F0] mb-2">
                Explora el Catálogo
              </h3>
              <p className="text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                Revisa nuestras fotos y detalles de maní, ajíes y snacks preparados artesanalmente en Sucre.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-900 dark:text-[#FAF6F0] font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-[#FAF6F0] mb-2">
                Bolsita o WhatsApp
              </h3>
              <p className="text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                Agrega a tu bolsita para calcular el subtotal en Bolivianos o haz clic para pedir directo por WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-900 dark:text-[#FAF6F0] font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-[#FAF6F0] mb-2">
                Simple QR o PayPal
              </h3>
              <p className="text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                Escanea el Simple QR bancario nacional sin comisiones o paga con PayPal al tipo de cambio referencial.
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <VideoMarketingSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-[#D1C3B8] border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                  <Heart className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D48065]" />
                  <span>Nuestra Comunidad &bull; Cuatro Redes Oficiales</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] tracking-tight">
                  Conéctate a Nuestras Redes Oficiales
                </h2>
                <p className="text-sm sm:text-base text-sucrenita-600 dark:text-[#A8988C] leading-relaxed max-w-xl">
                  Síguenos en nuestros cuatro canales autorizados para ver videos de elaboración tradicional, fotos de tostados recientes, recetas chuquisaqueñas y novedades de productos.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-sucrenita-700 dark:text-[#CBBFB6]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 dark:text-[#78A887] shrink-0" />
                    <span>Avisos de disponibilidad de maní fresco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 dark:text-[#78A887] shrink-0" />
                    <span>Recetas tradicionales de sopa y ajíes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 dark:text-[#78A887] shrink-0" />
                    <span>Atención directa sin intermediarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 dark:text-[#78A887] shrink-0" />
                    <span>Lotes de snacks crocantes de la semana</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/59171152182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-800/60 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-cacao-750 text-sucrenita-800 dark:text-[#FAF6F0] flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                      <WhatsAppIcon className="w-5 h-5 text-[#2B5E46] dark:text-[#78A887]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0]">
                      WhatsApp Oficial
                    </h3>
                    <p className="text-[11px] text-sucrenita-500 dark:text-[#A8988C]">
                      +591 71152182 &bull; Pedidos
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61595923780807"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-800/60 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-cacao-750 text-[#1877F2] flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0]">
                      Página de Facebook
                    </h3>
                    <p className="text-[11px] text-sucrenita-500 dark:text-[#A8988C]">
                      Comunidad oficial
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/productossucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-800/60 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-cacao-750 text-[#E4405F] flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0]">
                      Perfil de Instagram
                    </h3>
                    <p className="text-[11px] text-sucrenita-500 dark:text-[#A8988C]">
                      @productossucrenita
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-800/60 hover:bg-pastel-sand dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-cacao-750 text-slate-900 dark:text-slate-200 flex items-center justify-center border border-pastel-sandDark dark:border-cacao-700 shadow-soft">
                      <TikTokIcon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0]">
                      TikTok Oficial
                    </h3>
                    <p className="text-[11px] text-sucrenita-500 dark:text-[#A8988C]">
                      @sucrenita_artesanal
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="card-pastel rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-800/40 border border-pastel-sandDark dark:border-cacao-700">
              <div className="p-3 rounded-2xl bg-white dark:bg-cacao-750 text-sucrenita-700 dark:text-[#D4A853] shadow-soft shrink-0 border border-pastel-sandDark dark:border-cacao-700">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900 dark:text-[#FAF6F0]">Selección Rigurosa</h3>
                <p className="mt-1 text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                  Seleccionamos cada grano de maní y cada vaina de ají de manera minuciosa para asegurar la mejor sazón y rendimiento en tus comidas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-800/40 border border-pastel-sandDark dark:border-cacao-700">
              <div className="p-3 rounded-2xl bg-white dark:bg-cacao-750 text-sucrenita-700 dark:text-[#D4A853] shadow-soft shrink-0 border border-pastel-sandDark dark:border-cacao-700">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900 dark:text-[#FAF6F0]">Venta Directa B2C</h3>
                <p className="mt-1 text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                  Trato directo y cercano de nuestro negocio familiar a tu hogar vía WhatsApp, resolviendo cualquier consulta al instante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 dark:bg-cacao-800/40 border border-pastel-sandDark dark:border-cacao-700">
              <div className="p-3 rounded-2xl bg-white dark:bg-cacao-750 text-sucrenita-700 dark:text-[#D4A853] shadow-soft shrink-0 border border-pastel-sandDark dark:border-cacao-700">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900 dark:text-[#FAF6F0]">Simple QR y PayPal</h3>
                <p className="mt-1 text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed">
                  Paga con Simple QR bancario nacional sin comisiones o con tarjeta internacional a través de la pasarela PayPal al cambio referencial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
