import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.routes';
import { productsRouter } from './routes/products.routes';
import { paymentsRouter } from './routes/payments.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.API_URL || `http://localhost:${PORT}`;

// Configuración CORS
const corsOrigin = process.env.FRONTEND_URL || '*';
app.use(
  cors({
    origin: corsOrigin === '*' ? true : [corsOrigin, 'http://localhost:3000', 'https://sucrenita-web.onrender.com'],
    credentials: true,
  })
);

// Middleware para capturar Raw Body (indispensable para firmas criptográficas de webhooks de pagos)
// Se conserva tanto en req.body (si es webhook raw) como en (req as any).rawBody
app.use(
  express.json({
    verify: (req: Request & { rawBody?: Buffer }, _res: Response, buf: Buffer) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/', healthRouter); // Expone GET /health
app.use('/api/products', productsRouter); // Expone GET /api/products y GET /api/products/:slug
app.use('/api/payments', paymentsRouter); // Expone POST /api/payments/webhook

// Ruta raíz informativa
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Productos Sucreñita API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/health',
      products: '/api/products',
      webhook: '/api/payments/webhook',
    },
  });
});

// Manejador 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// Manejador global de errores
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log('===============================================');
  console.log(`🚀 Sucrenita API Server corriendo en puerto ${PORT}`);
  console.log(`📍 Salud:     ${BASE_URL}/health`);
  console.log(`📦 Productos: ${BASE_URL}/api/products`);
  console.log(`💳 Webhook:   ${BASE_URL}/api/payments/webhook`);
  console.log('===============================================');
});

export default app;
