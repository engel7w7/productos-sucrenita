'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
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
  AlertCircle,
} from 'lucide-react';
import { PayPalIcon, WhatsAppIcon } from './SocialIcons';
import { CartItem } from '@/types';
import { getExchangeRateConfig, ExchangeRateConfig } from '@/lib/exchangeRate';
import { saveOrder } from '@/lib/orders';
import { trackPurchase, trackBeginCheckout } from '@/lib/analytics';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (container: HTMLElement) => Promise<void>;
        close?: () => Promise<void>;
      };
    };
  }
}

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalBob: number;
  onSuccessClearCart: () => void;
}

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';

export function PayPalCheckoutModal({
  isOpen,
  onClose,
  items,
  totalBob,
  onSuccessClearCart,
}: PayPalCheckoutModalProps) {
  const [rateConfig, setRateConfig] = useState<ExchangeRateConfig>(
    getExchangeRateConfig()
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Sucre');
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    paypalOrderId: string;
    captureId: string;
    payerEmail: string | null;
    totalUsd: string;
    totalBob: number;
    rateUsed: number;
    timestamp: string;
    itemsSnapshot: CartItem[];
  } | null>(null);

  const paypalContainerRef = useRef<HTMLDivElement | null>(null);
  const serverModeRef = useRef<'server_rest' | 'client_sdk'>('client_sdk');

  const currentRate = rateConfig.rate > 0 ? rateConfig.rate : 12.5;
  const totalUsd = Math.max(0.01, totalBob / currentRate).toFixed(2);
  const isSandboxMode = PAYPAL_CLIENT_ID === 'sb';

  const latestRef = useRef({
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerCity,
    items,
    totalBob,
    currentRate,
    totalUsd,
    onSuccessClearCart,
  });

  latestRef.current = {
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerCity,
    items,
    totalBob,
    currentRate,
    totalUsd,
    onSuccessClearCart,
  };

  useEffect(() => {
    setRateConfig(getExchangeRateConfig());
    if (isOpen) {
      trackBeginCheckout({
        paymentMethod: 'PAYPAL',
        totalBob,
        itemCount: items.length,
      });
    }

    const handleUpdate = () => {
      setRateConfig(getExchangeRateConfig());
    };

    window.addEventListener('sucrenita_exchange_rate_updated', handleUpdate);
    return () => {
      window.removeEventListener(
        'sucrenita_exchange_rate_updated',
        handleUpdate
      );
    };
  }, [isOpen, totalBob, items.length]);

  useEffect(() => {
    if (!isOpen) {
      setCompletedOrder(null);
      setIsProcessing(false);
      setCopiedReceipt(false);
      setPaypalError('');
      return;
    }

    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const checkSdk = () => {
      if (typeof window !== 'undefined' && window.paypal?.Buttons) {
        if (!cancelled) {
          setIsSdkReady(true);
        }
        return true;
      }
      return false;
    };

    if (!checkSdk()) {
      const existingScript = document.getElementById('paypal-js-sdk');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'paypal-js-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons`;
        script.async = true;
        script.onload = () => checkSdk();
        script.onerror = () => {
          if (!cancelled) {
            setPaypalError(
              'No se pudo cargar el script oficial de PayPal. Verifica tu conexión o desactiva bloqueadores de scripts.'
            );
          }
        };
        document.body.appendChild(script);
      }

      let attempts = 0;
      pollTimer = setInterval(() => {
        attempts += 1;
        if (checkSdk() || attempts > 40) {
          if (pollTimer) clearInterval(pollTimer);
          if (attempts > 40 && !window.paypal?.Buttons && !cancelled) {
            setPaypalError(
              'La pasarela oficial de PayPal tardó en responder. Recarga la página o intenta nuevamente.'
            );
          }
        }
      }, 250);
    }

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isSdkReady || completedOrder) return;
    const container = paypalContainerRef.current;
    if (!container || !window.paypal?.Buttons) return;

    let isMounted = true;
    container.innerHTML = '';

    const buttonsInstance = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'pill',
        label: 'paypal',
        height: 44,
      },
      onClick: (
        _data: unknown,
        actions: { resolve: () => unknown; reject: () => unknown }
      ) => {
        const current = latestRef.current;
        if (
          !current.customerName.trim() ||
          !current.customerPhone.trim() ||
          !current.customerCity.trim() ||
          !current.customerAddress.trim()
        ) {
          setPaypalError(
            'Completa primero tu nombre, WhatsApp, ciudad y dirección de entrega arriba antes de pagar.'
          );
          return actions.reject();
        }
        setPaypalError('');
        return actions.resolve();
      },
      createOrder: async (
        _data: unknown,
        actions: {
          order: { create: (payload: Record<string, unknown>) => Promise<string> };
        }
      ) => {
        const current = latestRef.current;
        setPaypalError('');

        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amountBob: current.totalBob,
            exchangeRate: current.currentRate,
            items: current.items,
            customer: {
              name: current.customerName.trim(),
              phone: current.customerPhone.trim(),
              city: current.customerCity.trim(),
              address: current.customerAddress.trim(),
              email: current.customerEmail.trim(),
            },
          }),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Error al crear orden en PayPal');
        }

        if (json.mode === 'server_rest' && json.orderId) {
          serverModeRef.current = 'server_rest';
          return json.orderId;
        }

        serverModeRef.current = 'client_sdk';
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              description:
                'Productos Sucreñita - Tienda Virtual (Alto Senac A s/n, Sucre)',
              amount: {
                currency_code: 'USD',
                value: current.totalUsd,
              },
            },
          ],
        });
      },
      onApprove: async (
        data: { orderID: string },
        actions: { order: { capture: () => Promise<Record<string, unknown>> } }
      ) => {
        const current = latestRef.current;
        setIsProcessing(true);
        setPaypalError('');

        try {
          let captureDetails: Record<string, unknown> | null = null;
          if (serverModeRef.current === 'client_sdk') {
            captureDetails = await actions.order.capture();
          }

          const capRes = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.orderID,
              captureDetails,
            }),
          });

          const capJson = await capRes.json();
          if (!capRes.ok || !capJson.success) {
            throw new Error(
              capJson.message || 'No se pudo confirmar la captura en PayPal'
            );
          }

          const generatedOrderId = `PS-PAYPAL-${Date.now().toString().slice(-6)}`;
          const timestamp = new Date().toLocaleString('es-BO');
          const snapshotItems = [...current.items];

          setCompletedOrder({
            orderId: generatedOrderId,
            paypalOrderId: capJson.orderId || data.orderID,
            captureId: capJson.captureId || data.orderID,
            payerEmail: capJson.payerEmail || null,
            totalUsd: current.totalUsd,
            totalBob: current.totalBob,
            rateUsed: current.currentRate,
            timestamp,
            itemsSnapshot: snapshotItems,
          });

          trackPurchase({
            transactionId: capJson.captureId || data.orderID,
            valueBob: Number(current.totalBob.toFixed(2)),
            valueUsd: Number(current.totalUsd),
            paymentMethod: 'PAYPAL',
            items: snapshotItems.map((i) => ({
              name: i.product.name,
              quantity: i.quantity,
              priceBob:
                typeof i.product.price === 'string'
                  ? parseFloat(i.product.price)
                  : Number(i.product.price),
            })),
          });

          saveOrder({
            id: `${generatedOrderId} (${capJson.captureId || data.orderID})`,
            customerName: current.customerName.trim(),
            customerPhone: current.customerPhone.trim(),
            customerCity: current.customerCity.trim(),
            customerAddress: current.customerAddress.trim(),
            paymentMethod: 'PAYPAL',
            status: 'PAGADO',
            items: snapshotItems.map((i) => ({
              name: i.product.name,
              quantity: i.quantity,
              priceBob:
                typeof i.product.price === 'string'
                  ? parseFloat(i.product.price)
                  : Number(i.product.price),
            })),
            totalBob: Number(current.totalBob.toFixed(2)),
            totalUsd: Number(current.totalUsd),
            exchangeRateUsed: current.currentRate,
            createdAt: timestamp,
          });

          current.onSuccessClearCart();
        } catch (err) {
          setPaypalError(
            err instanceof Error
              ? err.message
              : 'Ocurrió un error al confirmar el pago en PayPal.'
          );
        } finally {
          if (isMounted) {
            setIsProcessing(false);
          }
        }
      },
      onCancel: () => {
        if (isMounted) {
          setIsProcessing(false);
          setPaypalError(
            'Pago cancelado en la ventana de PayPal. No se realizó ningún cargo.'
          );
        }
      },
      onError: () => {
        if (isMounted) {
          setIsProcessing(false);
          setPaypalError(
            'No se pudo procesar el pago con PayPal. Verifica tu cuenta o tarjeta e intenta nuevamente.'
          );
        }
      },
    });

    buttonsInstance.render(container).catch(() => {
      if (isMounted) {
        setPaypalError(
          'No se pudieron renderizar los botones oficiales de PayPal en este navegador.'
        );
      }
    });

    return () => {
      isMounted = false;
      if (buttonsInstance.close) {
        buttonsInstance.close().catch(() => {});
      }
    };
  }, [isOpen, isSdkReady, completedOrder, totalUsd]);

  if (!isOpen) return null;

  const getReceiptPlainText = () => {
    if (!completedOrder) return '';
    const itemsList = completedOrder.itemsSnapshot
      .map(
        (i) =>
          `* ${i.quantity}x ${i.product.name} = ${(
            Number(i.product.price) * i.quantity
          ).toFixed(2)} Bs`
      )
      .join('\n');

    return (
      `Comprobante Oficial PayPal - Productos Sucreñita\n` +
      `-----------------------------------------\n` +
      `Orden Tienda: ${completedOrder.orderId}\n` +
      `PayPal Order ID: ${completedOrder.paypalOrderId}\n` +
      `PayPal Capture ID: ${completedOrder.captureId}\n` +
      `Fecha: ${completedOrder.timestamp}\n` +
      `Cliente: ${customerName}\n` +
      `Ciudad: ${customerCity}\n` +
      `Dirección: ${customerAddress}\n` +
      `Teléfono: ${customerPhone}\n` +
      (completedOrder.payerEmail || customerEmail
        ? `Correo PayPal: ${completedOrder.payerEmail || customerEmail}\n`
        : '') +
      `-----------------------------------------\n` +
      `Detalle del Pedido:\n${itemsList}\n` +
      `-----------------------------------------\n` +
      `Total en Bs: ${completedOrder.totalBob.toFixed(2)} Bs\n` +
      `Tipo de Cambio Aplicado: 1 USD = ${completedOrder.rateUsed.toFixed(2)} BOB\n` +
      `Total Capturado en PayPal: $${completedOrder.totalUsd} USD\n` +
      `Estado: COMPLETED (Verificado por PayPal)\n\n` +
      `Solicito coordinar la preparación y entrega de mi pedido.`
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
      <div className="relative w-full max-w-lg bg-white dark:bg-cacao-900 rounded-3xl shadow-2xl border border-pastel-sandDark dark:border-cacao-800 overflow-hidden max-h-[92vh] flex flex-col transition-colors">
        <div className="bg-[#003087] text-white p-5 flex items-center justify-between border-b border-[#002266]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#003087] flex items-center justify-center shadow-soft shrink-0">
              <PayPalIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide">
                Checkout Oficial PayPal
              </h3>
              <p className="text-xs text-sky-100">
                {isSandboxMode
                  ? 'Entorno Oficial PayPal Sandbox (USD)'
                  : 'Pasarela Oficial PayPal Producción (USD)'}
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

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!completedOrder ? (
            <div className="space-y-5">
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
                      Calibrado desde el panel administrativo
                    </span>
                  </div>
                  <span className="font-mono font-bold text-xs text-sucrenita-800 dark:text-[#D4A853] bg-white dark:bg-cacao-800 px-2 py-0.5 rounded-md border border-pastel-sandDark dark:border-cacao-700">
                    1 USD = {currentRate.toFixed(2)} BOB
                  </span>
                </div>

                <div className="pt-2 border-t border-pastel-sandDark/70 dark:border-cacao-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-sucrenita-800 dark:text-[#D1C3B8]">
                    Total a cobrar en PayPal:
                  </span>
                  <span className="font-serif text-xl font-bold text-[#003087] dark:text-[#D4A853]">
                    ${totalUsd} USD
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-500 dark:text-[#CBBFB6] block">
                  1. Datos de entrega del destinatario
                </span>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej. María Flores"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                      WhatsApp de contacto *
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
                      Ciudad *
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
                    Dirección exacta de entrega o referencia *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Calle, zona o referencia en Sucre o para encomienda"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-sucrenita-700 dark:text-[#D1C3B8] mb-1">
                    Correo electrónico (opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-sucrenita-400 dark:text-[#A8988C] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-pastel-sandDark dark:border-cacao-700 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white dark:bg-cacao-850 text-sucrenita-900 dark:text-[#FAF6F0] placeholder-sucrenita-400 dark:placeholder-cacao-400"
                    />
                  </div>
                </div>
              </div>

              {paypalError && (
                <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/70 text-red-700 dark:text-red-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{paypalError}</span>
                </div>
              )}

              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-sucrenita-500 dark:text-[#CBBFB6] block">
                  2. Pagar mediante pasarela oficial PayPal
                </span>

                {isProcessing && (
                  <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center gap-2.5 text-xs font-semibold text-[#003087] dark:text-sky-200">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verificando y capturando pago con PayPal...</span>
                  </div>
                )}

                {!isSdkReady ? (
                  <div className="p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 flex items-center justify-center gap-2 text-xs text-sucrenita-600 dark:text-[#CBBFB6]">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Cargando botones seguros de PayPal...</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-white border border-pastel-sandDark shadow-inner">
                    <div ref={paypalContainerRef} className="min-h-[96px]" />
                  </div>
                )}
              </div>

              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-sky-800 dark:text-sky-200 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#003087] dark:text-sky-300 shrink-0 mt-0.5" />
                <span>
                  {isSandboxMode
                    ? 'Transacción procesada directamente por la ventana oficial de PayPal Sandbox. Para recibir pagos reales en cuenta comercial, configura NEXT_PUBLIC_PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.'
                    : 'Protección al comprador de PayPal activa. Acepta saldo PayPal y tarjetas internacionales Visa, Mastercard o American Express.'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-pastel-sage text-pastel-sageText flex items-center justify-center mx-auto border-2 border-pastel-sageBorder">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-pastel-sageText tracking-wider">
                  Pago Verificado por PayPal
                </span>
                <h3 className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-[#FAF6F0] mt-1">
                  Gracias por tu compra
                </h3>
                <p className="text-xs text-sucrenita-600 dark:text-[#CBBFB6] mt-1">
                  Tu transacción fue capturada en PayPal y registrada en el sistema.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pastel-sand/50 dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 text-left space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Orden Tienda:</span>
                  <span className="font-mono font-bold text-sucrenita-900 dark:text-[#FAF6F0]">
                    #{completedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">PayPal Order ID:</span>
                  <span className="font-mono font-semibold text-sucrenita-900 dark:text-[#FAF6F0]">
                    {completedOrder.paypalOrderId}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">ID Captura PayPal:</span>
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                    {completedOrder.captureId}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Total abonado:</span>
                  <span className="font-bold text-[#003087] dark:text-[#D4A853]">
                    ${completedOrder.totalUsd} USD ({completedOrder.totalBob.toFixed(2)} Bs)
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Tipo de cambio aplicado:</span>
                  <span className="font-medium text-sucrenita-800 dark:text-[#D1C3B8]">
                    1 USD = {completedOrder.rateUsed.toFixed(2)} BOB
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Destinatario:</span>
                  <span className="font-medium text-sucrenita-900 dark:text-[#FAF6F0]">
                    {customerName}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-sucrenita-500 dark:text-[#CBBFB6]">Destino:</span>
                  <span className="font-medium text-sucrenita-900 dark:text-[#FAF6F0] text-right">
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
