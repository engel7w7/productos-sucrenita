import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, CheckCircle2, MessageCircle, QrCode, Sparkles, Utensils, Wheat } from 'lucide-react';

export const revalidate = 60; // SSR con Revalidación Incremental (ISR)

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-sucrenita-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-amber-200 text-amber-800 shadow-sm">
                <Wheat className="w-4 h-4 text-amber-600" />
                <span>Emprendimiento Familiar &bull; Calidad y Tradición Casera</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sucrenita-900 tracking-tight leading-[1.15]">
                Los auténticos <br className="hidden sm:inline" />
                <span className="text-amber-700 underline decoration-amber-500/50 decoration-wavy underline-offset-8">
                  abarrotes y snacks
                </span> <br className="hidden sm:inline" />
                de Sucreñita
              </h1>

              <p className="text-base sm:text-lg text-sucrenita-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Descubre nuestra selección especial de maní crudo y molido para la tradicional sopa de maní, ajíes chuquisaqueños puros, condimentos criollos y deliciosos snacks crocantes preparados de forma 100% artesanal.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/catalogo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-amber-700 hover:bg-amber-800 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido%20desde%20su%20cat%C3%A1logo%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>

              {/* Badges de confianza */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-amber-200/80">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-amber-800">100%</span>
                  <span className="text-xs text-sucrenita-600">Granos Selectos</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-amber-800">QR Simple</span>
                  <span className="text-xs text-sucrenita-600">Cobro Seguro</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-amber-800">B2C</span>
                  <span className="text-xs text-sucrenita-600">Venta Directa</span>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                  alt="Ajíes y condimentos tradicionales Productos Sucreñita"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark text-white">
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    El Secreto del Sabor Casero
                  </p>
                  <p className="font-serif text-lg font-bold">Maní, Ajíes & Snacks Artesanales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones de Categorías Principales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Abarrotes */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-md flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-3">
                Línea de Cocina Tradicional
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Abarrotes & Condimentos
              </h3>
              <p className="mt-2 text-sm text-amber-100 max-w-sm leading-relaxed">
                Maní crudo y molido con la grasa exacta para la sopa de maní, ají colorado picante y ají dulce amarillo molido puro.
              </p>
            </div>
            <Link
              href="/catalogo?categoria=abarrotes-condimentos"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-white transition-colors"
            >
              <span>Ver productos de cocina</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Banner Snacks */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-orange-600 to-amber-800 text-white shadow-md flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-3">
                Línea de Degustación
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Snacks Artesanales
              </h3>
              <p className="mt-2 text-sm text-orange-100 max-w-sm leading-relaxed">
                Chicharrones crujientes, maní garrapiñado acaramelado y habas fritas saladas para compartir en cualquier momento.
              </p>
            </div>
            <Link
              href="/catalogo?categoria=snacks-artesanales"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-white transition-colors"
            >
              <span>Ver todos los snacks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Catálogo Destacado (SSR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Inventario Disponible
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 mt-1">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
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

      {/* Pilares del Modelo de Negocio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sucrenita-200/80 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-100 text-amber-800">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Selección Rigurosa</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Seleccionamos cada grano de maní y cada vaina de ají de manera minuciosa para asegurar la mejor sazón y rendimiento en tus comidas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Venta Directa B2C</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Trato directo y cercano de nuestro negocio familiar a tu hogar vía WhatsApp, resolviendo cualquier consulta al instante.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-orange-100 text-orange-800">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Cobro Fácil con QR</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Paga de forma rápida y moderna con Simple QR desde cualquier banco nacional, sin efectivo y con confirmación inmediata.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
