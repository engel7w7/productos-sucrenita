declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-488V6796W5';

export function pageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, params);
  }
}

export function trackViewItem(product: {
  id: string;
  name: string;
  price: string | number;
  category?: string;
}) {
  trackEvent('view_item', {
    currency: 'BOB',
    value: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'General',
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        quantity: 1,
      },
    ],
  });
}

export function trackAddToCart(item: {
  id: string;
  name: string;
  price: string | number;
  quantity: number;
}) {
  const priceNum = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
  trackEvent('add_to_cart', {
    currency: 'BOB',
    value: priceNum * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: priceNum,
        quantity: item.quantity,
      },
    ],
  });
}

export function trackBeginCheckout(details: {
  paymentMethod: 'PAYPAL' | 'SIMPLE_QR' | 'WHATSAPP';
  totalBob: number;
  itemCount: number;
}) {
  trackEvent('begin_checkout', {
    currency: 'BOB',
    value: details.totalBob,
    payment_method: details.paymentMethod,
    item_count: details.itemCount,
  });
}

export function trackPurchase(details: {
  transactionId: string;
  valueBob: number;
  valueUsd?: number;
  paymentMethod: 'PAYPAL' | 'SIMPLE_QR' | 'WHATSAPP';
  items: Array<{ name: string; quantity: number; priceBob: number }>;
}) {
  trackEvent('purchase', {
    transaction_id: details.transactionId,
    currency: details.paymentMethod === 'PAYPAL' ? 'USD' : 'BOB',
    value: details.paymentMethod === 'PAYPAL' && details.valueUsd ? details.valueUsd : details.valueBob,
    payment_type: details.paymentMethod,
    items: details.items.map((i) => ({
      item_name: i.name,
      quantity: i.quantity,
      price: i.priceBob,
    })),
  });
}

export function trackWhatsAppContact(details: {
  productName?: string;
  price?: string | number;
  source: 'product_detail' | 'navbar' | 'hero' | 'footer';
}) {
  trackEvent('generate_lead', {
    event_category: 'contact',
    event_label: details.productName || 'Consulta General',
    value: details.price ? (typeof details.price === 'string' ? parseFloat(details.price) : details.price) : 0,
    currency: 'BOB',
    contact_method: 'whatsapp',
    source: details.source,
  });
}
