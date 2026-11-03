import Link from 'next/link';
import {
  QrCode,
  Phone,
  ShieldCheck,
  Truck,
  Wheat,
  Facebook,
  Instagram,
  CreditCard,
  Lock,
} from 'lucide-react';
import {
  TikTokIcon,
  PayPalIcon,
  WhatsAppIcon,
} from './SocialIcons';

export function Footer() {
  return (
    <footer className="bg-pastel-sand/80 text-sucrenita-800 border-t border-pastel-sandDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-tight text-sucrenita-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-sucrenita-800 flex items-center justify-center text-pastel-sand">
                <Wheat className="w-4 h-4" />
              </span>
              Productos Sucreñita
            </span>
            <p className="text-sm text-sucrenita-600 leading-relaxed">
              Emprendimiento familiar boliviano comprometido con llevar a tu hogar los mejores abarrotes y condimentos tradicionales: maní crudo y molido para la auténtica sopa de maní, ají colorado y amarillo puro, y snacks crocantes artesanales preparados con esmero y sazón hogareña.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-sucrenita-800 border border-pastel-sandDark font-medium shadow-soft">
                <QrCode className="w-3.5 h-3.5 text-sucrenita-700" />
                Simple QR Bancario
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-sucrenita-800 border border-pastel-sandDark font-medium shadow-soft">
                <PayPalIcon className="w-3.5 h-3.5 text-[#0070BA]" />
                PayPal Checkout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-sucrenita-800 border border-pastel-sandDark font-medium shadow-soft">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#2B5E46]" />
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
                href="https://www.facebook.com/profile.php?id=61595923780807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-pastel-sand/60 border border-pastel-sandDark transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span className="font-medium">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/productossucrenita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-pastel-sand/60 border border-pastel-sandDark transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                <span className="font-medium">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-pastel-sand/60 border border-pastel-sandDark transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-slate-800" />
                <span className="font-medium">TikTok</span>
              </a>

              <a
                href="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20consultar%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-pastel-sand/60 border border-pastel-sandDark transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#2B5E46]" />
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sucrenita-900 text-sm uppercase tracking-wider mb-4">
              Garantía y Métodos de Pago
            </h4>
            <ul className="space-y-2.5 text-xs text-sucrenita-600">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sucrenita-700 shrink-0" />
                <span>Granos e ingredientes 100% seleccionados</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sucrenita-700 shrink-0" />
                <span>Envíos en Sucre y flotas a toda Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-sucrenita-700 shrink-0" />
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
              href="https://www.facebook.com/profile.php?id=61595923780807"
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
              href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              TikTok
            </a>
            <span>&bull;</span>
            <a
              href="https://wa.me/59171152182"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sucrenita-800 transition-colors"
            >
              WhatsApp
            </a>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-sucrenita-400 hover:text-sucrenita-700 transition-colors"
              title="Acceso administrativo"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
