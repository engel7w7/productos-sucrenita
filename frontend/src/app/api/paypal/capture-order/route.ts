import { NextResponse } from 'next/server';
import { getPayPalAccessToken, getPayPalConfig } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, captureDetails } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'ID de orden de PayPal requerido' },
        { status: 400 }
      );
    }

    const { apiBase, hasServerCredentials, env } = getPayPalConfig();

    if (!hasServerCredentials) {
      const sdkCaptureId =
        captureDetails?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
        captureDetails?.id ||
        orderId;

      return NextResponse.json({
        success: true,
        mode: 'client_sdk',
        env,
        orderId,
        captureId: sdkCaptureId,
        status: captureDetails?.status || 'COMPLETED',
        payerEmail: captureDetails?.payer?.email_address || null,
        capturedAt: new Date().toISOString(),
      });
    }

    const accessToken = await getPayPalAccessToken();

    const res = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'No se pudo capturar el pago en PayPal',
        },
        { status: res.status || 500 }
      );
    }

    const captureId =
      data.purchase_units?.[0]?.payments?.captures?.[0]?.id || data.id;

    return NextResponse.json({
      success: true,
      mode: 'server_rest',
      env,
      orderId: data.id,
      captureId,
      status: data.status,
      payerEmail: data.payer?.email_address || null,
      capturedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error al capturar orden en PayPal';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
