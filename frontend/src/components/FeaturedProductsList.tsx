'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';

interface FeaturedProductsListProps {
  initialProducts: Product[];
}

export function FeaturedProductsList({
  initialProducts,
}: FeaturedProductsListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const stored = localStorage.getItem('sucrenita_custom_products');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const prioritizedSlugs = new Set([
              'aji-colorado-vaina-seleccionado-1kg',
              'mani-molido-tradicional-sopa-500g',
              'chicharron-artesanal-tira-13-unidades',
              'platanitos-chips-artesanales-26-unidades',
            ]);
            const customFeatured = parsed.filter((p: Product) =>
              prioritizedSlugs.has(p.slug)
            );
            if (customFeatured.length >= 4) {
              setProducts(customFeatured);
              return;
            } else if (parsed.length >= 4) {
              setProducts(parsed.slice(0, 4));
              return;
            }
          }
        }
      } catch {
      }
      setProducts(initialProducts);
    };

    syncFromStorage();
    window.addEventListener('sucrenita_products_updated', syncFromStorage);
    return () => {
      window.removeEventListener('sucrenita_products_updated', syncFromStorage);
    };
  }, [initialProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

