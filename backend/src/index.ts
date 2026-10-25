import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.routes';
import { productsRouter } from './routes/products.routes';
import { paymentsRouter } from './routes/payments.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.API_URL || `http://localhost:${PORT}`;

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const proto = req.headers['x-forwarded-proto'];
    if (proto && proto !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

const corsOrigin = process.env.FRONTEND_URL || '*';
app.use(
  cors({
    origin: corsOrigin === '*' ? true : [corsOrigin, 'http://localhost:3000', 'https://sucrenita-web.onrender.com'],
    credentials: true,
  })
);

app.use(
  '/.well-known/acme-challenge',
  express.static(path.join(__dirname, '../public/.well-known/acme-challenge'))
);

app.use(
  express.json({
    verify: (req: Request & { rawBody?: Buffer }, _res: Response, buf: Buffer) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api/payments', paymentsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const sslKeyPath = process.env.SSL_KEY_PATH || path.join(__dirname, '../../deploy/ssl/private.key');
const sslCertPath = process.env.SSL_CERT_PATH || path.join(__dirname, '../../deploy/ssl/fullchain.crt');
const useSsl = process.env.USE_SSL === 'true' && fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath);

if (useSsl) {
  const httpsOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('===============================================');
    console.log(`Sucrenita API Server corriendo en puerto ${PORT} con SSL/TLS`);
    console.log(`Salud:     ${BASE_URL}/health`);
    console.log(`Productos: ${BASE_URL}/api/products`);
    console.log(`Webhook:   ${BASE_URL}/api/payments/webhook`);
    console.log('Seguridad: HSTS & Proxy Trust activados');
    console.log('===============================================');
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log('===============================================');
    console.log(`Sucrenita API Server corriendo en puerto ${PORT}`);
    console.log(`Salud:     ${BASE_URL}/health`);
    console.log(`Productos: ${BASE_URL}/api/products`);
    console.log(`Webhook:   ${BASE_URL}/api/payments/webhook`);
    console.log('Seguridad: HSTS & Proxy Trust activados');
    console.log('===============================================');
  });
}

export default app;
