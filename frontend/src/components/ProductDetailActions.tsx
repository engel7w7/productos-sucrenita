'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingBag, QrCode, Check } from 'lucide-react';
import { trackWhatsAppContact } from '@/lib/analytics';
import { PayPalCheckoutModal } from './PayPalCheckoutModal';
import { SimpleQRModal } from './SimpleQRModal';
import { PayPalIcon, WhatsAppIcon } from './SocialIcons';

interface ProductDetailActionsProps {
  product: Product;
  whatsappUrl: string;
}

export function ProductDetailActions({
  product,
  whatsappUrl,
}: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart, openCart } = useCart();

  const priceNum =
    typeof product.price === 'string'
      ? parseFloat(product.price)
      : product.price;
  const currentSubtotal = priceNum * quantity;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    const subtotal = currentSubtotal.toFixed(2);
    const customMessage = `¡Hola Doña Sucreñita! Me interesa pedir ${quantity} unidad(es) de "${product.name}" (Total: Bs ${subtotal}) desde su catálogo web. ¿Tienen disponible para coordinar la entrega y el cobro por Simple QR?`;
    const customUrl = `https://wa.me/59171152182?text=${encodeURIComponent(
      customMessage
    )}`;

    trackWhatsAppContact({
      productName: product.name,
      price: subtotal,
      source: 'product_detail',
    });

    window.open(customUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-sucrenita-700 dark:text-cacao-200">
            Cantidad:
          </span>
          <div className="inline-flex items-center bg-white dark:bg-cacao-850 rounded-2xl border border-pastel-sandDark dark:border-cacao-700 p-1 shadow-soft">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Disminuir cantidad"
              className="p-2 text-sucrenita-600 dark:text-cacao-300 hover:text-sucrenita-900 dark:hover:text-cacao-50 rounded-xl hover:bg-pastel-sand dark:hover:bg-cacao-800 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-sm text-sucrenita-900 dark:text-cacao-50 px-4 min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar cantidad"
              className="p-2 text-sucrenita-600 dark:text-cacao-300 hover:text-sucrenita-900 dark:hover:text-cacao-50 rounded-xl hover:bg-pastel-sand dark:hover:bg-cacao-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs text-sucrenita-500 dark:text-cacao-300">
            Subtotal:{' '}
            <strong className="font-serif text-sm text-sucrenita-800 dark:text-cacao-100">
              Bs {currentSubtotal.toFixed(2)}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold transition-all border ${
              added
                ? 'bg-pastel-sage text-pastel-sageText border-pastel-sageBorder dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/80 shadow-soft scale-105'
                : 'bg-pastel-amber/90 hover:bg-pastel-amber text-pastel-amberText border border-pastel-amberBorder dark:bg-amber-950/60 dark:hover:bg-amber-900/60 dark:text-amber-300 dark:border-amber-800/70 shadow-soft hover:shadow-soft-lg'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-pastel-sageText" />
                <span>¡Agregado a la bolsita!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar a mi bolsita</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold bg-[#1F7A4C] hover:bg-[#19653E] text-white shadow-soft hover:shadow-soft-lg transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Pedir directo por WhatsApp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsQROpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold bg-white dark:bg-cacao-850 hover:bg-pastel-amber/40 dark:hover:bg-cacao-800 text-sucrenita-900 dark:text-cacao-100 border border-pastel-sandDark dark:border-cacao-700 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <QrCode className="w-4 h-4 text-pastel-amberText" />
            <span>Pagar con Simple QR</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPayPalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold bg-[#0070BA] hover:bg-[#003087] text-white shadow-soft hover:shadow-soft-lg transition-all"
          >
            <PayPalIcon className="w-4 h-4" />
            <span>PayPal / Tarjeta de Crédito</span>
          </button>
        </div>
      </div>

      <SimpleQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        items={[{ product, quantity }]}
        totalBob={currentSubtotal}
        onSuccessClearCart={() => {}}
      />

      <PayPalCheckoutModal
        isOpen={isPayPalOpen}
        onClose={() => setIsPayPalOpen(false)}
        items={[{ product, quantity }]}
        totalBob={currentSubtotal}
        onSuccessClearCart={() => {}}
      />
    </>
  );
}
