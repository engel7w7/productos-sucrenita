'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS_LIST: FAQ[] = [
  {
    id: 'f-1',
    category: 'Cocina & Sazón',
    question: '¿Cómo preparo la auténtica Sopa de Maní con el maní molido Sucreñita?',
    answer:
      'Nuestro maní ya viene molido fino conservando sus aceites naturales. Para 6 platos, disuelve 250g en agua fría antes de agregar a la olla con el caldo de res o pollo hirviendo. Deja hervir a fuego medio-bajo durante 45 a 55 minutos para que cocine parejo y no genere espuma ni se corte. Acompaña con papas al hilo doradas y orégano.',
  },
  {
    id: 'f-2',
    category: 'Ingredientes',
    question: '¿Cuál es la diferencia entre el Ají Colorado y el Ají Amarillo molido?',
    answer:
      'El Ají Colorado molido a piedra tiene un picor vivo y un color rojo rubí intenso, ideal para mondongo chuquisaqueño, saice y picantes. El Ají Amarillo dulce ha sido completamente desvenado y despepitado: aporta un aroma dulce y dorado sin picar, perfecto para toda la familia y platos suaves como fricasé o ají de fideo para niños.',
  },
  {
    id: 'f-3',
    category: 'Envíos & Cobertura',
    question: '¿Cómo funcionan las entregas en Sucre y los envíos a toda Bolivia?',
    answer:
      'En la ciudad de Sucre realizamos entregas a domicilio en el centro histórico, San Roque, La Recoleta, Barrio Petrolero y zonas aledañas en menos de 24 horas. Para el resto de Bolivia (La Paz, Cochabamba, Santa Cruz, Potosí, Oruro, Tarija, Beni y Pando), enviamos dos veces por semana por encomienda en flota con empaque al vacío o hermético.',
  },
  {
    id: 'f-4',
    category: 'Formas de Pago',
    question: '¿Qué formas de pago aceptan en la tienda virtual?',
    answer:
      'Contamos con tres modalidades seguras: 1) Simple QR de la red bancaria boliviana (sin comisiones desde cualquier banco como BNB, BCP, Banco Unión, Mercantil, Bisa, Fassil); 2) Pasarela PayPal con tarjeta de crédito o débito internacional en dólares americanos (USD); y 3) Efectivo contra entrega en la ciudad de Sucre.',
  },
  {
    id: 'f-5',
    category: 'Conservación',
    question: '¿Cuánto tiempo duran los productos y cómo debo almacenarlos?',
    answer:
      'Al no contener conservantes químicos artificiales, recomendamos guardar el maní crudo o molido en un lugar fresco, seco y protegido de la luz solar directa (dura hasta 6 meses fresco). Los ajíes en polvo conservan su aroma durante 8 meses en frascos herméticos. Los snacks crocantes (chicharrón y habas) se entregan sellados para consumir en un lapso de 30 días con máxima crocancia.',
  },
  {
    id: 'f-6',
    category: 'Ventas por Mayor',
    question: '¿Tienen precios por mayor para restaurantes y pensiones?',
    answer:
      'Sí. Atendemos a pensiones familiares, salones de eventos y restaurantes tradicionales con precios especiales por cuartilla, arroba (25 libras) o quintal. Contáctanos por WhatsApp para coordinar una cotización por volumen y entregas programadas semanales.',
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('f-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl p-8 sm:p-12 bg-white border border-pastel-sandDark shadow-soft space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-amber/80 text-pastel-amberText border border-pastel-amberBorder shadow-soft mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras &bull; Guía del Consumidor</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2 text-sm text-sucrenita-600 leading-relaxed">
            Todo lo que necesitas saber sobre nuestros ingredientes, consejos de preparación, entregas en Sucre y métodos de pago disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-pastel-peachText/40 bg-pastel-sand/40 shadow-soft'
                    : 'border-pastel-sandDark/80 bg-white hover:border-pastel-sandDark hover:bg-pastel-sand/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-3 text-sm font-semibold text-sucrenita-900"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pastel-peachText">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base leading-snug">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-sucrenita-500 shrink-0 transition-transform mt-1 ${
                      isOpen ? 'rotate-180 text-pastel-peachText' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-sucrenita-700 leading-relaxed border-t border-pastel-sandDark/50 space-y-3 animate-in fade-in">
                    <p>{faq.answer}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-pastel-sageText font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Información verificada por el taller familiar Sucreñita</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-pastel-amber/30 border border-pastel-amberBorder flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-sm text-sucrenita-900">
              ¿Tienes alguna otra consulta o pedido especial?
            </h4>
            <p className="text-xs text-sucrenita-600 mt-0.5">
              Estamos en línea para responder tus dudas sobre preparación o coordinar tu despacho.
            </p>
          </div>
          <a
            href="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20tengo%20una%20consulta%20adicional%20sobre%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F7A4C] hover:bg-[#19653E] text-white font-semibold text-xs shadow-soft transition-all shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

