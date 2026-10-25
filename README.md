# Productos Sucreñita - Catalogo Web y E-Commerce Artesanal

Plataforma de comercio electronico y catalogo digital para el negocio familiar "Productos Sucreñita", dividida en dos lineas comerciales:

1. Abarrotes y Condimentos: Mani crudo y molido especial para sopa de mani, ajies colorados y amarillos molidos (con y sin picante) y condimentos criollos.
2. Snacks Artesanales: Chicharrones crocantes, mani dulce garrapinado y habas fritas con sal marina.

Implementa un modelo de catalogo web y venta directa al consumidor (B2C) con atencion personalizada via WhatsApp Business y cobros modernos mediante codigos QR (Simple QR).

---

## Tecnologias Utilizadas

### Backend

- Node.js con Express y TypeScript.
- Prisma ORM para el modelado de datos y migraciones.
- Base de datos relacional PostgreSQL alojada en Supabase (compatible con Transaction Pooler y conexion directa).
- Endpoint preparado para recepcion de webhooks de pagos (soporte para lectura de cuerpo en crudo / raw body).

### Frontend

- Next.js (App Router) con TypeScript.
- Tailwind CSS para la interfaz y sistema de diseno responsive.
- Renderizado del lado del servidor (SSR) y generacion estatica incremental (ISR).
- Metadatos dinamicos (generateMetadata), integracion de datos estructurados con Schema.org (JSON-LD para productos) y generacion automatica de sitemap.xml y robots.txt.

### Infraestructura y Calidad

- Integracion continua con GitHub Actions para validacion automatica de tipos y compilacion en cada push o pull request.
- Manifiesto de despliegue automatizado con Render Blueprint (render.yaml).

---

## Estructura del Repositorio

```
productos-sucrenita/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de integracion continua (GitHub Actions)
├── backend/                     # API REST del sistema
│   ├── prisma/
│   │   ├── schema.prisma        # Definicion de modelos (Category, Product, Order, OrderItem)
│   │   └── seed.ts              # Carga inicial de categorias y productos de prueba
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts        # Instancia singleton de PrismaClient
│   │   ├── routes/
│   │   │   ├── health.routes.ts # Ruta de verificacion de salud (GET /health)
│   │   │   ├── products.routes.ts # Rutas del catalogo (GET /api/products, /api/products/:slug)
│   │   │   └── payments.routes.ts # Ruta receptora de webhooks (POST /api/payments/webhook)
│   │   └── index.ts             # Punto de entrada de la aplicacion y middlewares
│   ├── .env.example             # Variables de entorno sugeridas
│   ├── package.json             # Dependencias y scripts del backend
│   └── tsconfig.json            # Configuracion de TypeScript
├── frontend/                    # Aplicacion web orientada al usuario
│   ├── src/
│   │   ├── app/
│   │   │   ├── catalogo/        # Pagina de catalogo con filtros por categoria
│   │   │   ├── productos/[slug]/# Detalle del producto con SEO y datos estructurados
│   │   │   ├── globals.css      # Estilos globales y tokens
│   │   │   ├── layout.tsx       # Estructura principal y metadatos base
│   │   │   ├── page.tsx         # Portada con productos destacados mediante SSR
│   │   │   ├── robots.ts        # Configuracion de robots.txt
│   │   │   └── sitemap.ts       # Generador de sitemap XML dinamico
│   │   ├── components/          # Componentes reutilizables (Navbar, Footer, ProductCard, JsonLd)
│   │   ├── lib/                 # Cliente de datos hacia la API y formateadores
│   │   └── types/               # Definiciones de tipos para entidades del negocio
│   ├── next.config.mjs          # Configuracion de Next.js y dominios de imagenes
│   ├── package.json             # Dependencias del frontend
│   └── tailwind.config.ts       # Configuracion del tema visual
├── .gitignore                   # Archivos y carpetas excluidos del control de versiones
├── README.md                    # Documentacion del proyecto
└── render.yaml                  # Configuracion de infraestructura para Render
```

---

## Guia de Puesta en Marcha Local

### Requisitos previos

- Node.js version 18 o superior (recomendado Node.js 20 LTS o superior).
- Gestor de paquetes npm.
- Una cuenta en Supabase o una instancia local de PostgreSQL.

---

### Paso 1: Configuracion del Backend

1. Entra a la carpeta del backend e instala las dependencias:

   ```bash
   cd backend
   npm install
   ```

