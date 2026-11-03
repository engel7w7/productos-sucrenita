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

        <aside className="relative w-full max-w-md bg-white dark:bg-cacao-900 h-full shadow-2xl flex flex-col z-10 border-l border-pastel-sandDark dark:border-cacao-800 animate-in slide-in-from-right duration-300 transition-colors">
          <div className="p-5 border-b border-pastel-sandDark dark:border-cacao-800 flex items-center justify-between bg-pastel-sand/50 dark:bg-cacao-850">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-pastel-amber dark:bg-amber-950/60 flex items-center justify-center text-pastel-amberText dark:text-amber-300 border border-pastel-amberBorder dark:border-amber-800/70">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-sucrenita-900 dark:text-cacao-50">
                  Tu Lista de Pedido
                </h3>
                <p className="text-xs text-sucrenita-500 dark:text-cacao-300">
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
              className="p-2 rounded-full text-sucrenita-500 dark:text-cacao-300 hover:text-sucrenita-900 dark:hover:text-cacao-50 hover:bg-white dark:hover:bg-cacao-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-pastel-sand dark:bg-cacao-850 flex items-center justify-center text-sucrenita-400 dark:text-cacao-300 border border-pastel-sandDark dark:border-cacao-800">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-sucrenita-900 dark:text-cacao-50">
                    Tu bolsita está vacía
                  </h4>
                  <p className="mt-1 text-xs text-sucrenita-500 dark:text-cacao-300 max-w-xs leading-relaxed">
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
                    className="p-3.5 rounded-2xl bg-white dark:bg-cacao-850 border border-pastel-sandDark dark:border-cacao-800 shadow-soft flex items-center gap-3.5 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pastel-sand dark:bg-cacao-900 shrink-0 border border-pastel-sandDark dark:border-cacao-700">
                      <Image
                        src={item.product.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80'}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-sucrenita-900 dark:text-cacao-100 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-sucrenita-500 dark:text-cacao-300 mt-0.5">
                        {formatPrice(numericPrice)} c/u
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center gap-2 bg-pastel-sand/60 dark:bg-cacao-800 rounded-lg p-1 border border-pastel-sandDark dark:border-cacao-700">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            aria-label="Disminuir cantidad"
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white dark:hover:bg-cacao-700 text-sucrenita-700 dark:text-cacao-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-sucrenita-900 dark:text-cacao-100 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Aumentar cantidad"
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white dark:hover:bg-cacao-700 text-sucrenita-700 dark:text-cacao-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-xs text-sucrenita-900 dark:text-cacao-50">
                          Bs {itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Quitar ${item.product.name}`}
                      className="p-1.5 text-sucrenita-400 dark:text-cacao-300 hover:text-pastel-peachText dark:hover:text-amber-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 border-t border-pastel-sandDark dark:border-cacao-800 bg-pastel-sand/30 dark:bg-cacao-850/80 space-y-3.5">
              <div className="p-3 rounded-2xl bg-pastel-amber/40 dark:bg-amber-950/40 border border-pastel-amberBorder/60 dark:border-amber-800/60 text-[11px] text-sucrenita-800 dark:text-amber-100 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-pastel-amberText dark:text-amber-300 shrink-0" />
                  <span>
                    Aceptamos <strong>Simple QR</strong> sin comisiones y <strong>PayPal</strong> internacional.
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs font-medium text-sucrenita-600 dark:text-cacao-300">
                  Total a pagar:
                </span>
                <span className="font-serif text-2xl font-bold text-sucrenita-900 dark:text-cacao-50">
                  Bs {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsQROpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-pastel-amber hover:bg-pastel-sandDark dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-sucrenita-900 dark:text-amber-100 border border-pastel-amberBorder dark:border-amber-800/70 font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <QrCode className="w-4 h-4 text-pastel-amberText dark:text-amber-300" />
                  <span>Pagar con Simple QR (Bancos de Bolivia)</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#1F7A4C] hover:bg-[#19653E] text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Pedir por WhatsApp (Atención Directa)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsPayPalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#003087] hover:bg-[#002266] text-white font-semibold text-xs tracking-wide shadow-soft transition-all"
                >
                  <PayPalIcon className="w-4 h-4" />
                  <span>Pagar con PayPal / Tarjeta Internacional</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-sucrenita-500 dark:text-cacao-300 hover:text-pastel-peachText dark:hover:text-amber-400 transition-colors"
                  >
                    Vaciar lista
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-[11px] text-sucrenita-700 dark:text-cacao-200 hover:text-sucrenita-900 dark:hover:text-cacao-50 font-medium transition-colors"
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
