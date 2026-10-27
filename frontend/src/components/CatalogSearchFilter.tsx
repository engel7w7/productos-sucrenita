'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Search, SlidersHorizontal, Store } from 'lucide-react';

interface CatalogSearchFilterProps {
  initialProducts: Product[];
  currentCategory?: string;
}

export function CatalogSearchFilter({
  initialProducts,
  currentCategory,
}: CatalogSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'Todos los Productos', slug: undefined },
    { name: 'Abarrotes & Maní para Sopa', slug: 'abarrotes-condimentos' },
    { name: 'Snacks Crujientes Caseros', slug: 'snacks-artesanales' },
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [initialProducts, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-pastel-sandDark shadow-soft">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-sucrenita-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar maní, ají, chicharrón, habas..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-pastel-sand/60 border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 text-sucrenita-900 placeholder:text-sucrenita-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-sucrenita-400 hover:text-sucrenita-800"
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-sucrenita-600 self-end sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-pastel-peachText" />
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de {initialProducts.length} productos
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          const href = cat.slug ? `/catalogo?categoria=${cat.slug}` : '/catalogo';

          return (
            <Link
              key={cat.name}
              href={href}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-sucrenita-600 text-white shadow-soft-lg scale-105'
                  : 'bg-white text-sucrenita-700 hover:bg-pastel-peach/60 hover:text-pastel-peachText border border-pastel-sandDark/80 shadow-soft'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-pastel-sandDark shadow-soft space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-pastel-amber mx-auto flex items-center justify-center text-pastel-amberText">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-sucrenita-800 font-bold">
              No encontramos coincidencias para &quot;{searchTerm}&quot;
            </h4>
            <p className="mt-1 text-xs text-sucrenita-500 max-w-sm mx-auto">
              Prueba buscando por palabras clave como &quot;maní&quot;, &quot;ají&quot;, &quot;sopa&quot; o &quot;chicharrón&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="inline-block px-6 py-2.5 rounded-full text-xs font-semibold bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}
