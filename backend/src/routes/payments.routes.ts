import { Router, Request, Response } from 'express';

export const paymentsRouter = Router();

/**
 * POST /api/payments/webhook
 * Preparado para proveedores de pago (Stripe, Mercado Pago, etc.)
 * Soporta la verificación de firmas criptográficas leyendo el raw body almacenado en req.body
 */
paymentsRouter.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] || req.headers['x-signature'];
    const payload = req.body;

    // Log para auditoría y desarrollo
    console.log('[Payment Webhook] Evento recibido:', {
      hasSignature: Boolean(signature),
      contentType: req.headers['content-type'],
      isBuffer: Buffer.isBuffer(payload),
    });

    // TODO: Implementar lógica de validación de firma y actualización de Order a PAID/FAILED
    // Ejemplo:
    // const event = verifyWebhookSignature(payload, signature, WEBHOOK_SECRET);
    // if (event.type === 'payment_intent.succeeded') {
    //   await prisma.order.update({ where: { id: event.data.orderId }, data: { status: 'PAID' } });
    // }

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
