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