2. Crea tu archivo de variables de entorno a partir del archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   En Windows (PowerShell):

   ```powershell
   Copy-Item .env.example .env
   ```

3. Edita `.env` con las credenciales de tu base de datos:
   - `DATABASE_URL`: Cadena con el Transaction Pooler (puerto 6543 y parametro `?pgbouncer=true`).
   - `DIRECT_URL`: Cadena con conexion directa (puerto 5432) para ejecutar migraciones.

4. Sincroniza la estructura de la base de datos y genera el cliente de Prisma:

   ```bash
   npm run db:push
   ```

5. Opcionalmente, carga los datos iniciales de prueba (mani, ajies, chicharrones y snacks):

   ```bash
   npm run seed
   ```

6. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   El backend estara disponible en `http://localhost:10000`.

---

### Paso 2: Configuracion del Frontend

1. En una nueva terminal, entra a la carpeta del frontend e instala las dependencias:

   ```bash
   cd frontend
   npm install
   ```

2. Crea tu archivo `.env.local` si deseas cambiar las URLs por defecto:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:10000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Inicia la aplicacion en modo desarrollo:

   ```bash
   npm run dev
   ```

   Abre tu navegador en `http://localhost:3000`.

---

## Conexion con Supabase

Para utilizar Supabase como base de datos del proyecto:

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Dirigete a la seccion **Project Settings** > **Database** > **Connection string**.
3. Selecciona la pestana **URI**:
   - Copia la URL en modo **Transaction** y colocala en `DATABASE_URL`.
   - Copia la URL en modo **Session** (o conexion directa) y colocala en `DIRECT_URL`.
4. Ejecuta `npm run db:push` en la carpeta `backend` para aplicar los modelos a tu proyecto en la nube.

---

## Flujo de Trabajo con Ramas (Git Flow)

El proyecto mantiene dos ramas principales:

- `main`: Codigo estable listo para despliegues a produccion.
- `develop`: Rama base de integracion para nuevas caracteristicas, correcciones y pruebas.

Cada cambio que se incorpora a estas ramas es verificado automaticamente por el pipeline de GitHub Actions antes de ser desplegado.

---

## Seguridad y Certificados SSL/TLS

El proyecto incorpora mecanismos de seguridad y cifrado para transmision segura HTTPS:

1. **Let's Encrypt Automatizado:**
   - En Render y Vercel, la emision y renovacion de certificados Let's Encrypt es automatica y transparente.
   - Para despliegues en VPS (Ubuntu/Debian) mediante Nginx, se incluye la configuracion base en `deploy/nginx/sucrenita.conf` y soporte para renovacion con Certbot (`sudo certbot --nginx`).

2. **ZeroSSL (zerossl.com):**
   - El backend Express incluye soporte para la validacion del desafio HTTP-01 sirviendo archivos desde `backend/public/.well-known/acme-challenge/`.
   - Se documenta el procedimiento para concatenar `certificate.crt` y `ca_bundle.crt` en `deploy/ssl/SSL_GUIDE.md`.

3. **Certificados Autofirmados:**
   - Para entornos locales o servidores de evaluacion interna, se incluyen scripts generadores con OpenSSL:
     - Linux/macOS: `deploy/ssl/generate-self-signed.sh`
     - Windows (PowerShell): `deploy/ssl/generate-self-signed.ps1`

4. **Cabeceras de Seguridad y HSTS:**
   - El servidor Express utiliza `helmet` para inyectar cabeceras `Strict-Transport-Security` (HSTS de 1 ano con subdominios y precarga), proteccion contra sniffing de tipos MIME y deteccion fiable de proxies inversos (`trust proxy`).

---

## Analitica Web con Google Analytics 4 (GA4)

La aplicacion frontend integra Google Analytics para medir visitas e interacciones clave:

1. **Configuracion:**
   - Define tu Measurement ID en la variable de entorno `NEXT_PUBLIC_GA_ID` (ej: `G-XXXXXXXXXX`).
   - El componente `GoogleAnalytics` inyecta las etiquetas con estrategia `afterInteractive` para no penalizar el rendimiento ni el Core Web Vitals.

2. **Seguimiento de Conversiones (Eventos Personalizados):**
   - Visualizacion de productos: evento `view_item` con nombre, categoria y precio.
   - Contactos comerciales: evento `generate_lead` al presionar cualquier boton de pedido por WhatsApp, capturando el origen del clic y el producto consultado.

