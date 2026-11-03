'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Store,
  UtensilsCrossed,
  Facebook,
  Instagram,
  ShieldCheck,
  Menu,
  X,
  Phone,
  Sparkles,
} from 'lucide-react';
import { TikTokIcon, WhatsAppIcon } from '@/components/SocialIcons';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 transition-all">
      <div className="bg-pastel-sand/80 dark:bg-cacao-900 border-b border-pastel-sandDark/80 dark:border-cacao-700 text-[11px] text-sucrenita-800 dark:text-[#D1C3B8] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sucrenita-600 shrink-0" />
            <span className="font-medium">
              Venta directa familiar en Sucre y envíos a toda Bolivia &bull; Cobro Simple QR y PayPal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sucrenita-500 dark:text-[#A8988C] hidden md:inline">Canales oficiales:</span>
            <a
              href="https://www.facebook.com/profile.php?id=61595923780807"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 dark:text-[#D1C3B8] hover:text-sucrenita-900 dark:hover:text-white transition-colors"
            >
              <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <span className="text-pastel-sandDark dark:text-cacao-700">&bull;</span>
            <a
              href="https://www.instagram.com/productossucrenita"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 dark:text-[#D1C3B8] hover:text-sucrenita-900 dark:hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <span className="text-pastel-sandDark dark:text-cacao-700">&bull;</span>
            <a
              href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 dark:text-[#D1C3B8] hover:text-sucrenita-900 dark:hover:text-white transition-colors"
            >
              <TikTokIcon className="w-3 h-3 text-slate-800 dark:text-white" />
              <span className="hidden sm:inline">TikTok</span>
            </a>
            <span className="text-pastel-sandDark dark:text-cacao-700">&bull;</span>
            <a
              href="https://wa.me/59171152182"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 dark:text-[#D1C3B8] hover:text-sucrenita-900 dark:hover:text-white transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#2B5E46]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="glass-pastel transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              aria-label="Productos Sucreñita - Inicio"
              className="flex items-center gap-3.5 group focus:outline-none"
            >
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-soft border border-pastel-sandDark dark:border-cacao-700 bg-sucrenita-800 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-profile.jpg"
                  alt="Logo oficial Productos Sucreñita"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-sucrenita-900 dark:text-[#FAF6F0] group-hover:text-sucrenita-700 dark:group-hover:text-[#D4A853] transition-colors leading-tight">
                  Productos Sucreñita
                </span>
                <span className="text-[11px] tracking-wide font-medium text-sucrenita-600 dark:text-[#CBBFB6] leading-snug">
                  Abarrotes &bull; Ajíes &bull; Snacks Artesanales
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-sucrenita-800 dark:text-[#D1C3B8]">
              <Link
                href="/"
                className={`px-4 py-2 rounded-full transition-all ${
                  pathname === '/'
                    ? 'bg-sucrenita-800 text-white dark:bg-cacao-800 dark:text-[#FAF6F0] shadow-soft font-semibold'
                    : 'hover:bg-pastel-sand/80 dark:hover:bg-cacao-800 hover:text-sucrenita-900 dark:hover:text-white'
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === '/catalogo'
                    ? 'bg-sucrenita-800 text-white dark:bg-cacao-800 dark:text-[#FAF6F0] shadow-soft font-semibold'
                    : 'hover:bg-pastel-sand/80 dark:hover:bg-cacao-800 hover:text-sucrenita-900 dark:hover:text-white'
                }`}
              >
                <Store className="w-4 h-4 text-sucrenita-600 dark:text-[#D4A853]" />
                <span>Catálogo</span>
              </Link>
              <Link
                href="/catalogo?categoria=abarrotes-condimentos"
                className="px-4 py-2 rounded-full hover:bg-pastel-sand/80 dark:hover:bg-cacao-800 hover:text-sucrenita-900 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-sucrenita-600 dark:text-[#D4A853]" />
                <span>Abarrotes & Ajíes</span>
              </Link>
              <Link
                href="/catalogo?categoria=snacks-artesanales"
                className="px-4 py-2 rounded-full hover:bg-pastel-sand/80 dark:hover:bg-cacao-800 hover:text-sucrenita-900 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-sucrenita-600 dark:text-[#D4A853]" />
                <span>Snacks Artesanales</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openCart}
                aria-label="Abrir bolsita de compras"
                className="relative p-2.5 rounded-full bg-white dark:bg-cacao-850 hover:bg-pastel-sand dark:hover:bg-cacao-800 text-sucrenita-800 dark:text-[#FAF6F0] border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-sucrenita-700 dark:text-[#FAF6F0]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full bg-sucrenita-700 text-white text-[11px] font-bold flex items-center justify-center px-1 shadow-soft animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <ThemeToggle />

              <div className="hidden sm:block">
                <WhatsAppButton
                  url="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20una%20consulta%20sobre%20sus%20productos"
                  source="navbar"
                  label="WhatsApp"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-white dark:bg-cacao-850 hover:bg-pastel-sand dark:hover:bg-cacao-800 text-sucrenita-800 dark:text-[#FAF6F0] border border-pastel-sandDark dark:border-cacao-700 shadow-soft transition-all"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Abrir menú de navegación"
                className="md:hidden p-2.5 rounded-2xl text-sucrenita-800 dark:text-[#FAF6F0] hover:bg-white dark:hover:bg-cacao-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-cacao-900/95 backdrop-blur-md border-b border-pastel-sandDark dark:border-cacao-700 p-5 animate-in slide-in-from-top-2 duration-200 shadow-soft-lg">
          <nav className="flex flex-col gap-2 text-sm font-medium text-sucrenita-900 dark:text-[#FAF6F0]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-2xl transition-colors ${
                pathname === '/'
                  ? 'bg-sucrenita-800 text-white dark:bg-cacao-800 dark:text-[#FAF6F0] font-semibold'
                  : 'hover:bg-pastel-sand dark:hover:bg-cacao-800'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-2xl transition-colors flex items-center justify-between ${
                pathname === '/catalogo'
                  ? 'bg-sucrenita-800 text-white dark:bg-cacao-800 dark:text-[#FAF6F0] font-semibold'
                  : 'hover:bg-pastel-sand dark:hover:bg-cacao-800'
              }`}
            >
              <span>Catálogo</span>
              <Store className="w-4 h-4 text-sucrenita-600" />
            </Link>
            <Link
              href="/catalogo?categoria=abarrotes-condimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-sand dark:hover:bg-cacao-800 transition-colors flex items-center justify-between"
            >
              <span>Abarrotes & Ajíes</span>
              <UtensilsCrossed className="w-4 h-4 text-sucrenita-600" />
            </Link>
            <Link
              href="/catalogo?categoria=snacks-artesanales"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-sand dark:hover:bg-cacao-800 transition-colors flex items-center justify-between"
            >
              <span>Snacks Artesanales</span>
              <Sparkles className="w-4 h-4 text-sucrenita-600" />
            </Link>
            <div className="pt-3 border-t border-pastel-sandDark dark:border-cacao-700 flex flex-col gap-2">
              <ThemeToggle showLabel className="w-full justify-start px-3 py-2.5" />
              <a
                href="https://wa.me/59171152182"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#1F7A4C] hover:bg-[#19653E] text-white font-semibold text-xs shadow-soft transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Atención directa por WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
