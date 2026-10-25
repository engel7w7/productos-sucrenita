import Link from 'next/link';
import { ShoppingBag, Store, UtensilsCrossed } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-sucrenita-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sucrenita-700 via-sucrenita-600 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-sucrenita-900 group-hover:text-sucrenita-600 transition-colors">
                Productos Sucreñita
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-700">
                Abarrotes &bull; Ajíes &bull; Snacks Artesanales
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-sucrenita-800">
            <Link
              href="/"
              className="hover:text-sucrenita-600 transition-colors py-1"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="hover:text-sucrenita-600 transition-colors py-1 flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-sucrenita-600" />
              Catálogo Completo
            </Link>
            <Link
              href="/catalogo?categoria=abarrotes-condimentos"
              className="hover:text-sucrenita-600 transition-colors py-1 flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-600" />
              Abarrotes & Ajíes
            </Link>
            <Link
              href="/catalogo?categoria=snacks-artesanales"
              className="hover:text-sucrenita-600 transition-colors py-1"
            >
              Snacks Artesanales
            </Link>
          </nav>

          {/* Action: Pedidos por WhatsApp */}
          <div className="flex items-center gap-3">
            <WhatsAppButton
              url="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20una%20consulta%20sobre%20sus%20productos"
              source="navbar"
              label="WhatsApp"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all"
            />

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-sucrenita-800 hover:bg-sucrenita-700 text-white shadow-sm hover:shadow transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Ver Catálogo</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
