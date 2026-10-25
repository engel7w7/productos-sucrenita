import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.stock > 0 && product.isActive;
  const isAbarrotes = product.category?.slug === 'abarrotes-condimentos';

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-pastel-sandDark/70 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-pastel-sand">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pastel-peachText font-serif text-sm">
            Productos Sucreñita
          </div>
        )}

        {product.category && (
          <span
            className={`absolute top-3.5 left-3.5 px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full backdrop-blur-md shadow-sm border ${
              isAbarrotes
                ? 'bg-pastel-amber/95 text-pastel-amberText border-pastel-amberBorder/60'
                : 'bg-pastel-peach/95 text-pastel-peachText border-pastel-peachBorder/60'
            }`}
          >
            {product.category.name}
          </span>
        )}

        <span
          className={`absolute top-3.5 right-3.5 px-2.5 py-1 text-[10px] font-medium rounded-full backdrop-blur-md border ${
            isAvailable
              ? 'bg-pastel-sage/95 text-pastel-sageText border-pastel-sageBorder/60'
              : 'bg-pastel-rose/95 text-pastel-roseText border-pastel-roseBorder/60'
          }`}
        >
          {isAvailable ? 'En almacén' : 'Agotado'}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="font-serif text-lg font-bold text-sucrenita-900 group-hover:text-pastel-peachText transition-colors line-clamp-1">
          <Link href={`/productos/${product.slug}`}>
            <span className="absolute inset-0 z-10" />
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-sucrenita-600 line-clamp-2 leading-relaxed flex-1">
          {product.description || 'Producto seleccionado con la calidad y frescura de Productos Sucreñita.'}
        </p>

        <div className="mt-5 pt-4 border-t border-pastel-sandDark/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-sucrenita-400">
              Precio unitario
            </span>
            <span className="text-xl font-bold font-serif text-sucrenita-700">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-pastel-peach/70 text-pastel-peachText group-hover:bg-pastel-peach transition-colors">
            <span>Ver detalle</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
}
