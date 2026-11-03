'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  Store,
  ArrowUpDown,
  Tag,
} from 'lucide-react';

interface CatalogSearchFilterProps {
  initialProducts: Product[];
  currentCategory?: string;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const QUICK_TAGS = [
  { label: 'Sopa de Maní', term: 'sopa' },
  { label: 'Ají Colorado', term: 'colorado' },
  { label: 'Ají Dulce / Sin Picante', term: 'dulce' },
  { label: 'Chicharrón', term: 'chicharron' },
  { label: 'Habas Saladas', term: 'habas' },
  { label: 'Garrapiñado', term: 'garrapinado' },
];

export function CatalogSearchFilter({
  initialProducts,
  currentCategory,
}: CatalogSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories = [
    { name: 'Todos los Productos', slug: undefined },
    { name: 'Abarrotes & Maní para Sopa', slug: 'abarrotes-condimentos' },
    { name: 'Snacks Crujientes Caseros', slug: 'snacks-artesanales' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = initialProducts.filter((product) => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      const matchName = product.name.toLowerCase().includes(term);
      const matchDesc = product.description
        ? product.description.toLowerCase().includes(term)
        : false;
      return matchName || matchDesc;
    });

    const sorted = [...filtered].sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
      const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return sorted;
  }, [initialProducts, searchTerm, sortBy]);

  return (
    <div className="space-y-8">
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-sucrenita-400 dark:text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar maní, ají, chicharrón, habas..."
              className="w-full pl-10 pr-16 py-2.5 rounded-full text-xs sm:text-sm bg-pastel-sand/60 dark:bg-cacao-900 border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-pastel-peachText/40 dark:focus:ring-[#D48065]/40 text-sucrenita-900 dark:text-[#FAF6F0] placeholder:text-sucrenita-400 dark:placeholder:text-[#8C7C72]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-sucrenita-500 dark:text-[#A8988C] hover:text-sucrenita-800 dark:hover:text-white font-medium"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 text-xs text-sucrenita-700 dark:text-[#D1C3B8] bg-pastel-sand/50 dark:bg-cacao-800 px-3.5 py-2 rounded-2xl border border-pastel-sandDark dark:border-cacao-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-pastel-peachText dark:text-[#D48065]" />
              <label htmlFor="catalog-sort" className="text-sucrenita-500 dark:text-[#8C7C72]">
                Ordenar:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent font-semibold text-sucrenita-900 dark:text-[#FAF6F0] focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="dark:bg-cacao-900">Recomendados</option>
                <option value="price-asc" className="dark:bg-cacao-900">Precio: menor a mayor</option>
                <option value="price-desc" className="dark:bg-cacao-900">Precio: mayor a menor</option>
                <option value="name-asc" className="dark:bg-cacao-900">Nombre A-Z</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-sucrenita-600 dark:text-[#D1C3B8] bg-pastel-amber/40 dark:bg-cacao-800 px-3 py-2 rounded-2xl border border-pastel-amberBorder dark:border-cacao-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-pastel-amberText dark:text-[#D4A853]" />
              <span>
                <strong>{filteredAndSortedProducts.length}</strong> de {initialProducts.length} productos
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-pastel-sandDark/70 dark:border-cacao-700 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-400 dark:text-[#8C7C72] flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3" />
            Filtros rápidos:
          </span>
          {QUICK_TAGS.map((tag) => {
            const isTagActive = searchTerm.toLowerCase() === tag.term;
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() =>
                  setSearchTerm(isTagActive ? '' : tag.term)
                }
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                  isTagActive
                    ? 'bg-sucrenita-800 dark:bg-[#7C5B28] text-white border-sucrenita-900 dark:border-[#7C5B28]'
                    : 'bg-pastel-sand/50 dark:bg-cacao-800 hover:bg-pastel-amber/40 dark:hover:bg-cacao-750 text-sucrenita-700 dark:text-[#D1C3B8] border-pastel-sandDark dark:border-cacao-700'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
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
                  ? 'bg-sucrenita-700 dark:bg-[#7C5B28] text-white shadow-soft-lg scale-105'
                  : 'bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-[#D1C3B8] hover:bg-pastel-peach/60 dark:hover:bg-cacao-800 hover:text-pastel-peachText dark:hover:text-[#FAF6F0] border border-pastel-sandDark/80 dark:border-cacao-700 shadow-soft'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-cacao-850 rounded-3xl border border-dashed border-pastel-sandDark dark:border-cacao-700 shadow-soft space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-pastel-amber dark:bg-cacao-800 mx-auto flex items-center justify-center text-pastel-amberText dark:text-[#D4A853]">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-sucrenita-800 dark:text-[#FAF6F0] font-bold">
              No encontramos coincidencias para &quot;{searchTerm}&quot;
            </h4>
            <p className="mt-1 text-xs text-sucrenita-500 dark:text-[#A8988C] max-w-sm mx-auto">
              Prueba buscando por palabras clave como &quot;maní&quot;, &quot;ají&quot;, &quot;sopa&quot; o &quot;chicharrón&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="inline-block px-6 py-2.5 rounded-full text-xs font-semibold bg-sucrenita-700 dark:bg-cacao-800 hover:bg-sucrenita-800 dark:hover:bg-cacao-750 text-white shadow-soft"
          >
            Ver todos los productos disponibles
          </button>
        </div>
      )}
    </div>
  );
}
