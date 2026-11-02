'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { CartItem } from '@/types';
import { WhatsAppIcon } from './SocialIcons';

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
    if (onSuccessClearCart) {
      onSuccessClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sucrenita-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-pastel-sandDark animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        <div className="bg-gradient-to-r from-pastel-amber to-amber-200/80 p-5 border-b border-pastel-amberBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-pastel-amberText flex items-center justify-center shadow-soft">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-sucrenita-900 leading-tight">
                Pago Seguro con Simple QR
              </h3>
              <p className="text-[11px] text-sucrenita-700">
                Red Bancaria Nacional de Bolivia (Sin comisión)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de pago QR"
            className="p-1.5 rounded-full hover:bg-white/40 text-sucrenita-700 hover:text-sucrenita-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-white to-pastel-cream/30">
          <div className="text-center space-y-1">
            <span className="text-xs text-sucrenita-500 font-medium">
              Monto exacto a transferir:
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-sucrenita-900">
              Bs {totalBob.toFixed(2)}
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Orden #{orderId}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative p-5 rounded-3xl bg-white border-2 border-dashed border-pastel-amberBorder shadow-soft flex flex-col items-center group">
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-gradient-to-br from-sucrenita-50 to-amber-50/50 border border-pastel-sandDark flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <svg
                  className="w-full h-full text-sucrenita-900"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="5" y="5" width="26" height="26" rx="4" strokeWidth="4" />
                  <rect x="11" y="11" width="14" height="14" fill="currentColor" />
                  <rect x="69" y="5" width="26" height="26" rx="4" strokeWidth="4" />
                  <rect x="75" y="11" width="14" height="14" fill="currentColor" />
                  <rect x="5" y="69" width="26" height="26" rx="4" strokeWidth="4" />
                  <rect x="11" y="75" width="14" height="14" fill="currentColor" />
                  <path
                    d="M38 12h8m-8 8h14m-14 8h6M58 8v16m6-16v8m8 0h12M12 38v8m8-8v16m8-16v8M38 38h8v8h-8zm16 0h8v8h-8zm16 0h14v8H70zm-32 16h14v8H38zm22 0h8v14h-8zm16 0h14v8H76zm-38 16h8v14h-8zm16 0h14v8H54zm22 0h14v8H76z"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="10" fill="#FFF7ED" stroke="#D97706" strokeWidth="3" />
                  <text
                    x="50"
                    y="54"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#92400E"
                    fontFamily="serif"
                  >
                    S
                  </text>
                </svg>

                <div className="absolute inset-x-0 bottom-1 text-center">
                  <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                    Simple QR Oficial
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-xs font-semibold text-sucrenita-800 block">
                  Productos Sucreñita &bull; Taller Artesanal
                </span>
                <span className="text-[11px] text-sucrenita-500">
                  Válido para cualquier entidad financiera de Bolivia
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-pastel-sand/40 p-4 rounded-2xl border border-pastel-sandDark text-xs text-sucrenita-700">
            <div className="flex items-center justify-between">
              <span className="text-sucrenita-500">Entidades Habilitadas:</span>
              <span className="font-medium text-sucrenita-900">
                BNB, BCP, Mercantil, Unión, Bisa, FIE, Fassil
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-pastel-sandDark/70">
              <div>
                <span className="text-sucrenita-500 block">Glosa / Concepto sugerido:</span>
                <span className="font-mono font-bold text-sucrenita-900 text-xs">
                  {glosa}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyGlosa}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-pastel-amber border border-pastel-sandDark font-semibold text-[11px] transition-colors shadow-soft"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado</span>
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

          <div className="space-y-2 text-xs text-sucrenita-600">
            <span className="font-bold text-sucrenita-800 uppercase tracking-wider text-[11px] block">
              Pasos para completar tu compra:
            </span>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber flex items-center justify-center text-pastel-amberText font-bold text-[11px] shrink-0">
                1
              </span>
              <span>Abre la app de tu banco móvil y escanea el código QR superior.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber flex items-center justify-center text-pastel-amberText font-bold text-[11px] shrink-0">
                2
              </span>
              <span>Verifica el monto de <strong>Bs {totalBob.toFixed(2)}</strong> y confirma la transferencia.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-pastel-amber flex items-center justify-center text-pastel-amberText font-bold text-[11px] shrink-0">
                3
              </span>
              <span>
                Presiona el botón verde de abajo para enviarnos tu comprobante bancario por WhatsApp y coordinar la entrega inmediata.
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-pastel-sand/60 border-t border-pastel-sandDark space-y-2">
          <a
            href={`https://wa.me/59171152182?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFinalize}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Enviar Comprobante de Pago por WhatsApp (+591 71152182)</span>
          </a>

          <div className="flex items-center justify-between text-[11px] text-sucrenita-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Transferencia protegida por el sistema financiero boliviano
            </span>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-sucrenita-800 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

