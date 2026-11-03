import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración | Productos Sucreñita',
  description: 'Panel de control y gestión de catálogo para Productos Sucreñita.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-pastel-sand/30 dark:bg-cacao-950 text-sucrenita-900 dark:text-cacao-50 transition-colors">{children}</div>;
}

