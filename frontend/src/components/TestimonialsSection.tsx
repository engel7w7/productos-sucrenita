'use client';

import React, { useState, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Quote,
  CheckCircle2,
} from 'lucide-react';

type TestimonialCategory = 'all' | 'mani' | 'aji' | 'snacks' | 'envios';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  category: TestimonialCategory;
  productPurchased: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
  initialLikes: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Doña Julia Canedo',
    role: 'Pensionista y Cocinera Tradicional',
    location: 'Sucre &bull; Barrio San Roque',
    category: 'mani',
    productPurchased: 'Maní Molido Tradicional para Sopa (500g)',
    rating: 5,
    date: 'Hace 3 días',
    highlight: 'El maní no tiene harina de relleno ni se corta al hervir',
    comment:
      'Llevo 14 años preparando almuerzos tradicionales en Sucre. Antes tenía que pelar y moler yo misma porque en el mercado a veces mezclan con harina. El maní de Sucreñita viene puro, con su grasita natural intacta y la sopa queda espesa, suave y sin acidez.',
    initialLikes: 24,
  },
  {
    id: 'test-2',
    name: 'Ing. Mauricio Valenzuela',
    role: 'Cliente Frecuente',
    location: 'La Paz &bull; Sopocachi',
    category: 'envios',
    productPurchased: 'Combo Familiar: Maní 1kg + Ají Colorado 250g',
    rating: 5,
    date: 'Hace 1 semana',
    highlight: 'Llegó en flota a La Paz en 24 horas bien sellado',
    comment:
      'Extrañaba el sabor auténtico del ají chuquisaqueño que no se consigue en La Paz. Hice mi pedido por WhatsApp, pagué con Simple QR en 2 minutos y al día siguiente recogí la encomienda perfectamente sellada al vacío sin derrames.',
    initialLikes: 19,
  },
  {
    id: 'test-3',
    name: 'Chef Gonzalo Rodas',
    role: 'Gastronomía Boliviana',
    location: 'Sucre &bull; Centro Histórico',
    category: 'aji',
    productPurchased: 'Ají Colorado Molido con Picante (250g)',
    rating: 5,
    date: 'Hace 2 semanas',
    highlight: 'El color rubí en el mondongo y saice es inigualable',
    comment:
      'El verdadero ají de Padilla y Chuquisaca se reconoce al sofreírlo: no se quema rápido, desprende un aroma dulce acaramelado y deja el caldo con ese color rojo vivo que distingue a nuestro mondongo. Calidad de batán 100% garantizada.',
    initialLikes: 31,
  },
  {
    id: 'test-4',
    name: 'Sra. Carmen Patricia Ruiz',
    role: 'Madre de Familia',
    location: 'Santa Cruz &bull; Equipetrol',
    category: 'snacks',
    productPurchased: 'Chicharrón Crocante (200g) y Maní Garrapiñado',
    rating: 5,
    date: 'Hace 3 semanas',
    highlight: 'El chicharrón es liviano, crocante y nada grasoso',
    comment:
      'Pedimos chicharrón y maní garrapiñado para el cumpleaños de mi esposo. A todos los invitados les encantó porque no tiene ese sabor a aceite rancio de los embolsados comerciales. Se siente fresco, artesanal y hecho con cariño.',
    initialLikes: 15,
  },
  {
    id: 'test-5',
    name: 'Lic. Andrés Torrico',
    role: 'Comprador Frecuente',
    location: 'Cochabamba &bull; Cala Cala',
    category: 'envios',
    productPurchased: 'Habas Fritas Sal Marina (250g) y Ají Amarillo Dulce',
    rating: 5,
    date: 'Hace 1 mes',
    highlight: 'Excelente atención directa por WhatsApp y cobro Simple QR',
    comment:
      'La facilidad de comprar por la página y hablar directamente con la familia por WhatsApp hace toda la diferencia. El Simple QR funcionó al instante con mi banco BNB y las habas llegaron crocantes y saladas en su punto.',
    initialLikes: 18,
  },
  {
    id: 'test-6',
    name: 'Marcela Arancibia',
    role: 'Amante de la Cocina Sucrense',
    location: 'Sucre &bull; La Recoleta',
    category: 'mani',
    productPurchased: 'Maní Crudo Seleccionado (1 kg)',
    rating: 5,
    date: 'Hace 1 mes',
    highlight: 'Granos grandes, limpios y sin impurezas',
    comment:
      'Se nota el trabajo manual de selección. Ningún grano quemado o podrido. Lo tostamos en casa en paila de barro y el rendimiento fue excelente para nuestra confitura tradicional.',
    initialLikes: 12,
  },
];

