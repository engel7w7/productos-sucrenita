'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Facebook,
  Instagram,
} from 'lucide-react';
import {
  TikTokIcon,
  WhatsAppIcon,
} from './SocialIcons';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  actionText: string;
  whatsappMessage: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo realizo un pedido de maní, ají o snacks?',
    answer:
      'Puedes agregar los productos que desees a la bolsita de compras en la web o pedirlos directamente por WhatsApp. Coordinamos la entrega a domicilio o retiro en Sucre.',
    actionText: 'Coordinar pedido por WhatsApp',
    whatsappMessage: 'Hola Productos Sucreñita, quisiera hacer un pedido de maní y ajíes.',
  },
  {
    id: 'faq-2',
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer:
      'Aceptamos pagos directos mediante Simple QR desde cualquier banco boliviano sin comisiones, tarjetas y pagos internacionales a través de PayPal, y efectivo contra entrega en la ciudad de Sucre.',
    actionText: 'Consultar datos de pago QR',
    whatsappMessage: 'Hola Productos Sucreñita, solicito los datos bancarios para pagar con Simple QR.',
  },
  {
    id: 'faq-3',
    question: '¿Realizan envíos a otras ciudades de Bolivia?',
    answer:
      'Sí. Realizamos despachos semanales por flota o encomienda a La Paz, Cochabamba, Santa Cruz, Potosí, Oruro, Tarija, Beni y Pando. El producto viaja protegido en empaque hermético.',
    actionText: 'Consultar tarifa de encomienda',
    whatsappMessage: 'Hola Productos Sucreñita, quisiera cotizar el envío de un pedido a mi ciudad.',
  },
  {
    id: 'faq-4',
    question: '¿Venden al por mayor o por arroba para restaurantes?',
    answer:
      'Sí. Contamos con precios preferenciales por cuartilla, arroba o quintal para pensiones, restaurantes típicos y eventos familiares en Sucre y toda Bolivia.',
    actionText: 'Solicitar lista de precios por mayor',
    whatsappMessage: 'Hola Productos Sucreñita, quisiera solicitar la lista de precios al por mayor.',
  },
];

