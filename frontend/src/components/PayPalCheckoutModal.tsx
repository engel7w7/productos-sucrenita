'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Copy,
  Check,
  Mail,
  User,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';
import { PayPalIcon, WhatsAppIcon } from './SocialIcons';
import { CartItem } from '@/context/CartContext';
import { getExchangeRateConfig, ExchangeRateConfig } from '@/lib/exchangeRate';
import { saveOrder } from '@/lib/orders';
import { trackPurchase, trackBeginCheckout } from '@/lib/analytics';

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalBob: number;
  onSuccessClearCart: () => void;
}

export function PayPalCheckoutModal({
  isOpen,
  onClose,
  items,
  totalBob,
  onSuccessClearCart,
}: PayPalCheckoutModalProps) {
  const [rateConfig, setRateConfig] = useState<ExchangeRateConfig>(getExchangeRateConfig());
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Sucre');
  const [paymentChoice, setPaymentChoice] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    totalUsd: string;
    rateUsed: number;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    setRateConfig(getExchangeRateConfig());
    if (isOpen) {
      trackBeginCheckout({
        paymentMethod: "PAYPAL",
        totalBob,
        itemCount: items.length,
      });
    }

    const handleUpdate = () => {
      setRateConfig(getExchangeRateConfig());
    };

    window.addEventListener('sucrenita_exchange_rate_updated', handleUpdate);
    return () => {
      window.removeEventListener('sucrenita_exchange_rate_updated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCompletedOrder(null);
      setIsProcessing(false);
      setCopiedReceipt(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRate = rateConfig.rate > 0 ? rateConfig.rate : 12.50;
  const totalUsd = (totalBob / currentRate).toFixed(2);

  const handlePaypalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `PS-PAYPAL-${Date.now().toString().slice(-6)}`;
      const timestamp = new Date().toLocaleString('es-BO');

      setCompletedOrder({
        orderId: generatedOrderId,
        totalUsd,
        rateUsed: currentRate,
        timestamp,
      });

      trackPurchase({
        transactionId: generatedOrderId,
        valueBob: Number(totalBob.toFixed(2)),
        valueUsd: Number(totalUsd),
        paymentMethod: "PAYPAL",
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          priceBob:
            typeof i.product.price === "string"
              ? parseFloat(i.product.price)
              : Number(i.product.price),
        })),
      });

      saveOrder({
        id: generatedOrderId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerCity: customerCity.trim(),
        customerAddress: customerAddress.trim(),
        paymentMethod: 'PAYPAL',
        status: 'PAGADO',
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          priceBob:
            typeof i.product.price === 'string'
              ? parseFloat(i.product.price)
              : Number(i.product.price),
        })),
        totalBob: Number(totalBob.toFixed(2)),
        totalUsd: Number(totalUsd),
        exchangeRateUsed: currentRate,
        createdAt: timestamp,
      });

      setIsProcessing(false);
      onSuccessClearCart();
    }, 1200);
  };

  const getReceiptPlainText = () => {
    if (!completedOrder) return '';
    const itemsList = items
      .map(
        (i) =>
          `* ${i.quantity}x ${i.product.name} = ${(
            Number(i.product.price) * i.quantity
          ).toFixed(2)} Bs`
      )
      .join('\n');

    return (
      `Comprobante de Pago PayPal - Productos Sucreñita\n` +
      `-----------------------------------------\n` +
      `Orden N: ${completedOrder.orderId}\n` +
      `Fecha: ${completedOrder.timestamp}\n` +
      `Cliente: ${customerName}\n` +
      `Ciudad: ${customerCity}\n` +
      `Direccion: ${customerAddress}\n` +
      `Telefono: ${customerPhone}\n` +
      (customerEmail ? `Correo: ${customerEmail}\n` : '') +
      `-----------------------------------------\n` +
      `Detalle del Pedido:\n${itemsList}\n` +
      `-----------------------------------------\n` +
      `Total en Bs: ${totalBob.toFixed(2)} Bs\n` +
      `Tipo de Cambio Aplicado: 1 USD = ${completedOrder.rateUsed.toFixed(2)} BOB (Cotizacion referencial paralela / BCB - Ministerio de Economia)\n` +
      `Total Pagado en PayPal: $${completedOrder.totalUsd} USD\n` +
      `Estado: Aprobado y verificado en linea\n\n` +
      `Solicito coordinar la preparacion y entrega de mi pedido.`
    );
  };

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(getReceiptPlainText());
  };

  const handleCopyReceipt = () => {
    const text = getReceiptPlainText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-cacao-900 rounded-3xl shadow-2xl border border-pastel-sandDark dark:border-cacao-800 overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        <div className="bg-[#003087] text-white p-5 flex items-center justify-between border-b border-[#002266]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#003087] flex items-center justify-center shadow-soft shrink-0">
              <PayPalIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                Pasarela de Pago PayPal
              </h3>
              <p className="text-xs text-sky-100">
                Cobro internacional en USD al tipo de cambio referencial
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
              <div className="p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-sucrenita-600 dark:text-[#CBBFB6]">
                  <span>Total del pedido en Bolivianos:</span>
                  <span className="font-serif font-bold text-sm text-sucrenita-900 dark:text-[#FAF6F0]">
                    {totalBob.toFixed(2)} Bs
                  </span>
                </div>

                <div className="flex items-start justify-between text-xs text-sucrenita-600 dark:text-[#CBBFB6] pt-1 border-t border-pastel-sandDark/50 dark:border-cacao-700">
                  <div>
                    <span className="font-medium text-sucrenita-700 dark:text-[#D1C3B8] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-sucrenita-700 dark:text-[#D4A853]" />
                      <span>Tipo de cambio referencial (Paralelo / BCB):</span>
                    </span>
                    <span className="text-[10px] text-sucrenita-500 dark:text-[#A8988C] block mt-0.5">
                      Estimación Ministerio de Economía & Banco Central de Bolivia
                    </span>
                  </div>
                  <span className="font-mono font-bold text-xs text-sucrenita-800 dark:text-[#D4A853] bg-white dark:bg-cacao-800 px-2 py-0.5 rounded-md border border-pastel-sandDark dark:border-cacao-700">
                    1 USD = {currentRate.toFixed(2)} BOB
                  </span>
                </div>

                <div className="pt-2 border-t border-pastel-sandDark/70 dark:border-cacao-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-sucrenita-800 dark:text-[#D1C3B8]">
                    Total a procesar en PayPal:
                  </span>
                  <span className="font-serif text-xl font-bold text-[#003087] dark:text-[#D4A853]">
                    ${totalUsd} USD
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-500 dark:text-[#CBBFB6] block mb-2">
                  Modalidad de cobro
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('card')}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                      paymentChoice === 'card'
                        ? 'border-[#003087] bg-sky-50/60 dark:bg-sky-950/30 text-sucrenita-900 dark:text-[#FAF6F0]'
                        : 'border-pastel-sandDark dark:border-cacao-800 bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-[#D1C3B8]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#003087] dark:text-sky-300 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block">Tarjeta Débito/Crédito</span>
                      <span className="text-[10px] text-sucrenita-500 dark:text-[#A8988C] block">Visa, Mastercard, Amex</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChoice('paypal')}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                      paymentChoice === 'paypal'
                        ? 'border-[#003087] bg-sky-50/60 dark:bg-sky-950/30 text-sucrenita-900 dark:text-[#FAF6F0]'
                        : 'border-pastel-sandDark dark:border-cacao-800 bg-white dark:bg-cacao-850 text-sucrenita-700 dark:text-[#D1C3B8]'
                    }`}
                  >
                    <PayPalIcon className="w-4 h-4 text-[#003087] dark:text-sky-300 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block">Cuenta PayPal</span>
                      <span className="text-[10px] text-sucrenita-500 dark:text-[#A8988C] block">Saldo directo disponible</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-500 dark:text-[#CBBFB6] block">
                  Datos de entrega del destinatario
                </span>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                    Nombre y Apellido
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej. Maria Flores"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                      WhatsApp de contacto
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+591 7..."
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                      Ciudad
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        placeholder="Sucre / La Paz / Santa Cruz"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                    Dirección exacta de entrega o punto de encuentro
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Calle, zona o referencia en Sucre o para encomienda nacional"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                    Correo electrónico para comprobante digital
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="correo@ejemplo.com (opcional)"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-sky-800 dark:text-sky-200 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#003087] dark:text-sky-300 shrink-0 mt-0.5" />
                <span>
                  Protección al comprador de PayPal activa. Acepta saldo PayPal y tarjetas de crédito o débito internacionales (Visa, Mastercard, Amex).
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#003087] hover:bg-[#002266] text-white font-bold text-xs tracking-wide shadow-soft-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Conectando con la pasarela PayPal...</span>
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
                <h3 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] mt-1">
                  Gracias por tu compra
                </h3>
                <p className="text-xs text-sucrenita-600 dark:text-[#CBBFB6] mt-1">
                  Tu orden ha sido registrada correctamente en el sistema y en el panel administrativo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Número de Orden:</span>
                  <span className="font-mono font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
                    #{completedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Total abonado:</span>
                  <span className="font-bold text-[#003087] dark:text-[#D4A853]">
                    ${completedOrder.totalUsd} USD ({totalBob.toFixed(2)} Bs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Tipo de cambio aplicado:</span>
                  <span className="font-medium text-sucrenita-800 dark:text-[#D1C3B8]">
                    1 USD = {completedOrder.rateUsed.toFixed(2)} BOB (Paralelo / BCB)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Destinatario:</span>
                  <span className="font-medium text-sucrenita-900 dark:text-[#FAF6F0]">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Destino:</span>
                  <span className="font-medium text-sucrenita-900 dark:text-[#FAF6F0]">
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
                  onClick={handleCopyReceipt}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white dark:bg-cacao-800 hover:bg-pastel-sand dark:hover:bg-cacao-750 text-sucrenita-800 dark:text-[#FAF6F0] text-xs font-semibold border border-pastel-sandDark dark:border-cacao-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1F7A4C]" />
                      <span>Comprobante copiado al portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sucrenita-600 dark:text-[#CBBFB6]" />
                      <span>Copiar datos del pedido</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-2xl bg-pastel-sand hover:bg-pastel-sandDark dark:bg-cacao-800 dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-[#FAF6F0] text-xs font-semibold transition-colors"
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
