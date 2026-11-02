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
  Youtube,
} from 'lucide-react';
import {
  TelegramIcon,
  TikTokIcon,
  MessengerIcon,
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

  const handleSendCustom = (platform: 'whatsapp' | 'messenger' | 'telegram') => {
    const text = customMessage.trim() || 'Hola Productos Sucreñita, tengo una consulta sobre sus productos.';
    let url = '';

    if (platform === 'whatsapp') {
      url = `https://wa.me/59170000000?text=${encodeURIComponent(text)}`;
    } else if (platform === 'messenger') {
      url = `https://m.me/ProductosSucrenita`;
    } else if (platform === 'telegram') {
      url = `https://t.me/ProductosSucrenita`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      setCustomMessage('');
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir centro de atención y chat"
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-sucrenita-700 hover:bg-sucrenita-800 text-white shadow-soft-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <MessageSquare className="w-5 h-5 text-pastel-peach" />
            <span className="text-xs font-semibold tracking-wide">
              Chat & Canales
            </span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:max-h-[640px] z-50 flex flex-col bg-white rounded-none sm:rounded-3xl shadow-2xl border border-pastel-sandDark overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-gradient-to-r from-sucrenita-800 via-sucrenita-700 to-sucrenita-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-pastel-amber flex items-center justify-center text-sucrenita-900 font-serif font-bold text-base border-2 border-white/30">
                S
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-sucrenita-800" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wide leading-none">
                  Productos Sucreñita
                </h3>
                <span className="text-[11px] text-pastel-peach flex items-center gap-1 mt-1">
                  En línea desde Sucre, Bolivia
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar ventana de atención"
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-pastel-sandDark bg-pastel-sand/60">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
                activeTab === 'chat'
                  ? 'border-sucrenita-700 text-sucrenita-900 bg-white'
                  : 'border-transparent text-sucrenita-500 hover:text-sucrenita-800'
              }`}
            >
              Asistente & Dudas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
                activeTab === 'social'
                  ? 'border-sucrenita-700 text-sucrenita-900 bg-white'
                  : 'border-transparent text-sucrenita-500 hover:text-sucrenita-800'
              }`}
            >
              Redes y Contacto
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[460px] bg-gradient-to-b from-white to-pastel-cream/40">
            {activeTab === 'chat' ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-pastel-amber/40 border border-pastel-amberBorder text-sucrenita-900 text-xs leading-relaxed">
                  <p className="font-medium">
                    Bienvenido a Productos Sucreñita. Selecciona una pregunta rápida o escribe tu consulta para responderte de inmediato:
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-sucrenita-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Preguntas frecuentes rápidas
                  </span>

                  {FAQS.map((faq) => {
                    const isExpanded = selectedFaq === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-2xl border border-pastel-sandDark bg-white overflow-hidden shadow-soft transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedFaq(isExpanded ? null : faq.id)}
                          className="w-full p-3 text-left text-xs font-semibold text-sucrenita-800 hover:text-sucrenita-900 flex items-center justify-between gap-2"
                        >
                          <span>{faq.question}</span>
                          <ChevronRight
                            className={`w-4 h-4 text-sucrenita-400 shrink-0 transition-transform ${
                              isExpanded ? 'rotate-90 text-sucrenita-700' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 pt-1 border-t border-pastel-sandDark/60 bg-pastel-sand/30 text-xs text-sucrenita-700 space-y-2.5 animate-in fade-in">
                            <p className="leading-relaxed">{faq.answer}</p>
                            <a
                              href={`https://wa.me/59170000000?text=${encodeURIComponent(
                                faq.whatsappMessage
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-pastel-sage hover:bg-emerald-100 text-pastel-sageText border border-pastel-sageBorder transition-colors"
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

                <div className="pt-2 border-t border-pastel-sandDark space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-sucrenita-400">
                    O escribe tu mensaje directo:
                  </span>
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Escribe tu consulta o pedido..."
                      className="w-full p-2.5 text-xs rounded-2xl border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-sucrenita-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendCustom('whatsapp')}
                      className="inline-flex items-center justify-center gap-1 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendCustom('messenger')}
                      className="inline-flex items-center justify-center gap-1 p-2 rounded-xl bg-[#0084FF] hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors"
                    >
                      <MessengerIcon className="w-3.5 h-3.5" />
                      <span>Messenger</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendCustom('telegram')}
                      className="inline-flex items-center justify-center gap-1 p-2 rounded-xl bg-[#229ED9] hover:bg-sky-600 text-white text-[11px] font-semibold transition-colors"
                    >
                      <TelegramIcon className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-sucrenita-400 block mb-1">
                  Nuestros canales oficiales
                </span>

                <a
                  href="https://wa.me/59170000000?text=Hola%20Productos%20Sucre%C3%B1ita,%20quisiera%20hacer%20un%20pedido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-pastel-sage/30 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-emerald-700 transition-colors">
                        WhatsApp Oficial
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">+591 70000000 &bull; Atención directa</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-emerald-600" />
                </a>

                <a
                  href="https://m.me/ProductosSucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-blue-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center">
                      <MessengerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-[#0084FF] transition-colors">
                        Facebook Messenger
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">m.me/ProductosSucrenita</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-[#0084FF]" />
                </a>

                <a
                  href="https://t.me/ProductosSucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-sky-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center">
                      <TelegramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-[#229ED9] transition-colors">
                        Telegram Oficial
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">@ProductosSucrenita</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-[#229ED9]" />
                </a>

                <a
                  href="https://www.tiktok.com/@productossucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-rose-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <TikTokIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-rose-600 transition-colors">
                        TikTok Oficial
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">@productossucrenita &bull; Videos y recetas</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-rose-600" />
                </a>

                <a
                  href="https://www.facebook.com/ProductosSucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-blue-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-[#1877F2] transition-colors">
                        Página de Facebook
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">Comunidad en Sucre</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-[#1877F2]" />
                </a>

                <a
                  href="https://www.instagram.com/productossucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-pink-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-[#E4405F] transition-colors">
                        Perfil de Instagram
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">@productossucrenita</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-[#E4405F]" />
                </a>

                <a
                  href="https://www.youtube.com/@ProductosSucrenita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-red-50 border border-pastel-sandDark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-sucrenita-900 group-hover:text-red-600 transition-colors">
                        Canal de YouTube
                      </h4>
                      <p className="text-[11px] text-sucrenita-500">Recetas tradicionales y secretos</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sucrenita-400 group-hover:text-red-600" />
                </a>
              </div>
            )}
          </div>

          <div className="p-3 bg-pastel-sand/50 border-t border-pastel-sandDark flex items-center justify-between text-[11px] text-sucrenita-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Atención directa sin intermediarios
            </span>
            <span>Sucre, Bolivia</span>
          </div>
        </div>
      )}
    </>
  );
}

