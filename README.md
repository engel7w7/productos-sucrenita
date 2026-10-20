# Sucrenita — Catálogo Web & E-Commerce Artesanal

Monorepo con arquitectura moderna full-stack para el catálogo web y tienda de **Sucrenita**

---

## Arquitectura del Sistema

```
productos-sucrenita/
├── render.yaml               # Configuración Blueprint para despliegue en Render (PostgreSQL + API + Next.js)
├── .gitignore                # Reglas de exclusión para Git
├── README.md                 # Documentación técnica del proyecto
│
├── backend/                  # API REST (Node.js + Express + TypeScript + Prisma ORM)
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos de BD: Category, Product, Order, OrderItem
│   │   └── seed.ts           # Datos semilla iniciales (productos y categorías)
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts     # Instancia Singleton de PrismaClient
│   │   ├── routes/
│   │   │   ├── health.routes.ts    # GET /health
│   │   │   ├── products.routes.ts  # GET /api/products, GET /api/products/:slug
│   │   │   └── payments.routes.ts  # POST /api/payments/webhook (con Raw Body)
│   │   └── index.ts          # Servidor Express, CORS y middleware
│   ├── .env                  # Variables locales provisionales
│   ├── .env.example          # Plantilla de variables de entorno
│   ├── package.json          # Scripts: dev, build, start, prisma:*
│   └── tsconfig.json         # Configuración estricta de TypeScript
│
└── frontend/                 # Aplicación Web SSR/SSG (Next.js 14 App Router + Tailwind CSS)
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx              # Root Layout, tipografías y metadatos globales
    │   │   ├── globals.css             # Tailwind CSS y tokens de diseño
    │   │   ├── page.tsx                # Página de inicio con SSR consumiendo API
    │   │   ├── catalogo/
    │   │   │   └── page.tsx            # Catálogo interactivo con filtrado por categoría
    │   │   ├── productos/[slug]/
    │   │   │   └── page.tsx            # SEO dinámico (generateMetadata) + Schema.org JSON-LD
    │   │   ├── sitemap.ts              # Generador automático de Sitemap XML
    │   │   └── robots.ts               # Configuración robots.txt
    │   ├── components/
    │   │   ├── Navbar.tsx              # Barra de navegación receptiva
    │   │   ├── Footer.tsx              # Pie de página artesanal
    │   │   ├── ProductCard.tsx         # Tarjeta de producto optimizada
    │   │   └── JsonLd.tsx              # Inyector de datos estructurados para Googlebot
    │   ├── lib/
    │   │   ├── api.ts                  # Cliente de datos con revalidación ISR y fallback
    │   │   └── utils.ts                # Formateo de moneda (BOB) y utilidades de estilo
    │   └── types/
    │       └── index.ts                # Tipos TypeScript para entidades de negocio
    ├── next.config.mjs
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── .env.local
    └── package.json
```

---

## Despliegue en Render (`render.yaml`)

El archivo [render.yaml](render.yaml) define automáticamente:

1. **Base de Datos PostgreSQL Gestionada:** `sucrenita-db` (plan free).
2. **API Backend:** `sucrenita-api` (ejecuta `npm install && npx prisma generate && npm run build` y se conecta mediante `DATABASE_URL`).
3. **Frontend Next.js:** `sucrenita-web` (ejecuta `npm install && npm run build` en modo Node SSR en el puerto 3000).

---

## Ejecución Local

### 1. Backend (`/backend`)

```bash
cd backend
npm install
npx prisma generate

# Levantar servidor en desarrollo con recarga en caliente:
npm run dev

# Para sincronizar esquema con una base de datos local o remota:
npx prisma db push

# Para cargar los productos iniciales de prueba:
npm run prisma:seed

# Compilar para producción:
npm run build
```

### 2. Frontend (`/frontend`)

```bash
cd frontend
npm install

# Levantar entorno de desarrollo Next.js:
npm run dev

# Compilar aplicación optimizada para producción:
npm run build
npm start
```

---

## ⚡ Conexión a Base de Datos con Supabase

1. Crea tu cuenta gratuita en [supabase.com](https://supabase.com).
2. Crea un proyecto nuevo (`productos-sucrenita`).
3. Ve a **Project Settings** > **Database** > sección **Connection string**:
   - En la pestaña **URI**, copia la cadena con modo **Transaction** (asígnala a `DATABASE_URL` en tu `.env` y en las variables de Render).
   - Copia la cadena con modo **Session** o directa (asígnala a `DIRECT_URL` para que Prisma ejecute migraciones sin conflicto de pgbouncer).
4. Para sincronizar las tablas y cargar el catálogo inicial:
   ```bash
   cd backend
   npm run db:push
   npm run seed
   ```

