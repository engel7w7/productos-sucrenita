export type OrderPaymentMethod = 'SIMPLE_QR' | 'PAYPAL' | 'WHATSAPP';
export type OrderStatus = 'PENDIENTE' | 'PAGADO' | 'EN_CAMINO' | 'ENTREGADO';

export interface OrderItemRecord {
  name: string;
  quantity: number;
  priceBob: number;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  paymentMethod: OrderPaymentMethod;
  status: OrderStatus;
  items: OrderItemRecord[];
  totalBob: number;
  totalUsd?: number;
  exchangeRateUsed?: number;
  createdAt: string;
}

const ORDERS_STORAGE_KEY = 'sucrenita_orders_records';

const DEMO_ORDERS: OrderRecord[] = [
  {
    id: 'PS-PAYPAL-884129',
    customerName: 'Carlos Eduardo Mendoza',
    customerPhone: '+591 72891044',
    customerCity: 'Sucre',
    customerAddress: 'Calle San Alberto N° 142, Zona San Roque',
    paymentMethod: 'PAYPAL',
    status: 'PAGADO',
    items: [
      { name: 'Ají Colorado Seleccionado en Vaina (1 kg)', quantity: 2, priceBob: 45.0 },
      { name: 'Maní Molido Tradicional para Sopa (500g)', quantity: 3, priceBob: 18.0 },
    ],
    totalBob: 144.0,
    totalUsd: 11.52,
    exchangeRateUsed: 12.50,
    createdAt: '02/11/2026, 14:32',
  },
  {
    id: 'PS-QR-619023',
    customerName: 'Mariana Flores Soliz',
    customerPhone: '+591 71189420',
    customerCity: 'Sucre',
    customerAddress: 'Av. Las Delicias N° 45, Barrio Petrolero',
    paymentMethod: 'SIMPLE_QR',
    status: 'EN_CAMINO',
    items: [
      { name: 'Chicharrón Artesanal en Tira (13 unidades)', quantity: 2, priceBob: 25.0 },
      { name: 'Habas Saladas Fritas (26 unidades)', quantity: 1, priceBob: 20.0 },
    ],
    totalBob: 70.0,
    createdAt: '02/11/2026, 17:15',
  },
  {
    id: 'PS-QR-410982',
    customerName: 'Ramiro Justiniano Peñaranda',
    customerPhone: '+591 76012499',
    customerCity: 'Santa Cruz de la Sierra',
    customerAddress: 'Envío por flota terminal Bimodal - Encomienda al vacío',
    paymentMethod: 'SIMPLE_QR',
    status: 'PAGADO',
    items: [
      { name: 'Ají Colorado Primera Calidad Quintal', quantity: 1, priceBob: 650.0 },
    ],
    totalBob: 650.0,
    createdAt: '01/11/2026, 19:40',
  },
];

export function getOrders(): OrderRecord[] {
  if (typeof window === 'undefined') {
    return DEMO_ORDERS;
  }
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(DEMO_ORDERS));
      return DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
  }
  return DEMO_ORDERS;
}

export function saveOrder(order: OrderRecord): OrderRecord[] {
  const current = getOrders();
  const exists = current.some((o) => o.id === order.id);
  const updated = exists
    ? current.map((o) => (o.id === order.id ? order : o))
    : [order, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sucrenita_orders_updated'));
    } catch {
    }
  }
  return updated;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): OrderRecord[] {
  const current = getOrders();
  const updated = current.map((o) => (o.id === orderId ? { ...o, status } : o));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sucrenita_orders_updated'));
    } catch {
    }
  }
  return updated;
}

export function deleteOrder(orderId: string): OrderRecord[] {
  const current = getOrders();
  const updated = current.filter((o) => o.id !== orderId);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sucrenita_orders_updated'));
    } catch {
    }
  }
  return updated;
}

