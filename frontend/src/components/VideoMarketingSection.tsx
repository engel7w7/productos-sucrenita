'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Play,
  Copy,
  Check,
  Clock,
  UtensilsCrossed,
  ChefHat,
  Flame,
  Facebook,
  Instagram,
  Film,
} from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from './SocialIcons';

interface OfficialVideoItem {
  id: string;
  badge: string;
  shortLabel: string;
  title: string;
  description: string;
  thumbnail: string;
  tag: string;
  tiktokUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappText: string;
}

const CHANNEL_INFO = {
  account: '@sucrenita_artesanal',
  channelUrl: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
};

const OFFICIAL_VIDEOS: OfficialVideoItem[] = [
  {
    id: 'video-sopa-mani',
    badge: 'Nuevo Video Oficial',
    shortLabel: 'Sopa de Maní Tradicional',
    title: 'El domingo en Sucre tiene aroma a sopa de maní recién hecha',
    description:
      'Para lograr esa textura sedosa, cremosa y con el espesor perfecto, la base de maní debe ser pura y de primera calidad. En Productos Sucreñita te llevamos el maní seleccionado de los valles chuquisaqueños: en grano limpio o molido tradicional.',
    thumbnail:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    tag: '#SopaDeMani #ProductosSucreñita #ManiBoliviano #CocinaTradicional #SucreCapital #RecetasBolivianas #AlimentosArtesanales',
    tiktokUrl: 'https://vt.tiktok.com/ZSpn96Fa7/',
    facebookUrl: 'https://www.facebook.com/share/v/1UaeYfyUzu/',
    instagramUrl: 'https://www.instagram.com/reel/Df2oLqIzcb1/?mdxt=OWF1Nnp5cmhoYmpk',
    whatsappText:
      'Hola Productos Sucreñita, vi su nuevo video de la sopa de maní (https://vt.tiktok.com/ZSpn96Fa7/) y quisiera hacer un pedido familiar o por mayor de maní seleccionado.',
  },
  {
    id: 'video-sazon-chuquisaquena',
    badge: 'Proceso Artesanal en TikTok',
    shortLabel: 'Secretos de Nuestra Sazón',
    title: 'Secretos de Nuestra Sazón Chuquisaqueña en TikTok',
    description:
      'Conoce el proceso tradicional de selección de maní, molienda de ají en batán de piedra y el tostado artesanal que llevamos desde Alto Senac A s/n, Sucre directo a tu hogar.',
    thumbnail: '/banner-cover.jpg',
    tag: '#ProductosSucreñita #ComidaBoliviana #SucreCapital',
    tiktokUrl: 'https://vt.tiktok.com/ZSpdgQt7R/',
    whatsappText:
      'Hola Productos Sucreñita, vi su video en TikTok (https://vt.tiktok.com/ZSpdgQt7R/) y quisiera hacer un pedido de sus productos.',
  },
];

const RECIPE_PILLARS = [
  {
    id: 'receta-mani',
    title: 'Auténtica Sopa de Maní Chuquisaqueña',
    category: 'Técnica de Hervor y Espesor',
    time: '60 min',
    tip: 'Disuelve el maní molido en agua tibia antes de añadirlo a la olla hirviendo. Remueve despacio los primeros 10 minutos para que libere su textura sedosa sin derramar espuma.',
    productKeyword: 'Maní Molido Tradicional',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video de la sopa de maní y quisiera pedir maní molido para preparar la auténtica sopa de maní.',
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
      'Hola Productos Sucreñita, vi su video en redes y quisiera comprar ají colorado puro para mi cocina.',
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
      'Hola Productos Sucreñita, vi su video en redes y quisiera encargar chicharrón crocante y habas fritas con sal marina.',
    icon: UtensilsCrossed,
  },
];

