import Link from 'next/link';
import { QrCode, Phone, ShieldCheck, Truck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-pastel-sandDark/60 text-sucrenita-800 border-t border-pastel-sandDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Historia y Propósito */}
          <div className="space-y-4 md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-sucrenita-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-pastel-amber flex items-center justify-center text-base border border-pastel-amberBorder">🌾</span>
              Productos Sucreñita
            </span>
            <p className="text-sm text-sucrenita-600 max-w-md leading-relaxed">
              Emprendimiento familiar boliviano comprometido con llevar a tu hogar los mejores abarrotes y condimentos tradicionales: maní crudo y molido para la auténtica sopa de maní, ají colorado y amarillo puro, y snacks crocantes artesanales preparados con esmero y sazón hogareña.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-amber text-pastel-amberText border border-pastel-amberBorder font-medium">
                <QrCode className="w-3.5 h-3.5 text-pastel-amberText" />
                Cobros con QR Simple
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-sage text-pastel-sageText border border-pastel-sageBorder font-medium">
                <Phone className="w-3.5 h-3.5 text-pastel-sageText" />
                Atención vía WhatsApp
              </span>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-serif font-bold text-sucrenita-900 text-sm uppercase tracking-wider mb-4">
              Nuestras Líneas
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-600">
              <li>
                <Link href="/" className="hover:text-sucrenita-900 hover:underline transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-sucrenita-900 hover:underline transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=abarrotes-condimentos"
                  className="hover:text-sucrenita-900 hover:underline transition-colors"
                >
                  Maní, Ajíes & Condimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=snacks-artesanales"
                  className="hover:text-sucrenita-900 hover:underline transition-colors"
                >
                  Chicharrones, Habas & Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Confianza y Servicio */}
          <div>
            <h4 className="font-serif font-bold text-sucrenita-900 text-sm uppercase tracking-wider mb-4">
              Garantía y Entrega
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-600">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pastel-amberText shrink-0" />
                <span>Granos e ingredientes seleccionados</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-pastel-sageText shrink-0" />
                <span>Entregas coordinadas por chat</span>
              </li>
              <li className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-pastel-peachText shrink-0" />
                <span>Pago inmediato sin comisiones con QR</span>
              </li>
              <li className="text-sucrenita-500 italic">Venta directa familiar del productor a tu mesa</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-pastel-sandDark flex flex-col sm:flex-row items-center justify-between text-xs text-sucrenita-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Productos Sucreñita. Tienda virtual familiar.</p>
          <p>
            Tradición, calidad y frescura en cada entrega.
          </p>
        </div>
      </div>
    </footer>
  );
}