export function SocialChatHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'social'>('chat');
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const handleSendWhatsApp = () => {
    const text = customMessage.trim() || 'Hola Productos Sucreñita, tengo una consulta sobre sus productos.';
    const url = `https://wa.me/59171152182?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir centro de atención y chat"
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-sucrenita-800 hover:bg-sucrenita-900 text-white shadow-soft-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pastel-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1F7A4C]" />
            </span>
            <MessageSquare className="w-5 h-5 text-pastel-sand" />
            <span className="font-semibold text-xs pr-1">Atención en línea</span>
          </button>
        )}

        {isOpen && (
          <div className="w-[340px] sm:w-[380px] bg-white dark:bg-cacao-900 rounded-3xl shadow-soft-lg border border-pastel-sandDark dark:border-cacao-800 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 transition-colors">
            <div className="bg-sucrenita-900 dark:bg-cacao-950 dark:border-b dark:border-cacao-800 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sucrenita-800 text-pastel-sand flex items-center justify-center font-serif font-bold text-lg border border-sucrenita-700">
                  S
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-tight flex items-center gap-2">
                    Productos Sucreñita
                  </h3>
                  <p className="text-[11px] text-sucrenita-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1F7A4C] inline-block" />
                    Taller familiar &bull; Sucre, Bolivia
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar ventana de atención"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-pastel-sandDark dark:border-cacao-800 bg-pastel-sand/40 dark:bg-cacao-850">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'chat'
                    ? 'text-sucrenita-900 dark:text-cacao-50 border-b-2 border-sucrenita-800 dark:border-cacao-400 bg-white dark:bg-cacao-900'
                    : 'text-sucrenita-500 dark:text-cacao-300 hover:text-sucrenita-800 dark:hover:text-cacao-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-sucrenita-600" />
                <span>Preguntas Frecuentes</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('social')}
                className={`flex-1 py-3 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'social'
                    ? 'text-sucrenita-900 dark:text-cacao-50 border-b-2 border-sucrenita-800 dark:border-cacao-400 bg-white dark:bg-cacao-900'
                    : 'text-sucrenita-500 dark:text-cacao-300 hover:text-sucrenita-800 dark:hover:text-cacao-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-sucrenita-600" />
                <span>Canales Oficiales</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-pastel-sand/20 dark:bg-cacao-900/60">
              {activeTab === 'chat' ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 text-xs text-sucrenita-700 dark:text-cacao-200 leading-relaxed shadow-soft">
                    <p className="font-medium text-sucrenita-900 dark:text-cacao-100 mb-1">
                      ¡Bienvenido a Productos Sucreñita!
                    </p>
                    <p>
                      Selecciona una consulta frecuente o escríbenos directamente a nuestro WhatsApp oficial para atención inmediata.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {FAQS.map((faq) => {
                      const isExpanded = selectedFaq === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-2xl border border-pastel-sandDark dark:border-cacao-800 bg-white dark:bg-cacao-850 overflow-hidden transition-all shadow-soft"
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedFaq(isExpanded ? null : faq.id)}
                            className="w-full p-3.5 text-left text-xs font-semibold text-sucrenita-800 dark:text-cacao-100 hover:text-sucrenita-950 dark:hover:text-cacao-50 flex items-center justify-between gap-2 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronRight
                              className={`w-4 h-4 text-sucrenita-400 shrink-0 transition-transform ${
                                isExpanded ? 'rotate-90 text-sucrenita-800' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="p-3.5 pt-0 text-[11px] text-sucrenita-600 dark:text-cacao-200 border-t border-pastel-sand/50 dark:border-cacao-800 bg-pastel-sand/30 dark:bg-cacao-800/50 space-y-2.5">
                              <p className="leading-relaxed">{faq.answer}</p>
                              <a
                                href={`https://wa.me/59171152182?text=${encodeURIComponent(
                                  faq.whatsappMessage
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sucrenita-800 hover:bg-sucrenita-900 text-white transition-colors"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" />
                                <span>{faq.actionText}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-pastel-sandDark dark:border-cacao-800 space-y-2">
                    <label className="text-[11px] font-semibold text-sucrenita-700 dark:text-cacao-200 block">
                      ¿Tienes otra consulta o pedido especial?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
                        placeholder="Escribe tu mensaje aquí..."
                        className="flex-1 p-2.5 text-xs rounded-2xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-1 focus:ring-sucrenita-500 bg-white dark:bg-cacao-850 text-sucrenita-800 dark:text-cacao-100 placeholder-sucrenita-400 dark:placeholder-cacao-400"
                      />
                      <button
                        type="button"
                        onClick={handleSendWhatsApp}
                        aria-label="Enviar por WhatsApp"
                        className="p-2.5 rounded-2xl bg-sucrenita-800 hover:bg-sucrenita-900 text-white transition-colors flex items-center justify-center shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-sucrenita-400 block mb-1">
                    Nuestros cuatro canales oficiales
                  </span>

                  <a
                    href="https://wa.me/59171152182?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-cacao-850 hover:bg-pastel-sand/60 dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-cacao-100 flex items-center justify-center">
                        <WhatsAppIcon className="w-5 h-5 text-[#2B5E46]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100 group-hover:text-sucrenita-700 dark:group-hover:text-cacao-50 transition-colors">
                          WhatsApp Oficial
                        </h4>
                        <p className="text-[11px] text-sucrenita-500 dark:text-cacao-300">+591 71152182 &bull; Atención directa</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-700" />
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61595923780807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-cacao-850 hover:bg-pastel-sand/60 dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-cacao-100 flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100 group-hover:text-sucrenita-700 dark:group-hover:text-cacao-50 transition-colors">
                          Página de Facebook
                        </h4>
                        <p className="text-[11px] text-sucrenita-500 dark:text-cacao-300">facebook.com &bull; Comunidad oficial</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-700" />
                  </a>

                  <a
                    href="https://www.instagram.com/productossucrenita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-cacao-850 hover:bg-pastel-sand/60 dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-cacao-100 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-[#E4405F]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100 group-hover:text-sucrenita-700 dark:group-hover:text-cacao-50 transition-colors">
                          Perfil de Instagram
                        </h4>
                        <p className="text-[11px] text-sucrenita-500 dark:text-cacao-300">@productossucrenita &bull; Galería</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-700" />
                  </a>

                  <a
                    href="https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-cacao-850 hover:bg-pastel-sand/60 dark:hover:bg-cacao-800 border border-pastel-sandDark dark:border-cacao-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pastel-sand dark:bg-cacao-800 text-sucrenita-800 dark:text-cacao-100 flex items-center justify-center">
                        <TikTokIcon className="w-5 h-5 text-slate-800" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sucrenita-900 dark:text-cacao-100 group-hover:text-sucrenita-700 dark:group-hover:text-cacao-50 transition-colors">
                          TikTok Oficial
                        </h4>
                        <p className="text-[11px] text-sucrenita-500 dark:text-cacao-300">@sucrenita_artesanal &bull; Videos y recetas</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-sucrenita-700" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-3 bg-white dark:bg-cacao-950 border-t border-pastel-sandDark dark:border-cacao-800 flex items-center justify-between text-[11px] text-sucrenita-500 dark:text-cacao-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sucrenita-600" />
                Venta directa sin comisiones
              </span>
              <a
                href="https://wa.me/59171152182"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sucrenita-800 dark:text-cacao-100 hover:text-sucrenita-950 dark:hover:text-cacao-50 transition-colors"
              >
                +591 71152182
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
