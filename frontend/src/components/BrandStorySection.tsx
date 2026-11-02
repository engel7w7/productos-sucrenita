import React from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ShieldCheck, MapPin, Wheat, CheckCircle2 } from 'lucide-react';

export function BrandStorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-pastel-peach/40 via-white to-pastel-amber/30 border border-pastel-sandDark shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Elaboración tradicional en el taller familiar de Productos Sucreñita"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sucrenita-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-pastel text-sucrenita-900 shadow-soft">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-pastel-peachText" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pastel-peachText">
                    Taller Familiar en Sucre, Chuquisaca
                  </span>
                </div>
                <p className="font-serif font-bold text-sm text-sucrenita-900">
                  Conservando las recetas y técnicas culinarias de antaño
                </p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white border border-pastel-sandDark shadow-soft-lg items-center gap-3 max-w-[220px]">
              <div className="w-10 h-10 rounded-xl bg-pastel-amber flex items-center justify-center text-pastel-amberText font-serif font-bold text-base shrink-0">
                <Wheat className="w-5 h-5" />
              </div>
              <div className="text-[11px] leading-snug">
                <strong className="block text-sucrenita-900 font-serif">100% Artesanal</strong>
                <span className="text-sucrenita-600">Sin aditivos ni colorantes</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-pastel-peachText border border-pastel-peachBorder shadow-soft">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Nuestra Historia &bull; Pasión por la Sazón Auténtica</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight leading-[1.2]">
              Del batán tradicional a la mesa de las familias bolivianas
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-sucrenita-700 leading-relaxed">
              <p>
                <strong>Productos Sucreñita</strong> nació del amor de una madre de familia por la cocina tradicional de Chuquisaca. Frustrada al ver cómo los mercados se llenaban de maní mezclado y ajíes rebajados con harina o colorantes artificiales, decidió comenzar a procesar sus propios granos de manera limpia y honesta.
              </p>
              <p>
                Cada grano de maní se selecciona minuciosamente a mano para descartar impurezas, y los ajíes se desvenan cuidadosamente antes de su molienda. Este proceso artesanal preserva los aceites aromáticos naturales, logrando que la sopa de maní de domingo y los picantes tradicionales tengan esa textura untuosa y sabor inconfundible que evoca los almuerzos de la abuela.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-sucrenita-800">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-pastel-sandDark/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Molienda fresca cada semana</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-pastel-sandDark/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Granos selectos de primera calidad</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-pastel-sandDark/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cobro seguro por Simple QR y PayPal</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-pastel-sandDark/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Envíos garantizados a todo el país</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

