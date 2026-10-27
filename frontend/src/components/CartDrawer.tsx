'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, QrCode, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { trackWhatsAppContact } from '@/lib/analytics';

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

  if (!isOpen) return null;

  const handleCheckout = () => {
    trackWhatsAppContact({
      source: 'navbar',
      productName: `Pedido Multiple (${totalItems} items)`,
      price: totalPrice,
    });
  };

  return (
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
                  : `${totalItems} ${totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}`}
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
                <span>Ver catálogo disponible</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice =
                typeof item.product.price === 'string'
                  ? parseFloat(item.product.price)
                  : item.product.price;
              const subtotal = itemPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-pastel-sand/40 border border-pastel-sandDark/70 flex gap-3.5 items-center"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-pastel-sandDark">
                    {item.product.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-pastel-peachText font-serif">
                        Sucreñita
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs font-bold text-sucrenita-900 line-clamp-1">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-sucrenita-500 mt-0.5">
                      {formatPrice(item.product.price)} c/u
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center gap-1.5 bg-white rounded-full border border-pastel-sandDark px-2 py-0.5 shadow-soft">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Restar una unidad"
                          className="p-1 text-sucrenita-600 hover:text-sucrenita-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-sucrenita-900 px-1.5 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Sumar una unidad"
                          className="p-1 text-sucrenita-600 hover:text-sucrenita-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-xs text-sucrenita-900">
                        Bs {subtotal.toFixed(2)}
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
          <div className="p-5 border-t border-pastel-sandDark bg-pastel-sand/30 space-y-4">
            <div className="p-3 rounded-2xl bg-pastel-amber/40 border border-pastel-amberBorder/60 text-[11px] text-sucrenita-800 flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-pastel-amberText shrink-0" />
              <span>
                Paga de inmediato escaneando el <strong>Simple QR</strong> al confirmar tu pedido.
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs font-medium text-sucrenita-600">Total a pagar:</span>
              <span className="font-serif text-2xl font-bold text-sucrenita-900">
                Bs {totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm tracking-wide shadow-soft-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar pedido por WhatsApp</span>
              </a>

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
  );
}
