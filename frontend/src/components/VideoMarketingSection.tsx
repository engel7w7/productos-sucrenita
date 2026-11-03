'use client';

import React from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Sparkles,
  Eye,
  Clock,
  CheckCircle2,
  Share2,
  UtensilsCrossed,
} from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from './SocialIcons';

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  tag: string;
  description: string;
  tiktokUrl: string;
  productKeyword: string;
  whatsappMessage: string;
}

const TIKTOK_VIDEOS: VideoItem[] = [
  {
    id: 'tt-video-1',
    title: 'Cómo lograr la Sopa de Maní más cremosa y tradicional de Sucre',
    duration: '0:58 min',
    views: '24.8K vistas',
    thumbnail:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    tag: '#SopaDeMani #ComidaBoliviana #Sucre',
    description:
      'El secreto del hervor a fuego suave con maní molido Sucreñita para evitar la espuma y obtener la textura aterciopelada característica de Chuquisaca.',
    tiktokUrl: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
    productKeyword: 'Maní Molido para Sopa',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video de la receta de Sopa de Maní en TikTok y quisiera comprar maní molido para prepararla.',
  },
  {
    id: 'tt-video-2',
    title: 'Técnica en Batán: Cómo sofreír el Ají Colorado sin quemarlo',
    duration: '0:45 min',
    views: '31.2K vistas',
    thumbnail:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    tag: '#AjiChuquisaqueno #RecetasSucre #Batán',
    description:
      'Extracción lenta del color rubí vivo y aroma dulce para saice, picantes y mondongo tradicional chuquisaqueño sin acidez ni sabor amargo.',
    tiktokUrl: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
    productKeyword: 'Ají Colorado Molido',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video de la técnica de ají colorado en TikTok y quisiera pedir ají puro para mi cocina.',
  },
  {
    id: 'tt-video-3',
    title: 'El sonido del Chicharrón Crocante y Habas Fritas de Altura',
    duration: '0:38 min',
    views: '19.5K vistas',
    thumbnail:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tag: '#SnackArtesanal #Chicharron #Crocante',
    description:
      'Proceso casero de fritura a temperatura controlada con sal marina pura: crocancia liviana, sin exceso de grasa y listo para disfrutar en familia.',
    tiktokUrl: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
    productKeyword: 'Chicharrón y Habas Fritas',
    whatsappMessage:
      'Hola Productos Sucreñita, vi su video de snacks en TikTok y quisiera pedir chicharrón crocante y habas fritas artesanales.',
  },
];

const TIKTOK_SHORTS = [
  {
    id: 'tt-short-1',
    title: '¿Por qué nuestro maní para sopa es 100% puro sin harina de relleno?',
    tag: '#CalidadSucrenita #ComidaReal',
    views: '28.1K vistas',
    url: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
  },
  {
    id: 'tt-short-2',
    title: 'Diferencia entre Ají Colorado Picante y Ají Amarillo Dulce de Sucre',
    tag: '#SecretosCulinarios #AjiesBolivia',
    views: '34.6K vistas',
    url: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
  },
  {
    id: 'tt-short-3',
    title: 'Empacando pedidos familiares directos con entrega en Sucre',
    tag: '#EmprendimientoFamiliar #EnviosBolivia',
    views: '22.9K vistas',
    url: 'https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk',
  },
];

export function VideoMarketingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-white via-pastel-sand/40 to-pastel-cream/70 dark:from-cacao-900 dark:via-cacao-850 dark:to-cacao-900 border border-pastel-sandDark dark:border-cacao-800 shadow-soft space-y-12 transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark/70 dark:border-cacao-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 dark:bg-cacao-800 text-white dark:text-cacao-100 border border-transparent dark:border-cacao-700 shadow-soft mb-3">
              <TikTokIcon className="w-3.5 h-3.5 text-white" />
              <span>Canal Oficial de TikTok &bull; @sucrenita_artesanal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50 tracking-tight">
              Secretos culinarios y recetas en video
            </h2>
            <p className="mt-2 text-sm text-sucrenita-600 dark:text-cacao-200 max-w-2xl leading-relaxed">
              Descubre cómo preparar platos típicos de Chuquisaca usando nuestros ingredientes tradicionales. Videos cortos, recetas tradicionales y cápsulas paso a paso en nuestra cuenta oficial de TikTok.
            </p>
          </div>

          <a
            href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-cacao-800 hover:bg-black dark:hover:bg-cacao-700 text-white font-semibold text-xs shadow-soft transition-all shrink-0"
          >
            <TikTokIcon className="w-4 h-4 text-white" />
            <span>Seguir en TikTok @sucrenita_artesanal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIKTOK_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <a
                  href={video.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video w-full block overflow-hidden bg-sucrenita-900"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-sucrenita-900/30 group-hover:bg-sucrenita-900/10 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-900/90 text-white flex items-center justify-center shadow-soft-lg group-hover:scale-110 group-hover:bg-black transition-all">
                      <TikTokIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-sucrenita-900/80 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-pastel-peach" />
                    <span>{video.duration}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3 text-pastel-sand" />
                    <span>{video.views}</span>
                  </div>
                </a>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1 text-[11px] text-pastel-peachText dark:text-amber-300 font-medium">
                    <span>{video.tag}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 group-hover:text-sucrenita-700 dark:group-hover:text-cacao-200 transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-sucrenita-600 dark:text-cacao-300 line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <a
                  href={video.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-white" />
                  <span>Ver video en TikTok</span>
                  <ExternalLink className="w-3 h-3 text-slate-300" />
                </a>

                <a
                  href={`https://wa.me/59171152182?text=${encodeURIComponent(
                    video.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-pastel-sage hover:bg-pastel-sage/70 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/40 text-pastel-sageText dark:text-emerald-300 border border-pastel-sageBorder dark:border-emerald-800/60 text-[11px] font-semibold transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Pedir ingredientes de esta receta</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sucrenita-950 via-sucrenita-900 to-sucrenita-950 dark:from-cacao-950 dark:via-cacao-900 dark:to-cacao-950 border border-transparent dark:border-cacao-800 text-white shadow-soft-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-pastel-sand border border-white/10">
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>Comunidad en TikTok @sucrenita_artesanal</span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Videos Cortos, Novedades y Degustaciones
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Síguenos en TikTok para ver el proceso artesanal de selección, tostado de maní en paila, recetas bolivianas y novedades directas del taller familiar.
              </p>
            </div>

            <a
              href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-sucrenita-950 font-bold text-xs tracking-wide shadow-soft transition-all shrink-0"
            >
              <TikTokIcon className="w-4 h-4 text-slate-900" />
              <span>Seguir en TikTok</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TIKTOK_SHORTS.map((short) => (
              <a
                key={short.id}
                href={short.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-pastel-sand mb-2">
                    <span className="font-mono">{short.views}</span>
                    <Sparkles className="w-3.5 h-3.5 text-pastel-peach" />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-pastel-sand transition-colors leading-relaxed">
                    {short.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{short.tag}</span>
                  <ExternalLink className="w-3 h-3 group-hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
