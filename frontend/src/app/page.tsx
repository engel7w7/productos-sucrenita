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
        text: 'Aceptamos Simple QR bancario boliviano sin comisiones, pasarela PayPal internacional con tarjeta de crédito o débito, y efectivo contra entrega en la ciudad de Sucre.',
      },
    },
  ],
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

  return (
    <>
      <JsonLd data={faqSchemaData} />

      <div className="flex flex-col gap-16 md:gap-24 pb-20">
        <section className="relative overflow-hidden bg-pastel-sand/60 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-pastel-sandDark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-pastel-sandDark text-sucrenita-800 shadow-soft">
                  <Wheat className="w-4 h-4 text-sucrenita-700" />
                  <span>Emprendimiento Familiar Chuquisaqueño &bull; Taller Tradicional en Sucre</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sucrenita-900 tracking-tight leading-[1.15]">
                  Los auténticos <br className="hidden sm:inline" />
                  <span className="text-sucrenita-800 underline decoration-sucrenita-400/60 decoration-wavy underline-offset-8">
                    abarrotes y snacks
                  </span> <br className="hidden sm:inline" />
                  de Sucreñita
                </h1>

                <p className="text-base sm:text-lg text-sucrenita-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Maní puro sin harinas de relleno para la auténtica sopa de maní, ají colorado y dulce molidos en batán de piedra, y snacks crocantes preparados con receta de antaño en nuestro taller familiar en Sucre, Bolivia.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/catalogo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-sucrenita-800 hover:bg-sucrenita-900 text-white shadow-soft transition-all transform hover:-translate-y-0.5"
                  >
                    <Store className="w-4 h-4 text-pastel-sand" />
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <WhatsAppButton
                    url="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido%20desde%20su%20cat%C3%A1logo%20web"
                    source="hero"
                    label="Pedir por WhatsApp (+591 71152182)"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-white hover:bg-pastel-sand text-sucrenita-800 border border-pastel-sandDark shadow-soft transition-all"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3 pt-8 border-t border-pastel-sandDark">
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white border border-pastel-sandDark shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900">100%</span>
                    <span className="text-[11px] text-sucrenita-600">Puro Sin Relleno</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white border border-pastel-sandDark shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900">Simple QR</span>
                    <span className="text-[11px] text-sucrenita-600">Bancos de Bolivia</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white border border-pastel-sandDark shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900">PayPal</span>
                    <span className="text-[11px] text-sucrenita-600">Tarjetas / Exterior</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white border border-pastel-sandDark shadow-soft">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-sucrenita-900">B2C</span>
                    <span className="text-[11px] text-sucrenita-600">Directo del Taller</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg border border-pastel-sandDark bg-white">
                  <Image
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                    alt="Ajíes y condimentos tradicionales de Sucre Productos Sucreñita"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-pastel text-sucrenita-900 shadow-soft">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-sucrenita-700" />
                      <span className="text-[11px] uppercase tracking-wider text-sucrenita-700 font-bold">
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
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-sucrenita-800 border border-pastel-sandDark shadow-soft mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sucrenita-700" />
              Nuestras Dos Líneas Comerciales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900">
              Escoge tu sabor preferido
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-pastel-sandDark text-sucrenita-900 shadow-soft flex flex-col justify-between min-h-[240px] hover:border-sucrenita-300 transition-colors">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pastel-sand text-sucrenita-800 border border-pastel-sandDark shadow-soft mb-3">
                  Línea de Cocina Tradicional
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900">
                  Abarrotes & Condimentos
                </h3>
                <p className="mt-2 text-sm text-sucrenita-600 max-w-sm leading-relaxed">
                  Maní crudo y molido con la proporción exacta para la auténtica sopa de maní, ají colorado picante chuquisaqueño y ají dulce amarillo puro molido en batán.
                </p>
              </div>
              <Link
                href="/catalogo?categoria=abarrotes-condimentos"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sucrenita-800 hover:text-sucrenita-950 transition-colors"
              >
                <span>Explorar productos de cocina</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-pastel-sandDark text-sucrenita-900 shadow-soft flex flex-col justify-between min-h-[240px] hover:border-sucrenita-300 transition-colors">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pastel-sand text-sucrenita-800 border border-pastel-sandDark shadow-soft mb-3">
                  Línea de Degustación
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900">
                  Snacks Artesanales
                </h3>
                <p className="mt-2 text-sm text-sucrenita-600 max-w-sm leading-relaxed">
                  Chicharrones crujientes sin grasa excedente, maní garrapiñado acaramelado a fuego lento y habas fritas saladas para compartir en familia.
                </p>
              </div>
              <Link
                href="/catalogo?categoria=snacks-artesanales"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sucrenita-800 hover:text-sucrenita-950 transition-colors"
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
              <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-600">
                Inventario Disponible
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 mt-1">
                Productos Destacados
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sucrenita-800 hover:text-sucrenita-950 transition-colors"
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
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-sucrenita-800 border border-pastel-sandDark shadow-soft mb-2">
              <Clock className="w-3.5 h-3.5 text-sucrenita-700" />
              Experiencia de Compra Sencilla
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900">
              ¿Cómo realizar tu pedido?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-pastel-sandDark shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand text-sucrenita-900 font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 mb-2">
                Explora el Catálogo
              </h3>
              <p className="text-xs text-sucrenita-600 leading-relaxed">
                Revisa nuestras fotos y detalles de maní, ajíes y snacks preparados artesanalmente en Sucre.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-pastel-sandDark shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand text-sucrenita-900 font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 mb-2">
                Bolsita o WhatsApp
              </h3>
              <p className="text-xs text-sucrenita-600 leading-relaxed">
                Agrega a tu bolsita para calcular el subtotal en Bolivianos o haz clic para pedir directo por WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-pastel-sandDark shadow-soft flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-pastel-sand text-sucrenita-900 font-serif font-bold text-lg mb-4 flex items-center justify-center border border-pastel-sandDark">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 mb-2">
                Simple QR o PayPal
              </h3>
              <p className="text-xs text-sucrenita-600 leading-relaxed">
                Escanea el Simple QR bancario nacional sin comisiones o paga con PayPal y tarjeta internacional.
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <VideoMarketingSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-pastel-sandDark shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-sand text-sucrenita-800 border border-pastel-sandDark shadow-soft">
                  <Heart className="w-3.5 h-3.5 text-sucrenita-700" />
                  <span>Nuestra Comunidad &bull; Cuatro Redes Oficiales</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
                  Conéctate a Nuestras Redes Oficiales
                </h2>
                <p className="text-sm sm:text-base text-sucrenita-600 leading-relaxed max-w-xl">
                  Síguenos en nuestros cuatro canales autorizados para ver videos de elaboración tradicional, fotos de tostados recientes, recetas chuquisaqueñas y novedades de productos.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-sucrenita-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 shrink-0" />
                    <span>Avisos de disponibilidad de maní fresco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 shrink-0" />
                    <span>Recetas tradicionales de sopa y ajíes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 shrink-0" />
                    <span>Atención directa sin intermediarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sucrenita-700 shrink-0" />
                    <span>Lotes de snacks crocantes de la semana</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/59171152182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 hover:bg-pastel-sand border border-pastel-sandDark transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white text-sucrenita-800 flex items-center justify-center border border-pastel-sandDark shadow-soft">
                      <WhatsAppIcon className="w-5 h-5 text-[#2B5E46]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900">
                      WhatsApp Oficial
                    </h3>
                    <p className="text-[11px] text-sucrenita-500">
                      +591 71152182 &bull; Pedidos
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61595923780807"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 hover:bg-pastel-sand border border-pastel-sandDark transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#1877F2] flex items-center justify-center border border-pastel-sandDark shadow-soft">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900">
                      Página de Facebook
                    </h3>
                    <p className="text-[11px] text-sucrenita-500">
                      Comunidad oficial
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/productossucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 hover:bg-pastel-sand border border-pastel-sandDark transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#E4405F] flex items-center justify-center border border-pastel-sandDark shadow-soft">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900">
                      Perfil de Instagram
                    </h3>
                    <p className="text-[11px] text-sucrenita-500">
                      @productossucrenita
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-pastel-sand/50 hover:bg-pastel-sand border border-pastel-sandDark transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center border border-pastel-sandDark shadow-soft">
                      <TikTokIcon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-800 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-sucrenita-900">
                      TikTok Oficial
                    </h3>
                    <p className="text-[11px] text-sucrenita-500">
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
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 border border-pastel-sandDark">
              <div className="p-3 rounded-2xl bg-white text-sucrenita-700 shadow-soft shrink-0 border border-pastel-sandDark">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900">Selección Rigurosa</h3>
                <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                  Seleccionamos cada grano de maní y cada vaina de ají de manera minuciosa para asegurar la mejor sazón y rendimiento en tus comidas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 border border-pastel-sandDark">
              <div className="p-3 rounded-2xl bg-white text-sucrenita-700 shadow-soft shrink-0 border border-pastel-sandDark">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900">Venta Directa B2C</h3>
                <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                  Trato directo y cercano de nuestro negocio familiar a tu hogar vía WhatsApp, resolviendo cualquier consulta al instante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-pastel-sand/40 border border-pastel-sandDark">
              <div className="p-3 rounded-2xl bg-white text-sucrenita-700 shadow-soft shrink-0 border border-pastel-sandDark">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-sucrenita-900">Simple QR y PayPal</h3>
                <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                  Paga con Simple QR bancario nacional sin comisiones o con tarjeta internacional a través de la pasarela PayPal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
