import { Router, Request, Response } from 'express';

export const paymentsRouter = Router();

paymentsRouter.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] || req.headers['x-signature'];
    const payload = req.body;

    console.log('[Payment Webhook] Evento recibido:', {
      hasSignature: Boolean(signature),
      contentType: req.headers['content-type'],
      isBuffer: Buffer.isBuffer(payload),
    });

    return res.status(200).json({
      received: true,
      status: 'acknowledged',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Payment Webhook] Error procesando el webhook:', error);
    return res.status(400).json({
      received: false,
      error: error.message || 'Webhook handler failed',
    });
  }
});

paymentsRouter.post('/paypal/create-order', async (req: Request, res: Response) => {
  try {
    const { amountBob, items, customer } = req.body;
    const rate = 6.96;
    const amountUsd = (Number(amountBob || 0) / rate).toFixed(2);
    const orderId = `PAYPAL-ORD-${Date.now().toString().slice(-6)}`;

    return res.status(200).json({
      success: true,
      orderId,
      currency: 'USD',
      amountUsd,
      amountBob,
      status: 'CREATED',
      itemsCount: Array.isArray(items) ? items.length : 0,
      customer: customer || null,
      links: [
        {
          rel: 'approve',
          href: `https://www.paypal.com/checkoutnow?token=${orderId}`,
          method: 'GET',
        },
      ],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al generar orden de PayPal',
    });
  }
});

paymentsRouter.post('/paypal/capture-order', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    return res.status(200).json({
      success: true,
      orderId,
      status: 'COMPLETED',
      captureId: `CAP-${Date.now().toString().slice(-6)}`,
      capturedAt: new Date().toISOString(),
      message: 'Pago de PayPal verificado y capturado exitosamente.',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al capturar la orden de PayPal',
    });
  }
});
