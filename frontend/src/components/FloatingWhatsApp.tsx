'use client';

import { useState } from 'react';
import { MessageCircle, X, Clock, ShieldCheck } from 'lucide-react';
import { trackWhatsAppContact } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = 'https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido%20o%20consulta%20desde%20su%20cat%C3%A1logo%20web';

  const handleClick = () => {
    trackWhatsAppContact({
      source: 'navbar',
      productName: 'Boton Flotante Global',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl bg-white/95 backdrop-blur-md p-5 border border-pastel-sandDark shadow-soft-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between pb-3 border-b border-pastel-sandDark">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-pastel-sage flex items-center justify-center text-pastel-sageText border border-pastel-sageBorder">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-sucrenita-900">
                  Productos Sucreñita
                </h4>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Atención en línea
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar ventana de WhatsApp"
              className="p-1 rounded-full text-sucrenita-400 hover:text-sucrenita-700 hover:bg-pastel-sand transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-sucrenita-700 leading-relaxed space-y-2">
            <p>
              ¡Hola! Atendemos pedidos de maní, ajíes y snacks directamente por chat con entrega en Sucre y envíos nacionales.
            </p>
            <div className="p-2.5 rounded-2xl bg-pastel-amber/40 border border-pastel-amberBorder/60 text-[11px] text-sucrenita-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pastel-amberText shrink-0" />
              <span>Cobro inmediato sin comisión con Simple QR</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Iniciar conversación</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contactar por WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Hacer Pedido WhatsApp
        </span>
      </button>
    </div>
  );
}
