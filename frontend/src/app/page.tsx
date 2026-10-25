import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ArrowRight, MessageCircle, QrCode, Store, Utensils, Wheat } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-b from-pastel-peach/40 via-pastel-amber/30 to-pastel-sand pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-pastel-sandDark/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber/80 border border-pastel-amberBorder text-pastel-amberText shadow-soft">
                <Wheat className="w-4 h-4 text-pastel-amberText" />
                <span>Emprendimiento Familiar &bull; Sabor y Tradición Casera</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sucrenita-900 tracking-tight leading-[1.15]">
                Los auténticos <br className="hidden sm:inline" />
                <span className="text-pastel-peachText underline decoration-pastel-peachText/40 decoration-wavy underline-offset-8">
                  abarrotes y snacks
                </span> <br className="hidden sm:inline" />
                de Sucreñita
              </h1>

              <p className="text-base sm:text-lg text-sucrenita-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Maní crudo y molido con la grasa exacta para la sopa tradicional, ajíes chuquisaqueños desvenados y molidos a piedra, y snacks crujientes preparados artesanalmente en casa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/catalogo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Store className="w-4 h-4" />
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <WhatsAppButton
                  url="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido%20desde%20su%20cat%C3%A1logo%20web"
                  source="hero"
                  label="Pedir por WhatsApp"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-pastel-sage hover:bg-emerald-100/80 text-pastel-sageText border border-pastel-sageBorder shadow-soft transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-pastel-sandDark/70">
                <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white/70 border border-pastel-sandDark/50 shadow-soft">
                  <span className="font-serif font-bold text-2xl text-sucrenita-700">100%</span>
                  <span className="text-xs text-sucrenita-500">Granos Selectos</span>
                </div>
                <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white/70 border border-pastel-sandDark/50 shadow-soft">
                  <span className="font-serif font-bold text-2xl text-pastel-amberText">Simple QR</span>
                  <span className="text-xs text-sucrenita-500">Cobro Seguro</span>
                </div>
                <div className="flex flex-col items-center lg:items-start p-3 rounded-2xl bg-white/70 border border-pastel-sandDark/50 shadow-soft">
                  <span className="font-serif font-bold text-2xl text-pastel-sageText">B2C</span>
                  <span className="text-xs text-sucrenita-500">Venta Directa</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                  alt="Ajíes y condimentos tradicionales Productos Sucreñita"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-pastel text-sucrenita-900 shadow-soft">
                  <p className="text-[11px] uppercase tracking-wider text-pastel-peachText font-bold">
                    El Secreto del Sabor Casero
                  </p>
                  <p className="font-serif text-lg font-bold">Maní, Ajíes & Snacks Artesanales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-pastel-amber to-amber-100/70 border border-pastel-amberBorder text-sucrenita-900 shadow-soft flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 text-pastel-amberText border border-pastel-amberBorder/50 shadow-soft mb-3">
                Línea de Cocina Tradicional
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900">
                Abarrotes & Condimentos
              </h3>
              <p className="mt-2 text-sm text-sucrenita-700 max-w-sm leading-relaxed">
                Maní crudo y molido con la grasa exacta para la sopa de maní, ají colorado picante y ají dulce amarillo molido puro.
              </p>
            </div>
            <Link
              href="/catalogo?categoria=abarrotes-condimentos"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pastel-amberText hover:text-amber-900 transition-colors"
            >
              <span>Explorar productos de cocina</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-pastel-peach to-orange-100/60 border border-pastel-peachBorder text-sucrenita-900 shadow-soft flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 text-pastel-peachText border border-pastel-peachBorder/50 shadow-soft mb-3">
                Línea de Degustación
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900">
                Snacks Artesanales
              </h3>
              <p className="mt-2 text-sm text-sucrenita-700 max-w-sm leading-relaxed">
                Chicharrones crujientes, maní garrapiñado acaramelado y habas fritas saladas para compartir en cualquier momento.
              </p>
            </div>
            <Link
              href="/catalogo?categoria=snacks-artesanales"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pastel-peachText hover:text-orange-900 transition-colors"
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
            <span className="text-xs font-bold uppercase tracking-wider text-pastel-peachText">
              Inventario Disponible
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 mt-1">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pastel-peachText hover:text-sucrenita-800 transition-colors"
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="card-pastel rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-pastel-amber/50 border border-pastel-amberBorder/60">
            <div className="p-3.5 rounded-2xl bg-white text-pastel-amberText shadow-soft shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Selección Rigurosa</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Seleccionamos cada grano de maní y cada vaina de ají de manera minuciosa para asegurar la mejor sazón y rendimiento en tus comidas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-pastel-sage/50 border border-pastel-sageBorder/60">
            <div className="p-3.5 rounded-2xl bg-white text-pastel-sageText shadow-soft shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Venta Directa B2C</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Trato directo y cercano de nuestro negocio familiar a tu hogar vía WhatsApp, resolviendo cualquier consulta al instante.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-pastel-peach/50 border border-pastel-peachBorder/60">
            <div className="p-3.5 rounded-2xl bg-white text-pastel-peachText shadow-soft shrink-0">
              <QrCode className="w-5 h-5" />
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
