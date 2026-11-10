'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const isAvailable = product.stock > 0 && product.isActive;

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group relative flex flex-col bg-white dark:bg-cacao-850 rounded-3xl overflow-hidden border border-pastel-sandDark dark:border-cacao-700 shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:border-cacao-600 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-pastel-sand dark:bg-cacao-900">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={Boolean(product.imageUrl && (product.imageUrl.startsWith('data:') || product.imageUrl.startsWith('blob:')))}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sucrenita-600 dark:text-[#A8988C] font-serif text-sm">
            Productos Sucreñita
          </div>
        )}

        {product.category && (
          <span className="absolute top-3.5 left-3.5 px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-white/95 dark:bg-cacao-900/90 text-sucrenita-800 dark:text-[#EAE3D6] backdrop-blur-md shadow-sm border border-pastel-sandDark dark:border-cacao-700">
            {product.category.name}
          </span>
        )}

        <span
          className={`absolute top-3.5 right-3.5 px-2.5 py-1 text-[10px] font-medium rounded-full backdrop-blur-md border ${
            isAvailable
              ? 'bg-white/95 dark:bg-cacao-900/90 text-sucrenita-700 dark:text-[#CBBFB6] border-pastel-sandDark dark:border-cacao-700'
              : 'bg-pastel-peach dark:bg-[#341B18] text-pastel-peachText dark:text-[#D48065] border-pastel-peachBorder dark:border-[#522924]'
          }`}
        >
          {isAvailable ? 'En almacén' : 'Agotado'}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="font-serif text-lg font-bold text-sucrenita-900 dark:text-[#FAF6F0] group-hover:text-sucrenita-700 dark:group-hover:text-[#D4A853] transition-colors line-clamp-1">
          <Link href={`/productos/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-sucrenita-600 dark:text-[#A8988C] line-clamp-2 leading-relaxed flex-1">
          {product.description || 'Producto seleccionado con la calidad y frescura de Productos Sucreñita.'}
        </p>

        <div className="mt-5 pt-4 border-t border-pastel-sandDark dark:border-cacao-700 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-sucrenita-400 dark:text-[#8C7C72]">
              Precio unitario
            </span>
            <span className="text-xl font-bold font-serif text-sucrenita-800 dark:text-[#FAF6F0]">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Agregar ${product.name} a la lista`}
              className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                added
                  ? 'bg-sucrenita-800 dark:bg-[#7C5B28] text-white border-sucrenita-800 dark:border-[#7C5B28] shadow-soft scale-105'
                  : 'bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-[#FAF6F0] border border-pastel-sandDark dark:border-cacao-700 shadow-soft'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-pastel-sand" />
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </>
              )}
            </button>

            <Link
              href={`/productos/${product.slug}`}
              aria-label={`Ver detalle de ${product.name}`}
              className="p-2 rounded-full text-sucrenita-500 dark:text-[#A8988C] hover:text-sucrenita-900 dark:hover:text-white hover:bg-pastel-sand dark:hover:bg-cacao-800 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
