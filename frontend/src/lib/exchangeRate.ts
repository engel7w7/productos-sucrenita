export interface ExchangeRateConfig {
  rate: number;
  source: string;
  note: string;
  lastUpdated: string;
}

export const DEFAULT_EXCHANGE_CONFIG: ExchangeRateConfig = {
  rate: 12.50,
  source: 'Tipo de Cambio Referencial Paralelo / Banco Central de Bolivia (BCB) - Ministerio de Economía',
  note: 'Cotización referencial estimada para liquidación de compras internacionales y pasarelas digitales (PayPal)',
  lastUpdated: '02/11/2026',
};

const STORAGE_KEY = 'sucrenita_exchange_rate_config';

export function getExchangeRateConfig(): ExchangeRateConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_EXCHANGE_CONFIG;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EXCHANGE_CONFIG;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.rate === 'number' && parsed.rate > 0) {
      return {
        ...DEFAULT_EXCHANGE_CONFIG,
        ...parsed,
      };
    }
  } catch {
  }
  return DEFAULT_EXCHANGE_CONFIG;
}

export function saveExchangeRateConfig(rate: number, note?: string): ExchangeRateConfig {
  const current = getExchangeRateConfig();
  const updated: ExchangeRateConfig = {
    ...current,
    rate: Number(rate),
    note: note || current.note,
    lastUpdated: new Date().toLocaleDateString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sucrenita_exchange_rate_updated'));
    } catch {
    }
  }

  return updated;
}

export function convertBobToUsd(
  amountBob: number,
  customRate?: number
): {
  amountUsd: number;
  formattedUsd: string;
  rateApplied: number;
} {
  const config = getExchangeRateConfig();
  const rate = customRate && customRate > 0 ? customRate : config.rate;
  const amountUsd = Number((amountBob / rate).toFixed(2));
  return {
    amountUsd,
    formattedUsd: amountUsd.toFixed(2),
    rateApplied: rate,
  };
}

