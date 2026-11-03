'use client';

import { useState } from 'react';
import { Facebook, Instagram, Share2, Check, MessageCircle } from 'lucide-react';
import { TikTokIcon } from './SocialIcons';

interface ShareProductButtonsProps {
  productName: string;
  slug: string;
}

export function ShareProductButtons({ productName, slug }: ShareProductButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/productos/${slug}`;
    }
    return `https://productos-sucrenita.vercel.app/productos/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(false);
    }
  };

  const shareUrl = getShareUrl();
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Mira este producto de Productos Sucreñita: ${productName} - ${shareUrl}`
  )}`;

  return (
    <div className="p-4 rounded-3xl bg-pastel-sand/60 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-sucrenita-800 dark:text-cacao-100 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-sucrenita-700" />
          <span>Compartir en Redes Oficiales</span>
        </span>
        <span className="text-[11px] text-sucrenita-500 dark:text-cacao-300 font-medium">Difusión sin costo</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Facebook"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-pastel-sand dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
        >
          <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
          <span>Facebook</span>
        </a>

        <a
          href="https://www.instagram.com/productossucrenita"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver perfil de Instagram"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-pastel-sand dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
        >
          <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
          <span>Instagram</span>
        </a>

        <a
          href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver TikTok de Productos Sucreñita"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-pastel-sand dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
        >
          <TikTokIcon className="w-3.5 h-3.5 text-slate-800" />
          <span>TikTok</span>
        </a>

        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir por WhatsApp"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-pastel-sand dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#2B5E46]" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copiar enlace del producto"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-pastel-sand dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-700 dark:text-cacao-200 border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all ml-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#2B5E46]" />
              <span className="text-sucrenita-900 font-semibold">Enlace copiado</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-sucrenita-500" />
              <span>Copiar enlace</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
