'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Store, UtensilsCrossed, Facebook, Instagram, ShieldCheck, Menu, X, Phone } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 transition-all">
      <div className="bg-pastel-amber/60 border-b border-pastel-amberBorder/70 text-[11px] text-sucrenita-800 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-pastel-amberText shrink-0" />
            <span className="font-medium">
              Venta directa familiar en Sucre y envíos a toda Bolivia &bull; Cobro seguro con Simple QR
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sucrenita-500 hidden md:inline">Redes oficiales:</span>
            <a
              href="https://www.facebook.com/ProductosSucrenita"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 hover:text-[#1877F2] transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <span className="text-pastel-sandDark">•</span>
            <a
              href="https://www.instagram.com/productossucrenita"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Productos Sucreñita"
              className="inline-flex items-center gap-1 text-sucrenita-700 hover:text-[#E4405F] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="glass-pastel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pastel-peachText to-amber-500/80 flex items-center justify-center text-white font-serif font-bold text-xl shadow-soft group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-sucrenita-900 group-hover:text-pastel-peachText transition-colors">
                  Productos Sucreñita
                </span>
                <span className="text-[11px] tracking-wide font-medium text-sucrenita-600">
                  Abarrotes &bull; Ajíes &bull; Snacks Artesanales
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-sucrenita-800">
              <Link
                href="/"
                className="px-4 py-2 rounded-full hover:bg-pastel-peach/60 hover:text-pastel-peachText transition-all"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="px-4 py-2 rounded-full hover:bg-pastel-peach/60 hover:text-pastel-peachText transition-all flex items-center gap-1.5"
              >
                <Store className="w-4 h-4 text-pastel-peachText" />
                <span>Catálogo Completo</span>
              </Link>
              <Link
                href="/catalogo?categoria=abarrotes-condimentos"
                className="px-4 py-2 rounded-full hover:bg-pastel-amber/80 hover:text-pastel-amberText transition-all flex items-center gap-1.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-pastel-amberText" />
                <span>Abarrotes & Ajíes</span>
              </Link>
              <Link
                href="/catalogo?categoria=snacks-artesanales"
                className="px-4 py-2 rounded-full hover:bg-pastel-peach/60 hover:text-pastel-peachText transition-all"
              >
                Snacks Artesanales
              </Link>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={openCart}
                aria-label="Abrir bolsita de compras"
                className="relative p-2.5 rounded-full bg-white hover:bg-pastel-amber/40 text-sucrenita-800 border border-pastel-sandDark shadow-soft transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full bg-pastel-peachText text-white text-[11px] font-bold flex items-center justify-center px-1 shadow-soft animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="hidden sm:block">
                <WhatsAppButton
                  url="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20una%20consulta%20sobre%20sus%20productos"
                  source="navbar"
                  label="WhatsApp"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-pastel-sage hover:bg-emerald-100/70 text-pastel-sageText border border-pastel-sageBorder shadow-soft transition-all"
                />
              </div>

              <Link
                href="/catalogo"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft hover:shadow-soft-lg transition-all"
              >
                <Store className="w-3.5 h-3.5 text-amber-200" />
                <span>Catálogo</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Abrir menú de navegación"
                className="md:hidden p-2.5 rounded-2xl text-sucrenita-800 hover:bg-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-pastel-sandDark p-5 animate-in slide-in-from-top-2 duration-200 shadow-soft-lg">
          <nav className="flex flex-col gap-2.5 text-sm font-medium text-sucrenita-900">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-sand transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-sand transition-colors flex items-center justify-between"
            >
              <span>Catálogo Completo</span>
              <Store className="w-4 h-4 text-pastel-peachText" />
            </Link>
            <Link
              href="/catalogo?categoria=abarrotes-condimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-amber/40 transition-colors flex items-center justify-between text-pastel-amberText font-semibold"
            >
              <span>Abarrotes & Maní para Sopa</span>
              <UtensilsCrossed className="w-4 h-4" />
            </Link>
            <Link
              href="/catalogo?categoria=snacks-artesanales"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl hover:bg-pastel-peach/40 transition-colors flex items-center justify-between text-pastel-peachText font-semibold"
            >
              <span>Snacks Crujientes Caseros</span>
              <Store className="w-4 h-4" />
            </Link>
            <div className="pt-3 border-t border-pastel-sandDark flex flex-col gap-2">
              <a
                href="https://wa.me/59170000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-soft"
              >
                <Phone className="w-4 h-4" />
                <span>Atención directa por WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
