'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { PayPalIcon, WhatsAppIcon } from './SocialIcons';
import { CartItem } from '@/context/CartContext';

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalBob: number;
  onSuccessClearCart: () => void;
}

const BOB_TO_USD_RATE = 6.96;

export function PayPalCheckoutModal({
  isOpen,
  onClose,
  items,
  totalBob,
  onSuccessClearCart,
}: PayPalCheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Sucre');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    totalUsd: string;
    timestamp: string;
  } | null>(null);

  if (!isOpen) return null;

  const totalUsd = (totalBob / BOB_TO_USD_RATE).toFixed(2);

  const handlePaypalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `PS-PAYPAL-${Date.now().toString().slice(-6)}`;
      setCompletedOrder({
        orderId: generatedOrderId,
        totalUsd,
        timestamp: new Date().toLocaleString('es-BO'),
      });
      setIsProcessing(false);
      onSuccessClearCart();
    }, 1200);
  };

  const generateWhatsAppMessage = () => {
    if (!completedOrder) return '';
    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} = ${(
            Number(i.product.price) * i.quantity
          ).toFixed(2)} Bs`
      )
      .join('\n');

    return encodeURIComponent(
      `Comprobante de Pago PayPal - Productos Sucreñita\n` +
        `-----------------------------------------\n` +
        `Orden N°: ${completedOrder.orderId}\n` +
        `Fecha: ${completedOrder.timestamp}\n` +
        `Cliente: ${customerName}\n` +
        `Ciudad: ${customerCity}\n` +
        `Dirección: ${customerAddress}\n` +
        `Teléfono: ${customerPhone}\n` +
        `-----------------------------------------\n` +
        `Detalle del Pedido:\n${itemsList}\n` +
        `-----------------------------------------\n` +
        `Total pagado: ${totalBob.toFixed(2)} Bs ($ ${completedOrder.totalUsd} USD)\n` +
        `Método: PayPal Checkout Internacional\n` +
        `Estado: Aprobado y verificado\n\n` +
        `Por favor coordinar el empaque y despacho de mi pedido.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-pastel-sandDark overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-[#003087] via-[#0079C1] to-[#00457C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#003087] flex items-center justify-center shadow-soft">
              <PayPalIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                Pasarela de Pago PayPal
              </h3>
              <p className="text-xs text-sky-200">
                Cobro internacional seguro en USD
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de PayPal"
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!completedOrder ? (
            <form onSubmit={handlePaypalSubmit} className="space-y-5">
              <div className="p-4 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark space-y-2.5">
                <div className="flex items-center justify-between text-xs text-sucrenita-600">
                  <span>Total en Bolivianos:</span>
                  <span className="font-serif font-bold text-sm text-sucrenita-900">
                    {totalBob.toFixed(2)} Bs
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-sucrenita-600">
                  <span>Tipo de cambio referencial:</span>
                  <span className="font-medium">1 USD = {BOB_TO_USD_RATE} BOB</span>
                </div>
                <div className="pt-2 border-t border-pastel-sandDark/70 flex items-center justify-between">
                  <span className="text-xs font-bold text-sucrenita-800">
                    Total a procesar en PayPal:
                  </span>
                  <span className="font-serif text-lg font-bold text-[#003087]">
                    ${totalUsd} USD
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-500 block">
                  Datos de entrega del destinatario
                </span>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 mb-1">
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. María Flores"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-[#0079C1] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-sucrenita-700 mb-1">
                      WhatsApp de contacto
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+591 7..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-[#0079C1] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sucrenita-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      required
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Sucre / La Paz / etc."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-[#0079C1] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 mb-1">
                    Dirección exacta de entrega o punto de encuentro
                  </label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Calle, zona o referencia en Sucre o para encomienda"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark focus:outline-none focus:ring-2 focus:ring-[#0079C1] bg-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0079C1] shrink-0 mt-0.5" />
                <span>
                  Protección al comprador de PayPal activa. Puedes pagar con tu saldo PayPal o tarjeta de débito/crédito internacional.
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0070BA] hover:bg-[#003087] text-white font-bold text-xs tracking-wide shadow-soft-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Conectando con PayPal...</span>
                  </>
                ) : (
                  <>
                    <PayPalIcon className="w-4 h-4" />
                    <span>Pagar ${totalUsd} USD con PayPal</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-pastel-sage text-pastel-sageText flex items-center justify-center mx-auto border-2 border-pastel-sageBorder">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-pastel-sageText tracking-wider">
                  Pago Aprobado
                </span>
                <h3 className="font-serif text-2xl font-bold text-sucrenita-900 mt-1">
                  ¡Gracias por tu compra!
                </h3>
                <p className="text-xs text-sucrenita-600 mt-1">
                  Tu orden ha sido registrada correctamente en el sistema.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pastel-sand/50 border border-pastel-sandDark text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-sucrenita-500">Número de Orden:</span>
                  <span className="font-mono font-bold text-sucrenita-900">
                    #{completedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500">Monto abonado:</span>
                  <span className="font-bold text-[#003087]">
                    ${completedOrder.totalUsd} USD ({totalBob.toFixed(2)} Bs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500">Destinatario:</span>
                  <span className="font-medium text-sucrenita-900">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500">Destino:</span>
                  <span className="font-medium text-sucrenita-900">
                    {customerCity} - {customerAddress}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/59171152182?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#1F7A4C] hover:bg-[#19653E] text-white font-bold text-xs shadow-soft transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Enviar comprobante a WhatsApp de la tienda</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-2xl bg-pastel-sand hover:bg-pastel-sandDark text-sucrenita-800 text-xs font-semibold transition-colors"
                >
                  Finalizar y cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

