import Link from 'next/link';
import {
  QrCode,
  Phone,
  ShieldCheck,
  Truck,
  Wheat,
  Facebook,
  Instagram,
  Youtube,
  CreditCard,
} from 'lucide-react';
import {
  TelegramIcon,
  TikTokIcon,
  MessengerIcon,
  PayPalIcon,
  WhatsAppIcon,
} from './SocialIcons';

export function Footer() {
  return (
    <footer className="bg-pastel-sandDark/60 text-sucrenita-800 border-t border-pastel-sandDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-tight text-sucrenita-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-pastel-amber flex items-center justify-center border border-pastel-amberBorder text-pastel-amberText">
                <Wheat className="w-4 h-4" />
              </span>
              Productos Sucreñita
            </span>
            <p className="text-sm text-sucrenita-600 leading-relaxed">
              Emprendimiento familiar boliviano comprometido con llevar a tu hogar los mejores abarrotes y condimentos tradicionales: maní crudo y molido para la auténtica sopa de maní, ají colorado y amarillo puro, y snacks crocantes artesanales preparados con esmero y sazón hogareña.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-amber text-pastel-amberText border border-pastel-amberBorder font-medium">
                <QrCode className="w-3.5 h-3.5 text-pastel-amberText" />
                Simple QR Bancario
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-medium">
                <PayPalIcon className="w-3.5 h-3.5 text-[#0070BA]" />
                PayPal Checkout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-sage text-pastel-sageText border border-pastel-sageBorder font-medium">
                <WhatsAppIcon className="w-3.5 h-3.5 text-pastel-sageText" />
                Atención vía WhatsApp
              </span>
            </div>
          </div>

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

          <div>
            <h4 className="font-serif font-bold text-sucrenita-900 text-sm uppercase tracking-wider mb-4">
              Canales Sociales Oficiales
            </h4>
            <p className="text-xs text-sucrenita-600 mb-3 leading-relaxed">
              Síguenos sin costo para conocer novedades, recetas tradicionales en video y lotes frescos:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-sucrenita-700">
              <a
                href="https://www.facebook.com/ProductosSucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span className="font-medium">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/productossucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                <span className="font-medium">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@productossucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-slate-900" />
                <span className="font-medium">TikTok</span>
              </a>

              <a
                href="https://www.youtube.com/@ProductosSucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-600" />
                <span className="font-medium">YouTube</span>
              </a>

              <a
                href="https://t.me/ProductosSucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
                <span className="font-medium">Telegram</span>
              </a>

              <a
                href="https://m.me/ProductosSucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-pastel-peach/30 border border-pastel-sandDark transition-colors"
              >
                <MessengerIcon className="w-3.5 h-3.5 text-[#0084FF]" />
                <span className="font-medium">Messenger</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sucrenita-900 text-sm uppercase tracking-wider mb-4">
              Garantía y Métodos de Pago
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-600">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pastel-amberText shrink-0" />
                <span>Granos e ingredientes 100% seleccionados</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-pastel-sageText shrink-0" />
                <span>Envíos en Sucre y flotas a toda Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-pastel-peachText shrink-0" />
                <span>Simple QR sin comisiones (Bancos de Bolivia)</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0070BA] shrink-0" />
                <span>PayPal internacional con tarjetas de débito/crédito</span>
              </li>
              <li className="text-sucrenita-500 italic pt-1">
                Taller familiar en Sucre &bull; Venta directa del productor
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-pastel-sandDark flex flex-col sm:flex-row items-center justify-between text-xs text-sucrenita-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Productos Sucreñita. Sucre, Bolivia. Tienda virtual familiar.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/ProductosSucrenita"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              Facebook
            </a>
            <span>&bull;</span>
            <a
              href="https://www.instagram.com/productossucrenita"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              Instagram
            </a>
            <span>&bull;</span>
            <a
              href="https://www.tiktok.com/@productossucrenita"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              TikTok
            </a>
            <span>&bull;</span>
            <a
              href="https://www.youtube.com/@ProductosSucrenita"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
