import Link from 'next/link';
import { QrCode, Phone, ShieldCheck, Truck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sucrenita-900 text-sucrenita-100 border-t border-sucrenita-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Historia y Propósito */}
          <div className="space-y-4 md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-amber-500">🌾</span> Productos Sucreñita
            </span>
            <p className="text-sm text-sucrenita-300 max-w-md leading-relaxed">
              Emprendimiento familiar boliviano comprometido con llevar a tu hogar los mejores abarrotes y condimentos tradicionales: maní crudo y molido para la auténtica sopa de maní, ají colorado y amarillo puro, y snacks crocantes artesanales preparados con esmero y sazón hogareña.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-sucrenita-400">
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-amber-400" />
                Cobros con QR Simple
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                Atención vía WhatsApp
              </span>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Nuestras Líneas
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-300">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-amber-400 transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=abarrotes-condimentos"
                  className="hover:text-amber-400 transition-colors"
                >
                  Maní, Ajíes & Condimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=snacks-artesanales"
                  className="hover:text-amber-400 transition-colors"
                >
                  Chicharrones, Habas & Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Confianza y Servicio */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Garantía y Entrega
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Granos e ingredientes limpios y seleccionados</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Entregas y envíos coordinados por chat</span>
              </li>
              <li className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pago inmediato sin comisiones con QR</span>
              </li>
              <li>Venta directa del productor al consumidor (B2C)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sucrenita-800 flex flex-col sm:flex-row items-center justify-between text-xs text-sucrenita-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Productos Sucreñita. Tienda virtual familiar.</p>
          <p>
            Tradición, calidad y frescura en cada entrega.
          </p>
        </div>
      </div>
    </footer>
  );
}
