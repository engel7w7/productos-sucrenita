import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { JsonLd } from '@/components/JsonLd';
import { SocialChatHub } from '@/components/SocialChatHub';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productos-sucrenita.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks Artesanales',
    template: '%s | Productos Sucreñita',
  },
  description:
    'Catálogo oficial de Productos Sucreñita en Sucre, Bolivia. Abarrotes tradicionales seleccionados: maní crudo y molido para sopa de maní, ají colorado y amarillo puro, y snacks crocantes caseros. Pedidos directos con cobro seguro Simple QR y pasarela PayPal.',
  keywords: [
    'productos sucreñita',
    'sopa de mani bolivia',
    'mani molido para sopa',
    'aji colorado molido chuquisaca',
    'aji amarillo puro sucre',
    'habas fritas artesanales',
    'chicharron artesanal crocante',
    'mani garrapinado',
    'abarrotes sucre bolivia',
    'snacks tradicionales bolivianos',
    'condimentos bolivia',
    'tienda virtual sucre',
    'simple qr sucre',
    'paypal bolivia',
  ],
  authors: [{ name: 'Productos Sucreñita' }],
  creator: 'Productos Sucreñita',
  publisher: 'Productos Sucreñita',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: siteUrl,
    title: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks Artesanales',
    description:
      'Llevamos la auténtica sazón chuquisaqueña y los mejores snacks caseros directo a tu mesa. Haz tu pedido fácil por WhatsApp con pago Simple QR o PayPal.',
    siteName: 'Productos Sucreñita',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Productos Sucreñita - Abarrotes y Snacks Artesanales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks Artesanales',
    description:
      'Abarrotes seleccionados, ajíes chuquisaqueños y snacks crocantes con sabor tradicional, cobro por Simple QR y pasarela PayPal.',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'BO-H',
    'geo.placename': 'Sucre',
    'geo.position': '-19.0353;-65.2627',
    ICBM: '-19.0353, -65.2627',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Productos Sucreñita',
  description:
    'Emprendimiento familiar boliviano de abarrotes de cocina tradicional (maní, ajíes, condimentos) y snacks artesanales con venta directa B2C, cobros por Simple QR y pasarela PayPal.',
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=80',
  telephone: '+59171152182',
  priceRange: '$',
  currenciesAccepted: 'BOB, USD',
  paymentAccepted: 'Simple QR, PayPal, Tarjeta de Crédito, Efectivo, Transferencia Bancaria',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sucre',
    addressRegion: 'Chuquisaca',
    addressCountry: 'BO',
  },
  sameAs: [
    'https://www.facebook.com/ProductosSucrenita',
    'https://www.instagram.com/productossucrenita',
    'https://www.tiktok.com/@productossucrenita',
    'https://www.youtube.com/@ProductosSucrenita',
    'https://t.me/ProductosSucrenita',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-sucrenita-50 text-sucrenita-900 selection:bg-sucrenita-600 selection:text-white">
        <JsonLd data={organizationSchema} />
        <GoogleAnalytics />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SocialChatHub />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
