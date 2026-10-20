import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
    default: 'Sucrenita | Chocolates Finos y Repostería Típica de Sucre',
    template: '%s | Sucrenita',
  },
  description:
    'Catálogo en línea de chocolates artesanales, bombones rellenos y dulces típicos de la capital de Bolivia. Pedidos y entregas con la mayor frescura.',
  keywords: [
    'chocolates sucre',
    'chocolates bolivia',
    'bombones artesanales',
    'dulces típicos sucre',
    'alfajores de manjar',
    'sucrenita',
  ],
  authors: [{ name: 'Sucrenita Chocolatería' }],
  creator: 'Sucrenita',
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: siteUrl,
    title: 'Sucrenita | Chocolates Finos y Dulces Tradicionales',
    description:
      'Descubre la dulzura de la ciudad blanca con nuestras delicias artesanales preparadas con el más puro cacao boliviano.',
    siteName: 'Sucrenita',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Sucrenita Chocolates y Dulces Tradicionales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sucrenita | Chocolates Finos y Dulces Tradicionales',
    description: 'Artesanía chocolatera y dulces tradicionales de Sucre, Bolivia.',
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
