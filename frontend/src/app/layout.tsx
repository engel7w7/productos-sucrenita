import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sucrenita-web.onrender.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks Artesanales',
    template: '%s | Productos Sucreñita',
  },
  description:
    'Catálogo oficial de Productos Sucreñita. Abarrotes seleccionados (maní crudo y molido para sopa, ají colorado y amarillo, condimentos criollos) y snacks artesanales (chicharrones crocantes, habas fritas, maní garrapiñado). Pedidos por WhatsApp y cobro con QR.',
  keywords: [
    'productos sucreñita',
    'sopa de mani bolivia',
    'mani molido',
    'aji colorado molido',
    'aji amarillo bolivia',
    'habas fritas',
    'chicharron artesanal',
    'mani garrapinado',
    'abarrotes sucre',
    'snacks bolivianos',
  ],
  authors: [{ name: 'Productos Sucreñita' }],
  creator: 'Productos Sucreñita',
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: siteUrl,
    title: 'Productos Sucreñita | Abarrotes, Ajíes y Snacks Artesanales',
    description:
      'Llevamos la auténtica sazón y los mejores snacks caseros directo a tu mesa. Haz tu pedido fácil por WhatsApp con pago Simple QR.',
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
    description: 'Abarrotes seleccionados, ajíes chuquisaqueños y snacks crocantes con sabor tradicional.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-sucrenita-50 text-sucrenita-900 selection:bg-sucrenita-600 selection:text-white">
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
