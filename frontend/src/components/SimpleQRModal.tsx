'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  X,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Building2,
  Download,
} from 'lucide-react';
import { CartItem } from '@/types';
import { WhatsAppIcon } from './SocialIcons';
import { saveOrder } from '@/lib/orders';
import { trackPurchase, trackBeginCheckout } from '@/lib/analytics';

interface SimpleQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalBob: number;
  items: CartItem[];
  onSuccessClearCart?: () => void;
}

export function SimpleQRModal({
  isOpen,
  onClose,
  totalBob,
  items,
  onSuccessClearCart,
}: SimpleQRModalProps) {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const orderId = `PS-QR-${Math.floor(100000 + Math.random() * 900000)}`;
  const glosa = `Pedido ${orderId} Sucreñita`;

  const handleCopyGlosa = () => {
    navigator.clipboard.writeText(glosa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const productSummary = items
    .map((item) => `${item.quantity}x ${item.product.name}`)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hola Productos Sucreñita, realicé el pago por Simple QR para mi orden ${orderId}.\n\n` +
      `Detalle del pedido:\n${items
        .map(
          (i) =>
            `- ${i.quantity}x ${i.product.name} (Bs ${(
              (typeof i.product.price === 'string'
                ? parseFloat(i.product.price)
                : i.product.price) * i.quantity
            ).toFixed(2)})`
        )
        .join('\n')}\n\n` +
      `Total pagado: Bs ${totalBob.toFixed(2)}\n` +
      `Glosa utilizada: ${glosa}\n\n` +
      `Adjunto aquí mi comprobante de transferencia bancaria para el despacho en Sucre / envío nacional.`
  );

  const handleFinalize = () => {
    saveOrder({
      id: orderId,
      customerName: 'Cliente Simple QR',
      customerPhone: '+591 71152182',
      customerCity: 'Sucre',
      customerAddress: 'Coordinado vía WhatsApp con comprobante QR',
      paymentMethod: 'SIMPLE_QR',
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
      createdAt: new Date().toLocaleString('es-BO'),
    });
    if (onSuccessClearCart) {
      onSuccessClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-cacao-900 rounded-3xl overflow-hidden shadow-2xl border border-pastel-sandDark dark:border-cacao-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] transition-colors">
        <div className="bg-gradient-to-r from-pastel-amber to-amber-200/80 dark:from-cacao-950 dark:to-cacao-900 p-5 border-b border-pastel-amberBorder dark:border-cacao-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-cacao-800 text-pastel-amberText dark:text-amber-300 flex items-center justify-center shadow-soft">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50 leading-tight">
                Pago Seguro con Simple QR
              </h3>
              <p className="text-[11px] text-sucrenita-700 dark:text-cacao-200">
                Red Bancaria Nacional de Bolivia (Sin comisión)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de pago QR"
            className="p-1.5 rounded-full hover:bg-white/40 dark:hover:bg-cacao-800 text-sucrenita-700 dark:text-cacao-200 hover:text-sucrenita-900 dark:hover:text-cacao-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-white to-pastel-cream/30 dark:from-cacao-900 dark:to-cacao-850">
          <div className="text-center space-y-1">
            <span className="text-xs text-sucrenita-500 dark:text-cacao-300 font-medium">
              Monto exacto a transferir:
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900 dark:text-cacao-50">
              Bs {totalBob.toFixed(2)}
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              Orden #{orderId}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative p-4 sm:p-5 rounded-3xl bg-white dark:bg-cacao-850 border-2 border-pastel-amberBorder dark:border-amber-700/60 shadow-soft flex flex-col items-center group">
              <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-2xl bg-white border border-pastel-sandDark dark:border-cacao-700 flex items-center justify-center p-2 relative overflow-hidden shadow-sm">
                <Image
                  src="/qr-banco-union.jpg"
                  alt="Código Simple QR Oficial Banco Unión - Productos Sucreñita"
                  fill
                  priority
                  sizes="256px"
                  className="object-contain p-1"
                />
              </div>

              <div className="mt-3 text-center space-y-1">
                <span className="text-xs font-bold text-sucrenita-900 dark:text-cacao-50 block">
                  Banco Unión S.A. &bull; Jhojan Romero
                </span>
                <span className="text-[11px] font-mono text-sucrenita-600 dark:text-cacao-300 block">
                  Cta: 10000046520561 &bull; Simple QR Interoperable
                </span>
                <div className="pt-1.5">
                  <a
                    href="/qr-banco-union.jpg"
                    download="QR-Simple-BancoUnion-ProductosSucrenita.jpg"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pastel-sand dark:bg-cacao-800 hover:bg-pastel-amber dark:hover:bg-cacao-700 text-sucrenita-800 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 text-[11px] font-semibold transition-colors shadow-soft"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar QR para galería móvil</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-pastel-sand/40 dark:bg-cacao-850 p-4 rounded-2xl border border-pastel-sandDark dark:border-cacao-800 text-xs text-sucrenita-700 dark:text-cacao-200">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sucrenita-500 dark:text-cacao-300">Entidades Habilitadas:</span>
              <span className="font-medium text-sucrenita-900 dark:text-cacao-100 text-right">
                Unión, BNB, BCP, Mercantil, Bisa, FIE, Sol, Ganadero
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-pastel-sandDark/70 dark:border-cacao-750">
              <div>
                <span className="text-sucrenita-500 dark:text-cacao-300 block">Glosa / Concepto sugerido:</span>
                <span className="font-mono font-bold text-sucrenita-900 dark:text-cacao-50 text-xs">
                  {glosa}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyGlosa}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-cacao-800 hover:bg-pastel-amber dark:hover:bg-cacao-700 border border-pastel-sandDark dark:border-cacao-700 font-semibold text-[11px] text-sucrenita-800 dark:text-cacao-100 transition-colors shadow-soft"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-pastel-sageText dark:text-emerald-400" />
                    <span className="text-pastel-sageText dark:text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sucrenita-600" />
                    <span>Copiar Glosa</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2 text-xs text-sucrenita-600 dark:text-cacao-200">
            <span className="font-bold text-sucrenita-800 dark:text-cacao-100 uppercase tracking-wider text-[11px] block">
              Pasos para completar tu compra:
            </span>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber dark:bg-amber-950/60 flex items-center justify-center text-pastel-amberText dark:text-amber-300 font-bold text-[11px] shrink-0 border border-transparent dark:border-amber-800/70">
                1
              </span>
              <span>Abre la app de tu banco móvil (UNIMóvil, BNB, BCP, Mercantil, Bisa, FIE u otro) y escanea o carga el código QR oficial de Banco Unión.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber dark:bg-amber-950/60 flex items-center justify-center text-pastel-amberText dark:text-amber-300 font-bold text-[11px] shrink-0 border border-transparent dark:border-amber-800/70">
                2
              </span>
              <span>Ingresa el monto exacto de <strong>Bs {totalBob.toFixed(2)}</strong>, pega la glosa sugerida y confirma la transferencia a cuenta de Jhojan Romero.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber dark:bg-amber-950/60 flex items-center justify-center text-pastel-amberText dark:text-amber-300 font-bold text-[11px] shrink-0 border border-transparent dark:border-amber-800/70">
                3
              </span>
              <span>
                Presiona el botón verde de abajo para enviarnos tu comprobante bancario por WhatsApp y coordinar la entrega inmediata.
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-pastel-sand/60 dark:bg-cacao-950 border-t border-pastel-sandDark dark:border-cacao-800 space-y-2">
          <a
            href={`https://wa.me/59171152182?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFinalize}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#1F7A4C] hover:bg-[#19653E] text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Enviar Comprobante de Pago por WhatsApp (+591 71152182)</span>
          </a>

          <div className="flex items-center justify-between text-[11px] text-sucrenita-500 dark:text-cacao-300 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-pastel-sageText" />
              Transferencia protegida por el sistema financiero boliviano
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-sucrenita-600 dark:text-cacao-300 hover:text-sucrenita-800 dark:hover:text-cacao-100 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

