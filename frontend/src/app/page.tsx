import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

export const revalidate = 60; // SSR con Revalidación Incremental (ISR)

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sucrenita-100/60 via-sucrenita-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-sucrenita-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-sucrenita-200 text-sucrenita-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sucrenita-gold" />
                <span>Tradición Chocolatera de Sucre desde el Corazón de Bolivia</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sucrenita-900 tracking-tight leading-[1.15]">
                El auténtico sabor <br className="hidden sm:inline" />
                <span className="text-sucrenita-600 underline decoration-sucrenita-gold/60 decoration-wavy underline-offset-8">
                  artesanal sucrense
                </span>
              </h1>

              <p className="text-base sm:text-lg text-sucrenita-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Descubre nuestra exclusiva colección de bombones rellenos, tabletas de cacao puro y repostería tradicional, elaborados a mano respetando recetas coloniales.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/catalogo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-sucrenita-700 hover:bg-sucrenita-800 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/catalogo?categoria=chocolates-tradicionales"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white hover:bg-sucrenita-100 text-sucrenita-800 border border-sucrenita-300 transition-colors"
                >
                  Ver Chocolates Finos
                </Link>
              </div>

              {/* Badges de confianza */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-sucrenita-200/80">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-sucrenita-800">100%</span>
                  <span className="text-xs text-sucrenita-500">Cacao Boliviano</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-sucrenita-800">Artesanal</span>
                  <span className="text-xs text-sucrenita-500">Hecho en Sucre</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif font-bold text-2xl text-sucrenita-800">Envío</span>
                  <span className="text-xs text-sucrenita-500">A todo el país</span>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80"
                  alt="Bombones finos artesanales Sucrenita"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark text-white">
                  <p className="text-xs uppercase tracking-widest text-sucrenita-gold font-bold">
                    Especialidad de la Casa
                  </p>
                  <p className="font-serif text-lg font-bold">Bombones Tradicionales de Sucre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo Destacado (SSR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sucrenita-500">
              Nuestra Selección
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 mt-1">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sucrenita-600 hover:text-sucrenita-800 transition-colors"
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

      {/* Valores / Pilares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sucrenita-200/80 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sucrenita-100 text-sucrenita-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Ingredientes Selectos</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Utilizamos cacao nativo de la Amazonía boliviana y leche de granjas locales de los valles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sucrenita-100 text-sucrenita-700">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Mano de Obra Local</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Cada receta es ejecutada por maestras y maestros confiteros con décadas de experiencia en Sucre.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sucrenita-100 text-sucrenita-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-sucrenita-900">Frescura Certificada</h3>
              <p className="mt-1 text-xs text-sucrenita-600 leading-relaxed">
                Producción en lotes reducidos para garantizar sabor inigualable y textura óptima en cada mordisco.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
