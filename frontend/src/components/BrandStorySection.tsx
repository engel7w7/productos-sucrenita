'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ShieldCheck, Wheat, CheckCircle2, Flame, Award, MapPin } from 'lucide-react';

interface ProcessPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  icon: typeof Wheat;
  badge: string;
}

const PILLARS: ProcessPillar[] = [
  {
    id: 'seleccion',
    number: '01',
    title: 'Selección Manual Grano a Grano',
    subtitle: 'Valles de Padilla y Chuquisaca',
    description:
      'Revisamos a mano cada partida de maní y vainas de ají seco. Descartamos impurezas, granos rotos o secados defectuosos para garantizar un producto limpio y puro que no contenga harinas de relleno ni adulteraciones comerciales.',
    detail: 'Cero aditivos químicos y 100% grano clasificado para asegurar el espesor natural en tu olla.',
    icon: Wheat,
    badge: 'Materia Prima Noble',
  },
  {
    id: 'molienda',
    number: '02',
    title: 'Molienda en Batán de Piedra',
    subtitle: 'Fricción en frío tradicional',
    description:
      'La molienda en batán de piedra respeta la estructura del ají y del maní. Al moler despacio y sin someter la masa a cuchillas metálicas calientes, los aceites esenciales aromáticos se mantienen intactos, liberando ese perfume dulce y profundo.',
    detail: 'Color rubí vivo natural para tus mondongos, saices y picantes sin necesidad de colorantes.',
    icon: Flame,
    badge: 'Herencia de Batán',
  },
  {
    id: 'crocancia',
    number: '03',
    title: 'Pailas a Fuego Lento y Sal Marina',
    subtitle: 'Fritura artesanal controlada',
    description:
      'Nuestros chicharrones y habas fritas se elaboran en pailas tradicionales de fondo grueso a temperatura regulada. Usamos sal marina pura en la proporción justa para resaltar el sabor sin saturar de grasa.',
    detail: 'Crocancia liviana y fresca que no cansa el paladar, ideal para acompañar tus tardes.',
    icon: Sparkles,
    badge: 'Sabor Casero',
  },
  {
    id: 'envasado',
    number: '04',
    title: 'Envasado Fresco Cada Semana',
    subtitle: 'Directo del taller familiar a tu mesa',
    description:
      'No trabajamos con inventarios acumulados de meses. Molemos, tostamos y empaquetamos semanalmente bajo pedido directo. Cada bolsa llega sellada herméticamente para preservar su aroma y textura crujiente hasta el momento de cocinar.',
    detail: 'Despachos semanales garantizados en Sucre y envíos por flota a todo el territorio boliviano.',
    icon: Award,
    badge: 'Frescura Garantizada',
  },
];

