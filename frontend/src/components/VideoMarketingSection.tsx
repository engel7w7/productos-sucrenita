'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Play,
  Youtube,
  ExternalLink,
  Sparkles,
  Eye,
  Clock,
  CheckCircle2,
  X,
} from 'lucide-react';
import { TikTokIcon } from './SocialIcons';

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  youtubeId: string;
  description: string;
}

const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'yt-1',
    title: 'Receta Secreta: Auténtica Sopa de Maní Chuquisaqueña',
    duration: '8:45 min',
    views: '12.4K reproducciones',
    thumbnail:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    description:
      'Aprende a hervir el maní molido Sucreñita en su punto justo para evitar espuma y lograr la cremosidad y aroma exactos del plato bandera boliviano.',
  },
  {
    id: 'yt-2',
    title: 'Cómo sofreír el Ají Colorado en Batán sin que se queme',
    duration: '6:15 min',
    views: '8.9K reproducciones',
    thumbnail:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    description:
      'Técnica tradicional de las abuelas chuquisaqueñas para dorar el ají a fuego lento hasta extraer su color rubí vivo y fragancia para picantes y saice.',
  },
  {
    id: 'yt-3',
    title: 'Elaboración de Chicharrón Crocante y Habas Fritas de Altura',
    duration: '5:20 min',
    views: '15.1K reproducciones',
    thumbnail:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    description:
      'Te mostramos el proceso casero de fritura a temperatura controlada con sal marina pura para lograr una textura liviana y crocante sin exceso de grasa.',
  },
];

const TIKTOK_SHORTS = [
  {
    id: 'tt-1',
    title: '¿Por qué nuestro maní para sopa es el más pedido de Sucre?',
    tag: '#SopaDeMani #ComidaBoliviana',
    views: '24.8K vistas',
    url: 'https://www.tiktok.com/@productossucrenita',
  },
  {
    id: 'tt-2',
    title: 'Probando el nivel de picante del Ají Colorado Chuquisaqueño',
    tag: '#AjiBoliviano #Picante',
    views: '31.2K vistas',
    url: 'https://www.tiktok.com/@productossucrenita',
  },
  {
    id: 'tt-3',
    title: 'El sonido crocante del chicharrón recién tostado en paila',
    tag: '#SnackArtesanal #Crocante',
    views: '19.5K vistas',
    url: 'https://www.tiktok.com/@productossucrenita',
  },
];

export function VideoMarketingSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-white via-pastel-sand/40 to-pastel-cream/70 border border-pastel-sandDark shadow-soft space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark/70 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 shadow-soft mb-3">
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Canal de YouTube Oficial &bull; Recetas Tradicionales</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
              Aprende los secretos culinarios en video
            </h2>
            <p className="mt-2 text-sm text-sucrenita-600 max-w-2xl leading-relaxed">
              Mira cómo preparar los platos típicos de Sucre usando nuestros ingredientes. Videos explicativos paso a paso con los mejores trucos familiares.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@ProductosSucrenita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-soft transition-all shrink-0"
          >
            <Youtube className="w-4 h-4" />
            <span>Suscribirse al canal de YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {YOUTUBE_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group rounded-3xl bg-white border border-pastel-sandDark overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col"
            >
              <div
                className="relative aspect-video w-full cursor-pointer overflow-hidden bg-sucrenita-900"
                onClick={() => setActiveVideo(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-sucrenita-900/30 group-hover:bg-sucrenita-900/20 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-soft-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-sucrenita-900/80 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-pastel-peach" />
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-sucrenita-500 mb-1.5">
                    <Eye className="w-3.5 h-3.5 text-sucrenita-400" />
                    <span>{video.views}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-sucrenita-900 group-hover:text-red-700 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-sucrenita-600 line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 transition-colors pt-2 border-t border-pastel-sandDark/60"
                >
                  <Play className="w-3.5 h-3.5 fill-red-700" />
                  <span>Ver video receta completa</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sucrenita-900 via-slate-900 to-sucrenita-950 text-white shadow-soft-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-rose-300 border border-white/10">
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>Comunidad en TikTok Oficial @productossucrenita</span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Videos Cortos, Novedades y Degustaciones en TikTok
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Síguenos para ver el detrás de cámara en el tostado del maní, reseñas reales de clientes y promociones exclusivas.
              </p>
            </div>

            <a
              href="https://www.tiktok.com/@productossucrenita"
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
                  <div className="flex items-center justify-between text-[11px] text-rose-300 mb-2">
                    <span className="font-mono">{short.views}</span>
                    <Sparkles className="w-3.5 h-3.5 text-pastel-peach" />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-rose-200 transition-colors leading-relaxed">
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

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <div className="p-4 bg-sucrenita-900 text-white flex items-center justify-between">
              <span className="font-serif font-bold text-sm line-clamp-1">
                {activeVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Cerrar reproductor"
                className="p-1 rounded-full hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 bg-sucrenita-900 text-xs text-slate-300 flex items-center justify-between">
              <span>Canal Oficial de Productos Sucreñita</span>
              <a
                href={`https://wa.me/59170000000?text=${encodeURIComponent(
                  `Hola Productos Sucreñita, vi su video "${activeVideo.title}" y quisiera pedir los ingredientes necesarios.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-semibold text-[11px]"
              >
                <span>Pedir ingredientes de esta receta por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

