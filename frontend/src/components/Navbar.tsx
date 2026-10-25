import Link from 'next/link';
import { ShoppingBag, Store, UtensilsCrossed } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-pastel transition-all">
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

          <div className="flex items-center gap-3">
            <WhatsAppButton
              url="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20una%20consulta%20sobre%20sus%20productos"
              source="navbar"
              label="WhatsApp"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-pastel-sage hover:bg-emerald-100/70 text-pastel-sageText border border-pastel-sageBorder shadow-soft transition-all"
            />

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft hover:shadow-soft-lg transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
              <span>Ver Catálogo</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
