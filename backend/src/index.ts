import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.routes';
import { productsRouter } from './routes/products.routes';
import { paymentsRouter } from './routes/payments.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.API_URL || `http://localhost:${PORT}`;

// Configuración de confianza de proxy inverso (Render, Vercel, Nginx, Cloudflare)
// Esencial para detectar conexiones seguras HTTPS (req.secure, x-forwarded-proto)
app.set('trust proxy', 1);

// Seguridad HTTP con Helmet (HSTS, X-Content-Type-Options, etc.)
app.use(
  helmet({
    contentSecurityPolicy: false, // Permitir consumo de API cross-origin
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000, // 1 año de HSTS (HTTP Strict Transport Security)
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Forzar redirección a HTTPS en producción si el tráfico llega vía HTTP
if (process.env.NODE_ENV === 'production') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const proto = req.headers['x-forwarded-proto'];
    if (proto && proto !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Configuración CORS
const corsOrigin = process.env.FRONTEND_URL || '*';
app.use(
  cors({
    origin: corsOrigin === '*' ? true : [corsOrigin, 'http://localhost:3000', 'https://sucrenita-web.onrender.com'],
    credentials: true,
  })
);

// Validación de dominio para emisión y renovación de certificados SSL (Let's Encrypt / ZeroSSL)
// Endpoint público para el desafío HTTP-01 (/.well-known/acme-challenge/<token>)
app.use(
  '/.well-known/acme-challenge',
  express.static(path.join(__dirname, '../public/.well-known/acme-challenge'))
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

// Ruta raíz neutra y minimalista
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
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
  console.log('🔒 Seguridad: HSTS & Proxy Trust activados');
  console.log('===============================================');
});

export default app;