export function VideoMarketingSection() {
  const [activeVideoId, setActiveVideoId] = useState<string>(OFFICIAL_VIDEOS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeVideo =
    OFFICIAL_VIDEOS.find((v) => v.id === activeVideoId) || OFFICIAL_VIDEOS[0];

  const handleCopyLink = async (url: string, id: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-white dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-750 shadow-soft transition-colors space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark/80 dark:border-cacao-750 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber/80 dark:bg-cacao-850 text-sucrenita-800 dark:text-[#D4A853] border border-pastel-amberBorder dark:border-cacao-700 shadow-soft mb-3">
              <TikTokIcon className="w-3.5 h-3.5 text-sucrenita-900 dark:text-white" />
              <span>Videos Oficiales &bull; TikTok, Facebook e Instagram</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50 tracking-tight">
              Nuestra cocina y secretos en video
            </h2>
            <p className="mt-2 text-sm text-sucrenita-700 dark:text-cacao-200 max-w-2xl leading-relaxed">
              Acompáñanos desde Alto Senac A s/n, Sucre para descubrir cómo seleccionamos el maní de los valles chuquisaqueños, molemos en batán y preparamos las recetas tradicionales de nuestra tierra.
            </p>
          </div>

          <a
            href={CHANNEL_INFO.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sucrenita-800 dark:bg-cacao-800 hover:bg-sucrenita-900 dark:hover:bg-cacao-750 text-white font-semibold text-xs shadow-soft transition-all shrink-0 border border-sucrenita-700 dark:border-cacao-700"
          >
            <TikTokIcon className="w-4 h-4 text-white" />
            <span>Seguir {CHANNEL_INFO.account}</span>
            <ExternalLink className="w-3.5 h-3.5 text-pastel-sand dark:text-cacao-300" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {OFFICIAL_VIDEOS.map((video, index) => {
            const isSelected = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoId(video.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-sucrenita-800 dark:bg-cacao-800 text-white border-sucrenita-700 dark:border-[#D4A853] shadow-soft'
                    : 'bg-pastel-sand/50 dark:bg-cacao-850 text-sucrenita-700 dark:text-cacao-200 border-pastel-sandDark dark:border-cacao-750 hover:bg-pastel-sand dark:hover:bg-cacao-800'
                }`}
              >
                <Film className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Video 0{index + 1}: {video.shortLabel}
                </span>
                {index === 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-sucrenita-800/10 dark:bg-[#D4A853]/20 text-sucrenita-800 dark:text-[#D4A853]'
                    }`}
                  >
                    Nuevo
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-pastel-sand/35 dark:bg-cacao-850 border border-pastel-sandDark/80 dark:border-cacao-750">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative">
              <a
                href={activeVideo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[16/10] w-full block rounded-2xl overflow-hidden bg-sucrenita-950 border border-pastel-sandDark dark:border-cacao-700 shadow-soft-lg"
              >
                <Image
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
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

                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-sucrenita-900/85 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20">
                  <TikTokIcon className="w-3 h-3 text-white" />
                  <span>{activeVideo.badge}</span>
                </div>

                <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <span>Abrir en TikTok</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </a>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-600 dark:text-[#D4A853] block leading-relaxed">
                {activeVideo.tag}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sucrenita-900 dark:text-cacao-50 leading-snug">
                {activeVideo.title}
              </h3>

              <p className="text-xs sm:text-sm text-sucrenita-700 dark:text-cacao-200 leading-relaxed font-normal">
                {activeVideo.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={activeVideo.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sucrenita-800 dark:bg-cacao-800 hover:bg-sucrenita-900 dark:hover:bg-cacao-750 text-white font-semibold text-xs shadow-soft transition-all border border-sucrenita-700 dark:border-cacao-700"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-white" />
                  <span>Ver en TikTok</span>
                </a>

                {activeVideo.facebookUrl && (
                  <a
                    href={activeVideo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#1465CE] text-white font-semibold text-xs shadow-soft transition-all"
                  >
                    <Facebook className="w-3.5 h-3.5 text-white" />
                    <span>Ver en Facebook</span>
                  </a>
                )}

                {activeVideo.instagramUrl && (
                  <a
                    href={activeVideo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E1306C] hover:bg-[#C1255A] text-white font-semibold text-xs shadow-soft transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-white" />
                    <span>Ver Reel en Instagram</span>
                  </a>
                )}
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/59171152182?text=${encodeURIComponent(
                    activeVideo.whatsappText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F7A4C] hover:bg-[#19653E] text-white text-xs font-semibold shadow-soft transition-all"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Pedir por WhatsApp (+591 71152182)</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyLink(activeVideo.tiktokUrl, activeVideo.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 text-xs font-semibold shadow-soft transition-all"
                >
                  {copiedId === activeVideo.id ? (
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