export function TestimonialsSection() {
  const [selectedCategory, setSelectedCategory] = useState<TestimonialCategory>('all');
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TESTIMONIALS_DATA.forEach((t) => {
      initial[t.id] = t.initialLikes;
    });
    return initial;
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === 'all') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const handleToggleLike = (id: string) => {
    const alreadyLiked = userLiked[id];
    setLikes((prev) => ({
      ...prev,
      [id]: alreadyLiked ? prev[id] - 1 : prev[id] + 1,
    }));
    setUserLiked((prev) => ({
      ...prev,
      [id]: !alreadyLiked,
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-pastel-sand/40 dark:from-cacao-850 via-white dark:via-cacao-900 to-pastel-cream/50 dark:to-cacao-850 border border-pastel-sandDark dark:border-cacao-700 shadow-soft space-y-10 transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pastel-sandDark dark:border-cacao-700 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-sage dark:bg-cacao-800 text-pastel-sageText dark:text-[#78A887] border border-pastel-sageBorder dark:border-cacao-700 shadow-soft mb-3">
              <ShieldCheck className="w-4 h-4 text-pastel-sageText dark:text-[#78A887]" />
              <span>Clientes y Pensiones de Confianza</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] tracking-tight">
              Experiencias de familias y cocineros reales
            </h2>
            <p className="mt-2 text-sm text-sucrenita-600 dark:text-[#CBBFB6] max-w-2xl leading-relaxed">
              Opiniones de comensales en Sucre y compradores en toda Bolivia que eligen nuestros granos de maní, ajíes molidos a piedra y snacks crocantes hechos en casa.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-cacao-800 p-4 rounded-2xl border border-pastel-sandDark dark:border-cacao-700 shadow-soft shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-pastel-amberText dark:text-[#D4A853]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-pastel-amberText dark:fill-[#D4A853] text-pastel-amberText dark:text-[#D4A853]" />
                ))}
              </div>
              <span className="text-xs font-bold text-sucrenita-900 dark:text-[#FAF6F0] block mt-0.5">
                4.9 de 5.0 Estrellas
              </span>
              <span className="text-[11px] text-sucrenita-500 dark:text-[#8C7C72]">
                128 pedidos verificados
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pastel-amber dark:bg-cacao-750 flex items-center justify-center font-serif text-xl font-bold text-pastel-amberText dark:text-[#D4A853] border border-pastel-amberBorder dark:border-cacao-700">
              4.9
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'Todas las experiencias' },
            { id: 'mani', label: 'Sopa de Maní Tradicional' },
            { id: 'aji', label: 'Ají Colorado y Batán' },
            { id: 'snacks', label: 'Chicharrón & Snacks' },
            { id: 'envios', label: 'Envíos Nacionales' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as TestimonialCategory)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sucrenita-800 dark:bg-[#7C5B28] text-white shadow-soft scale-105'
                    : 'bg-white dark:bg-cacao-800 text-sucrenita-700 dark:text-[#D1C3B8] hover:bg-pastel-peach/50 dark:hover:bg-cacao-750 border border-pastel-sandDark dark:border-cacao-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => {
            const isLiked = userLiked[t.id];
            const likeCount = likes[t.id];

            return (
              <div
                key={t.id}
                className="rounded-3xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-700 p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-pastel-amberText dark:text-[#D4A853]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-pastel-amberText dark:fill-[#D4A853] text-pastel-amberText dark:text-[#D4A853]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-sucrenita-400 dark:text-[#8C7C72]">{t.date}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-700 text-[11px] text-sucrenita-700 dark:text-[#D1C3B8] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pastel-sageText dark:text-[#78A887] shrink-0" />
                    <span className="truncate">
                      <strong>Compra verificada:</strong> {t.productPurchased}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0] group-hover:text-sucrenita-700 dark:group-hover:text-[#D4A853] transition-colors leading-snug">
                    &ldquo;{t.highlight}&rdquo;
                  </h3>

                  <p className="text-xs text-sucrenita-600 dark:text-[#A8988C] leading-relaxed italic">
                    {t.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-pastel-sandDark dark:border-cacao-700 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-sucrenita-900 dark:text-[#FAF6F0]">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-sucrenita-500 dark:text-[#8C7C72] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-pastel-peachText dark:text-[#D48065]" />
                      <span dangerouslySetInnerHTML={{ __html: t.location }} />
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleLike(t.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors border ${
                      isLiked
                        ? 'bg-pastel-peach dark:bg-[#341B18] text-pastel-peachText dark:text-[#D48065] border-pastel-peachBorder dark:border-[#522924]'
                        : 'bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-600 dark:text-[#D1C3B8] border-pastel-sandDark dark:border-cacao-700'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${isLiked ? 'text-pastel-peachText dark:text-[#D48065] fill-pastel-peachText dark:fill-[#D48065]' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
