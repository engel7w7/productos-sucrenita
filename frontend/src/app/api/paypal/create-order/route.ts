import { NextResponse } from 'next/server';
import { getPayPalAccessToken, getPayPalConfig } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amountBob = Number(body.amountBob || 0);
    const exchangeRate = Number(body.exchangeRate || 12.5);
    const safeRate = exchangeRate > 0 ? exchangeRate : 12.5;
    const totalUsd = Math.max(0.01, amountBob / safeRate).toFixed(2);

    const { apiBase, hasServerCredentials, env } = getPayPalConfig();

    if (!hasServerCredentials) {
      return NextResponse.json({
        success: true,
        mode: 'client_sdk',
        env,
        totalUsd,
        amountBob: Number(amountBob.toFixed(2)),
        rateUsed: safeRate,
      });
    }

    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'Productos Sucreñita - Pedido Tienda Virtual (Sucre, Bolivia)',
          custom_id: body.customer?.phone || 'productos-sucrenita',
          amount: {
            currency_code: 'USD',
            value: totalUsd,
          },
        },
      ],
      application_context: {
        brand_name: 'Productos Sucreñita',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    };

    const res = await fetch(`${apiBase}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok || !data.id) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'No se pudo crear la orden en PayPal',
        },
        { status: res.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mode: 'server_rest',
      env,
      orderId: data.id,
      status: data.status,
      totalUsd,
      rateUsed: safeRate,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error interno al inicializar pago con PayPal';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