export function BrandStorySection() {
  const [activePillarId, setActivePillarId] = useState<string>('seleccion');
  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];
  const IconComponent = activePillar.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-white dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-750 shadow-soft transition-colors space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg border border-pastel-sandDark dark:border-cacao-700 bg-pastel-sand dark:bg-cacao-850">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Elaboración artesanal en el taller familiar de Productos Sucreñita"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sucrenita-900/85 dark:bg-cacao-950/85 text-white backdrop-blur-md text-[11px] font-semibold border border-white/20">
                <MapPin className="w-3 h-3 text-[#D4A853]" />
                <span>San Roque, Sucre</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-pastel-sand/60 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-700">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sucrenita-800 dark:bg-cacao-750 text-pastel-sand dark:text-[#D4A853] flex items-center justify-center font-serif font-bold text-xs border border-sucrenita-700 dark:border-cacao-700">
                  PS
                </span>
                <div>
                  <span className="font-serif font-bold text-xs text-sucrenita-900 dark:text-cacao-50 block leading-tight">
                    Productos Sucreñita
                  </span>
                  <span className="text-[10px] text-sucrenita-600 dark:text-cacao-300">
                    Sucre, Capital Gastronómica de Bolivia
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-sucrenita-800 dark:text-[#D4A853] px-2.5 py-1 rounded-full bg-white dark:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 shadow-sm">
                100% Familiar
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber/80 dark:bg-cacao-850 text-sucrenita-800 dark:text-[#D4A853] border border-pastel-amberBorder dark:border-cacao-700 shadow-soft">
              <Heart className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D4A853]" />
              <span>Nuestra Historia &bull; Amor por la Sazón Auténtica</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50 tracking-tight leading-[1.2]">
              Del batán tradicional a la mesa de las familias bolivianas
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-sucrenita-700 dark:text-cacao-200 leading-relaxed font-normal">
              <p>
                <strong className="font-semibold text-sucrenita-900 dark:text-cacao-50">Productos Sucreñita</strong> nació del amor de una madre de familia chuquisaqueña por la gastronomía honesta de su tierra. Ante la proliferación de maní adulterado con harina y ajíes teñidos con químicos, decidimos abrir las puertas de nuestro taller para procesar granos seleccionados con transparencia y esmero.
              </p>
              <p>
                Trabajamos con agricultores de los valles de Padilla y Chuquisaca, moliendo semanalmente para que tu sopa de maní de domingo tenga la densidad untuosa exacta y tus picantes desprendan ese aroma inconfundible de antaño.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 text-center">
                <span className="block font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">100%</span>
                <span className="text-[10px] text-sucrenita-600 dark:text-cacao-300 font-medium">Puro sin mezclas</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 text-center">
                <span className="block font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">Batán</span>
                <span className="text-[10px] text-sucrenita-600 dark:text-cacao-300 font-medium">Molienda en frío</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 text-center">
                <span className="block font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">Semanal</span>
                <span className="text-[10px] text-sucrenita-600 dark:text-cacao-300 font-medium">Producción fresca</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 text-center">
                <span className="block font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">Bolivia</span>
                <span className="text-[10px] text-sucrenita-600 dark:text-cacao-300 font-medium">Envíos directos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-pastel-sandDark/80 dark:border-cacao-750 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#D4A853] block mb-1">
                Interactivo &bull; Conoce el Proceso Artesanal
              </span>
              <h3 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-cacao-50">
                Nuestros 4 Pilares de Calidad
              </h3>
            </div>
            <p className="text-xs text-sucrenita-600 dark:text-cacao-300 max-w-sm">
              Selecciona cada pilar para explorar la técnica culinaria que aplicamos en cada lote.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLARS.map((p) => {
              const isSelected = p.id === activePillarId;
              const IconP = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePillarId(p.id)}
                  className={`text-left p-4 rounded-2xl transition-all border ${
                    isSelected
                      ? 'bg-sucrenita-800 dark:bg-cacao-800 text-white border-sucrenita-900 dark:border-[#D4A853]/60 shadow-soft-lg scale-[1.02]'
                      : 'bg-pastel-sand/40 dark:bg-cacao-850 hover:bg-pastel-sand/80 dark:hover:bg-cacao-800 text-sucrenita-800 dark:text-cacao-200 border-pastel-sandDark/80 dark:border-cacao-750'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-white dark:bg-cacao-800 text-sucrenita-700 dark:text-cacao-200 border border-pastel-sandDark dark:border-cacao-700'
                      }`}
                    >
                      {p.number}
                    </span>
                    <IconP
                      className={`w-4 h-4 ${
                        isSelected ? 'text-[#D4A853]' : 'text-sucrenita-500 dark:text-cacao-400'
                      }`}
                    />
                  </div>
                  <h4
                    className={`font-serif font-bold text-xs leading-snug line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-sucrenita-900 dark:text-cacao-50'
                    }`}
                  >
                    {p.title}
                  </h4>
                  <p
                    className={`text-[10px] mt-1 line-clamp-1 ${
                      isSelected ? 'text-white/80' : 'text-sucrenita-600 dark:text-cacao-300'
                    }`}
                  >
                    {p.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-pastel-sand/35 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-sucrenita-800 dark:bg-cacao-800 text-[#D4A853] flex items-center justify-center font-bold text-xs border border-sucrenita-700 dark:border-cacao-700">
                  {activePillar.number}
                </span>
                <h4 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">
                  {activePillar.title}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-[#1F7A4C] dark:text-[#72C794] px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 self-start sm:self-auto">
                {activePillar.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-sucrenita-700 dark:text-cacao-200 leading-relaxed font-normal">
              {activePillar.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-sucrenita-900 dark:text-cacao-100">
              <CheckCircle2 className="w-4 h-4 text-[#1F7A4C] dark:text-[#72C794] shrink-0" />
              <span>{activePillar.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
