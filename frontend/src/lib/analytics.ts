declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function pageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
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
