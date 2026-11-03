'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Sparkles,
  Play,
  Copy,
  Check,
  Clock,
  UtensilsCrossed,
  ChefHat,
  Flame,
} from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from './SocialIcons';

const OFFICIAL_TIKTOK_VIDEO = {
  url: 'https://vt.tiktok.com/ZSpdgQt7R/',
  title: 'Secretos de Nuestra Sazón Chuquisaqueña en TikTok',
  account: '@sucrenita_artesanal',
  channelUrl: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
  description:
    'Conoce el proceso tradicional de selección de maní, molienda de ají en batán de piedra y el tostado artesanal que llevamos desde Sucre directo a tu hogar.',
  thumbnail:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  tag: '#ProductosSucreñita #ComidaBoliviana #SucreCapital',
};

const RECIPE_PILLARS = [
  {
    id: 'receta-mani',
    title: 'Auténtica Sopa de Maní Chuquisaqueña',
    category: 'Técnica de Hervor y Espesor',
    time: '60 min',
    tip: 'Disuelve el maní molido en agua tibia antes de añadirlo a la olla hirviendo. Remueve despacio los primeros 10 minutos para que libere su textura sedosa sin derramar espuma.',
    productKeyword: 'Maní Molido Tradicional',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video en TikTok y quisiera pedir maní molido para preparar la auténtica sopa de maní.',
    icon: ChefHat,
  },
  {
    id: 'receta-aji',
    title: 'Extracción de Color y Aroma en Batán',
    category: 'Molienda en Frío de Ají Colorado',
    time: '20 min de sofrito',
    tip: 'Sofríe el ají molido a fuego muy bajo con una pizca de comino. El color rubí brillante aparecerá cuando el aceite se separe naturalmente, garantizando cero acidez en tu saice o mondongo.',
    productKeyword: 'Ají Colorado Molido',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video en TikTok y quisiera comprar ají colorado puro para mi cocina.',
    icon: Flame,
  },
  {
    id: 'receta-snacks',
    title: 'Crocancia Artesanal de Chicharrón y Habas',
    category: 'Fritura en Paila Tradicional',
    time: 'Listo para disfrutar',
    tip: 'El secreto de una fritura que no hostiga está en la temperatura pareja y la sal marina pura. Snacks livianos, secos y crujientes para tus reuniones familiares.',
    productKeyword: 'Chicharrón y Habas Fritas',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video en TikTok y quisiera encargar chicharrón crocante y habas fritas con sal marina.',
    icon: UtensilsCrossed,
  },
];

export function VideoMarketingSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(OFFICIAL_TIKTOK_VIDEO.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-white dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-750 shadow-soft transition-colors space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark/80 dark:border-cacao-750 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber/80 dark:bg-cacao-850 text-sucrenita-800 dark:text-[#D4A853] border border-pastel-amberBorder dark:border-cacao-700 shadow-soft mb-3">
              <TikTokIcon className="w-3.5 h-3.5 text-sucrenita-900 dark:text-white" />
              <span>Contenido Oficial en TikTok &bull; {OFFICIAL_TIKTOK_VIDEO.account}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50 tracking-tight">
              Nuestra cocina y secretos en video
            </h2>
            <p className="mt-2 text-sm text-sucrenita-700 dark:text-cacao-200 max-w-2xl leading-relaxed">
              Acompáñanos en nuestro taller familiar en Sucre para conocer cómo seleccionamos los granos, molemos en batán y preparamos las recetas tradicionales de Chuquisaca.
            </p>
          </div>

          <a
            href={OFFICIAL_TIKTOK_VIDEO.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sucrenita-800 dark:bg-cacao-800 hover:bg-sucrenita-900 dark:hover:bg-cacao-750 text-white font-semibold text-xs shadow-soft transition-all shrink-0 border border-sucrenita-700 dark:border-cacao-700"
          >
            <TikTokIcon className="w-4 h-4 text-white" />
            <span>Seguir canal en TikTok</span>
            <ExternalLink className="w-3.5 h-3.5 text-pastel-sand dark:text-cacao-300" />
          </a>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-pastel-sand/35 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative">
              <a
                href={OFFICIAL_TIKTOK_VIDEO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[16/10] w-full block rounded-2xl overflow-hidden bg-sucrenita-950 border border-pastel-sandDark dark:border-cacao-700 shadow-soft-lg"
              >
                <Image
                  src={OFFICIAL_TIKTOK_VIDEO.thumbnail}
                  alt={OFFICIAL_TIKTOK_VIDEO.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-sucrenita-900/35 group-hover:bg-sucrenita-900/15 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-sucrenita-900/90 dark:bg-cacao-900/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-sucrenita-800 transition-all border border-white/20">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-sucrenita-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20">
                  <TikTokIcon className="w-3 h-3 text-white" />
                  <span>Video Oficial Disponible</span>
                </div>

                <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <span>Abrir en TikTok</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </a>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#D4A853] block">
                {OFFICIAL_TIKTOK_VIDEO.tag}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900 dark:text-cacao-50 leading-snug">
                {OFFICIAL_TIKTOK_VIDEO.title}
              </h3>

              <p className="text-xs sm:text-sm text-sucrenita-700 dark:text-cacao-200 leading-relaxed font-normal">
                {OFFICIAL_TIKTOK_VIDEO.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={OFFICIAL_TIKTOK_VIDEO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sucrenita-800 dark:bg-cacao-800 hover:bg-sucrenita-900 dark:hover:bg-cacao-750 text-white font-semibold text-xs shadow-soft transition-all border border-sucrenita-700 dark:border-cacao-700"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Reproducir en TikTok</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold shadow-soft transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1F7A4C] dark:text-[#72C794]" />
                      <span className="text-[#1F7A4C] dark:text-[#72C794]">Enlace copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sucrenita-600 dark:text-cacao-300" />
                      <span>Copiar enlace</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/59171152182?text=${encodeURIComponent(
                    'Hola Productos Sucreñita, vi su video en TikTok (https://vt.tiktok.com/ZSpdgQt7R/) y quisiera hacer un pedido de sus productos.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F7A4C] hover:bg-[#19653E] text-white text-xs font-semibold shadow-soft transition-all"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#D4A853] block mb-1">
              Guías de Preparación de la Casa
            </span>
            <h3 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-cacao-50">
              Aprende a cocinar con Doña Sucreñita
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECIPE_PILLARS.map((recipe) => {
              const IconR = recipe.icon;
              return (
                <div
                  key={recipe.id}
                  className="rounded-3xl bg-pastel-sand/35 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750 p-6 flex flex-col justify-between space-y-4 hover:border-pastel-sandDark dark:hover:border-cacao-700 transition-all shadow-soft"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#D4A853]">
                        {recipe.category}
                      </span>
                      <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-sucrenita-400 dark:text-cacao-400" />
                        {recipe.time}
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 text-sucrenita-800 dark:text-[#D4A853] flex items-center justify-center shrink-0 shadow-sm">
                        <IconR className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 leading-snug">
                        {recipe.title}
                      </h4>
                    </div>

                    <p className="text-xs text-sucrenita-700 dark:text-cacao-200 leading-relaxed font-normal">
                      {recipe.tip}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-pastel-sandDark/80 dark:border-cacao-750 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/59171152182?text=${encodeURIComponent(recipe.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1F7A4C] hover:bg-[#19653E] text-white text-xs font-semibold shadow-soft transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Pedir ingredientes</span>
                    </a>

                    <Link
                      href="/catalogo"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 text-[11px] font-semibold transition-colors"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5 text-sucrenita-600 dark:text-[#D4A853]" />
                      <span>Ver en el catálogo</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
