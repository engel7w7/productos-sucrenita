'use client';

import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  Users,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Clock,
  Flame,
  CheckCircle2,
  ChefHat,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import { WhatsAppIcon } from './SocialIcons';

type DishType = 'sopa-mani' | 'picante-mondongo' | 'degustacion-snacks';

interface DishConfig {
  id: DishType;
  name: string;
  categoryBadge: string;
  icon: typeof UtensilsCrossed;
  description: string;
  basePeople: number;
  timeEstimate: string;
  secretTip: string;
  sucrenitaItems: {
    productSlug: string;
    gramsPerPerson: number;
    unitName: string;
  }[];
  kitchenPantry: {
    name: string;
    amountPerPerson: string;
  }[];
}

const DISHES: DishConfig[] = [
  {
    id: 'sopa-mani',
    name: 'Sopa de Maní Tradicional de Sucre',
    categoryBadge: 'Plato Bandera Chuquisaqueño',
    icon: UtensilsCrossed,
    description:
      'La reina de las sopas bolivianas: caldo sustancioso con maní puro molido a fuego lento, fideo tostado, costilla tierna y papas al hilo crocantes.',
    basePeople: 6,
    timeEstimate: '60 a 75 minutos',
    secretTip:
      'Vierte el maní molido disuelto en agua tibia cuando el caldo esté hirviendo suavemente. Remueve continuamente durante los primeros 10 minutos para que emulsione su grasa natural y no forme espuma excedente.',
    sucrenitaItems: [
      {
        productSlug: 'mani-molido-tradicional-sopa-500g',
        gramsPerPerson: 50,
        unitName: 'Maní Molido para Sopa',
      },
    ],
    kitchenPantry: [
      { name: 'Costilla de res o pollo de granja', amountPerPerson: '100g' },
      { name: 'Papas imillas medianas', amountPerPerson: '1 unidad' },
      { name: 'Fideo tostado macarrón', amountPerPerson: '35g' },
      { name: 'Zanahoria, arvejas y apio picado', amountPerPerson: 'Al gusto' },
      { name: 'Papas fritas al hilo y perejil picado para coronar', amountPerPerson: 'Al servir' },
    ],
  },
  {
    id: 'picante-mondongo',
    name: 'Picante Mixto y Mondongo Chuquisaqueño',
    categoryBadge: 'Tradición de Fiesta y Domingo',
    icon: Flame,
    description:
      'Guiso profundo y fragante elaborado con ají colorado desvenado y molido en batán, acompañado de carne tierna, mote de maíz pelado y papas doradas.',
    basePeople: 6,
    timeEstimate: '90 minutos',
    secretTip:
      'Sofríe el ají colorado molido en manteca a fuego mínimo durante 20 minutos hasta que el aceite tome color rubí brillante y pierda cualquier acidez cruda.',
    sucrenitaItems: [
      {
        productSlug: 'aji-colorado-molido-picante-250g',
        gramsPerPerson: 25,
        unitName: 'Ají Colorado Molido con Picante',
      },
      {
        productSlug: 'aji-amarillo-molido-sin-picante-250g',
        gramsPerPerson: 15,
        unitName: 'Ají Amarillo Dulce para el fondo',
      },
    ],
    kitchenPantry: [
      { name: 'Carne de res seleccionada o cerdo', amountPerPerson: '150g' },
      { name: 'Mote de maíz blanco cocido', amountPerPerson: '100g' },
      { name: 'Papas medianas cocidas y doradas', amountPerPerson: '1 unidad' },
      { name: 'Cebolla picada finamente y comino en grano', amountPerPerson: 'Para el ahogado' },
    ],
  },
  {
    id: 'degustacion-snacks',
    name: 'Tarde de Té y Compartir Criollo',
    categoryBadge: 'Mesa Familiar y Degustación',
    icon: Sparkles,
    description:
      'El picoteo tradicional chuquisaqueño para reuniones familiares: chicharrón crocante liviano, maní tostado garrapiñado con vainilla y habas fritas saladas.',
    basePeople: 6,
    timeEstimate: 'Listo para servir',
    secretTip:
      'Sirve los snacks en pocillos de greda o totora tradicionales. El chicharrón y las habas maridan a la perfección con bebidas frías o un té caliente de cedrón.',
    sucrenitaItems: [
      {
        productSlug: 'chicharron-artesanal-crocante-200g',
        gramsPerPerson: 35,
        unitName: 'Chicharrón Artesanal Crocante',
      },
      {
        productSlug: 'mani-dulce-garrapinado-250g',
        gramsPerPerson: 30,
        unitName: 'Maní Garrapiñado Dulce',
      },
      {
        productSlug: 'habas-fritas-crocantes-sal-marina-250g',
        gramsPerPerson: 30,
        unitName: 'Habas Fritas con Sal Marina',
      },
    ],
    kitchenPantry: [
      { name: 'Pocillos rústicos para servir', amountPerPerson: '1 juego' },
      { name: 'Té caliente de hierbas o refresco de mocochinchi', amountPerPerson: 'Acompañamiento' },
    ],
  },
];

