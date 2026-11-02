'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { trackWhatsAppContact } from '@/lib/analytics';
import { PayPalCheckoutModal } from './PayPalCheckoutModal';
import { SimpleQRModal } from './SimpleQRModal';
import { PayPalIcon, WhatsAppIcon } from './SocialIcons';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    generateWhatsAppUrl,
  } = useCart();

  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    trackWhatsAppContact({
      source: 'navbar',
      productName: `Pedido Multiple (${totalItems} items)`,
      price: totalPrice,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        <div
          className="fixed inset-0 bg-sucrenita-900/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />

        <aside className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-pastel-sandDark animate-in slide-in-from-right duration-300">
          <div className="p-5 border-b border-pastel-sandDark flex items-center justify-between bg-pastel-sand/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-pastel-amber flex items-center justify-center text-pastel-amberText border border-pastel-amberBorder">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-sucrenita-900">
                  Tu Lista de Pedido
                </h3>
                <p className="text-xs text-sucrenita-500">
                  {totalItems === 0
                    ? 'Bolsa vacía'
                    : `${totalItems} ${
                        totalItems === 1
                          ? 'producto seleccionado'
                          : 'productos seleccionados'
                      }`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Cerrar bolsa de compras"
              className="p-2 rounded-full text-sucrenita-500 hover:text-sucrenita-900 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-pastel-sand flex items-center justify-center text-sucrenita-400 border border-pastel-sandDark">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-sucrenita-900">
                    Tu bolsita está vacía
                  </h4>
                  <p className="mt-1 text-xs text-sucrenita-500 max-w-xs leading-relaxed">
                    Explora nuestro maní seleccionado para sopa, ajíes molidos a piedra y snacks crujientes caseros.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-sucrenita-600 hover:bg-sucrenita-700 text-white shadow-soft transition-all"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => {
                const numericPrice =
                  typeof item.product.price === 'string'
                    ? parseFloat(item.product.price)
                    : item.product.price;
                const itemTotal = numericPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-white border border-pastel-sandDark shadow-soft flex items-center gap-3.5 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pastel-sand shrink-0 border border-pastel-sandDark">
                      <Image
                        src={item.product.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80'}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-sucrenita-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-sucrenita-500 mt-0.5">
                        {formatPrice(numericPrice)} c/u
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center gap-2 bg-pastel-sand/60 rounded-lg p-1 border border-pastel-sandDark">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            aria-label="Disminuir cantidad"
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-sucrenita-700 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-sucrenita-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Aumentar cantidad"
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-sucrenita-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-xs text-sucrenita-900">
                          Bs {itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Quitar ${item.product.name}`}
                      className="p-1.5 text-sucrenita-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 border-t border-pastel-sandDark bg-pastel-sand/30 space-y-3.5">
              <div className="p-3 rounded-2xl bg-pastel-amber/40 border border-pastel-amberBorder/60 text-[11px] text-sucrenita-800 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-pastel-amberText shrink-0" />
                  <span>
                    Aceptamos <strong>Simple QR</strong> sin comisiones y <strong>PayPal</strong> internacional.
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs font-medium text-sucrenita-600">
                  Total a pagar:
                </span>
                <span className="font-serif text-2xl font-bold text-sucrenita-900">
                  Bs {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsQROpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-pastel-amber hover:bg-amber-300 text-sucrenita-900 border border-pastel-amberBorder font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <QrCode className="w-4 h-4 text-pastel-amberText" />
                  <span>Pagar con Simple QR (Bancos de Bolivia)</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Pedir por WhatsApp (Atención Directa)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsPayPalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#0070BA] hover:bg-[#003087] text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <PayPalIcon className="w-4 h-4" />
                  <span>Pagar con PayPal / Tarjeta Internacional</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-sucrenita-500 hover:text-rose-600 transition-colors"
                  >
                    Vaciar lista
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-[11px] text-sucrenita-700 hover:text-sucrenita-900 font-medium transition-colors"
                  >
                    Seguir agregando productos
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      <SimpleQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        totalBob={totalPrice}
        items={items}
        onSuccessClearCart={clearCart}
      />

      <PayPalCheckoutModal
        isOpen={isPayPalOpen}
        onClose={() => setIsPayPalOpen(false)}
        items={items}
        totalBob={totalPrice}
        onSuccessClearCart={clearCart}
      />
    </>
  );
}
