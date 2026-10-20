import Link from 'next/link';
import { ShoppingBag, Sparkles, Store } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-sucrenita-200/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sucrenita-700 to-sucrenita-500 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-sucrenita-900 group-hover:text-sucrenita-600 transition-colors">
                Sucrenita
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-sucrenita-gold">
                Chocolates & Repostería Fina
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sucrenita-800">
            <Link
              href="/"
              className="hover:text-sucrenita-500 transition-colors py-1"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="hover:text-sucrenita-500 transition-colors py-1 flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-sucrenita-500" />
              Catálogo Completo
            </Link>
            <Link
              href="/catalogo?categoria=chocolates-tradicionales"
              className="hover:text-sucrenita-500 transition-colors py-1"
            >
              Chocolates
            </Link>
            <Link
              href="/catalogo?categoria=alfajores-galletas"
              className="hover:text-sucrenita-500 transition-colors py-1"
            >
              Alfajores
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-sucrenita-800 hover:bg-sucrenita-700 text-white shadow-sm hover:shadow transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-sucrenita-gold" />
              <span>Ver Pedidos</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