export function CulinaryCalculatorSection() {
  const [selectedDishId, setSelectedDishId] = useState<DishType>('sopa-mani');
  const [diners, setDiners] = useState<number>(6);
  const [addedToast, setAddedToast] = useState(false);
  const { addToCart, openCart } = useCart();

  const currentDish = useMemo(() => {
    return DISHES.find((d) => d.id === selectedDishId) || DISHES[0];
  }, [selectedDishId]);

  const calculatedSucrenitaProducts = useMemo(() => {
    return currentDish.sucrenitaItems.map((item) => {
      const totalGramsNeeded = item.gramsPerPerson * diners;
      const product = FALLBACK_PRODUCTS.find((p) => p.slug === item.productSlug);

      let packagesNeeded = 1;
      if (item.productSlug.includes('500g')) {
        packagesNeeded = Math.max(1, Math.ceil(totalGramsNeeded / 500));
      } else if (item.productSlug.includes('250g')) {
        packagesNeeded = Math.max(1, Math.ceil(totalGramsNeeded / 250));
      } else if (item.productSlug.includes('200g')) {
        packagesNeeded = Math.max(1, Math.ceil(totalGramsNeeded / 200));
      } else if (item.productSlug.includes('1kg')) {
        packagesNeeded = Math.max(1, Math.ceil(totalGramsNeeded / 1000));
      }

      return {
        ...item,
        totalGramsNeeded,
        packagesNeeded,
        product,
      };
    });
  }, [currentDish, diners]);

  const handleAddAllToCart = () => {
    calculatedSucrenitaProducts.forEach((item) => {
      if (item.product) {
        addToCart(item.product, item.packagesNeeded);
      }
    });
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      openCart();
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Productos Sucreñita, calculé los ingredientes en su web para preparar "${currentDish.name}" para ${diners} personas.\n\n` +
      `Quisiera encargar los siguientes productos:\n` +
      calculatedSucrenitaProducts
        .map(
          (item) =>
            `- ${item.packagesNeeded} paquete(s) de ${item.product?.name || item.unitName} (~${item.totalGramsNeeded}g requeridos)`
        )
        .join('\n') +
      `\n\n¿Tienen disponibilidad para envío en Sucre / despacho nacional?`
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-white via-pastel-sand/50 to-pastel-amber/30 border border-pastel-sandDark shadow-soft space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber text-pastel-amberText border border-pastel-amberBorder shadow-soft mb-3">
              <ChefHat className="w-4 h-4 text-pastel-amberText" />
              <span>Calculadora Culinaria Doña Sucreñita</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
              Calcula tus ingredientes para el almuerzo
            </h2>
            <p className="mt-2 text-sm text-sucrenita-600 max-w-2xl leading-relaxed">
              Elige el plato que vas a cocinar, selecciona el número de personas en tu mesa y calcularemos la cantidad exacta de maní, ají o snacks que necesitas para lograr el sabor perfecto sin desperdiciar nada.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {DISHES.map((dish) => {
              const isSelected = selectedDishId === dish.id;
              const IconComp = dish.icon;
              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => setSelectedDishId(dish.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all shadow-soft ${
                    isSelected
                      ? 'bg-sucrenita-800 text-white shadow-soft-lg scale-105'
                      : 'bg-white text-sucrenita-700 hover:bg-pastel-peach/50 border border-pastel-sandDark'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{dish.name.split(' ')[0]} {dish.name.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-pastel-peachText">
                  {currentDish.categoryBadge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-sucrenita-900 mt-1">
                  {currentDish.name}
                </h3>
                <p className="mt-2 text-xs text-sucrenita-600 leading-relaxed">
                  {currentDish.description}
                </p>
              </div>

              <div className="pt-4 border-t border-pastel-sandDark space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pastel-amberText" />
                    <span className="text-xs font-bold text-sucrenita-800">
                      Número de comensales:
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-sucrenita-900">
                    {diners} personas
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDiners((prev) => Math.max(2, prev - 2))}
                    disabled={diners <= 2}
                    aria-label="Disminuir porciones"
                    className="w-10 h-10 rounded-2xl bg-pastel-sand hover:bg-pastel-amber border border-pastel-sandDark flex items-center justify-center text-sucrenita-800 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="2"
                    value={diners}
                    onChange={(e) => setDiners(parseInt(e.target.value, 10))}
                    className="flex-1 accent-sucrenita-700 h-2 bg-pastel-sand rounded-lg cursor-pointer"
                  />

                  <button
                    type="button"
                    onClick={() => setDiners((prev) => Math.min(24, prev + 2))}
                    disabled={diners >= 24}
                    aria-label="Aumentar porciones"
                    className="w-10 h-10 rounded-2xl bg-pastel-sand hover:bg-pastel-amber border border-pastel-sandDark flex items-center justify-center text-sucrenita-800 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-sucrenita-500 pt-1">
                  <span>Mínimo: 2 personas</span>
                  <span className="flex items-center gap-1 font-medium text-sucrenita-700">
                    <Clock className="w-3 h-3 text-pastel-amberText" />
                    Tiempo: {currentDish.timeEstimate}
                  </span>
                  <span>Hasta: 24 personas</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-pastel-amber/40 border border-pastel-amberBorder/60 space-y-1.5">
                <span className="text-[11px] uppercase font-bold text-pastel-amberText flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  El consejo de Doña Sucreñita:
                </span>
                <p className="text-xs text-sucrenita-800 leading-relaxed italic">
                  &ldquo;{currentDish.secretTip}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-pastel-sandDark shadow-soft space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Ingredientes Sucreñita requeridos
                </span>
                <h4 className="font-serif text-xl font-bold text-sucrenita-900">
                  Para tu mesa de {diners} comensales:
                </h4>
              </div>

              <div className="space-y-3">
                {calculatedSucrenitaProducts.map((item) => (
                  <div
                    key={item.productSlug}
                    className="p-4 rounded-2xl bg-pastel-sand/40 border border-pastel-sandDark flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="font-serif font-bold text-sm text-sucrenita-900 block">
                        {item.product?.name || item.unitName}
                      </span>
                      <span className="text-xs text-sucrenita-600 block">
                        Se necesitan <strong>{item.totalGramsNeeded}g</strong> para {diners} porciones generosas.
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-white border border-pastel-sandDark text-xs font-bold text-sucrenita-800 text-center shadow-soft">
                        {item.packagesNeeded} paquete(s) sugerido(s)
                      </div>
                      {item.product && (
                        <span className="font-serif font-bold text-xs text-emerald-800">
                          Bs {(
                            (typeof item.product.price === 'string'
                              ? parseFloat(item.product.price)
                              : item.product.price) * item.packagesNeeded
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-pastel-sandDark space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sucrenita-400 block">
                  Ingredientes complementarios de tu cocina:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sucrenita-700">
                  {currentDish.kitchenPantry.map((pantry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-pastel-cream/40"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        <strong>{pantry.name}:</strong> {pantry.amountPerPerson}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-pastel-sandDark flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-sucrenita-700 hover:bg-sucrenita-800 text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedToast
                      ? 'Agregado a la bolsita...'
                      : 'Agregar ingredientes a mi bolsita'}
                  </span>
                </button>

                <a
                  href={`https://wa.me/59171152182?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-soft transition-all shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Pedir combo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

