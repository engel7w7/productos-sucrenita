import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.stock > 0 && product.isActive;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-sucrenita-200/70 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagen del producto */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sucrenita-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-amber-700/60 font-serif text-sm">
            Productos Sucreñita
          </div>
        )}

        {/* Badge de Categoría */}
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-amber-900 rounded-full shadow-sm">
            {product.category.name}
          </span>
        )}

        {/* Badge de Disponibilidad */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-medium rounded-full backdrop-blur-md ${
            isAvailable
              ? 'bg-emerald-500/90 text-white'
              : 'bg-rose-500/90 text-white'
          }`}
        >
          {isAvailable ? 'En stock' : 'Agotado'}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg font-bold text-sucrenita-900 group-hover:text-amber-800 transition-colors line-clamp-1">
          <Link href={`/productos/${product.slug}`}>
            <span className="absolute inset-0 z-10" />
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-sucrenita-600 line-clamp-2 leading-relaxed flex-1">
          {product.description || 'Producto seleccionado con la calidad y frescura de Productos Sucreñita.'}
        </p>

        {/* Pie de tarjeta: Precio y Acción */}
        <div className="mt-5 pt-4 border-t border-sucrenita-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sucrenita-400">
              Precio
            </span>
            <span className="text-xl font-bold font-serif text-sucrenita-800">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sucrenita-600 group-hover:text-sucrenita-800 transition-colors">
            <span>Ver detalle</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
}
