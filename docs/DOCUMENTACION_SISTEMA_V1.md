# Documentación Técnica del Sistema - Productos Sucreñita
## Versión 1.0 (Producción & Evaluación Académica)

---

### Ficha Técnica del Proyecto

* **Nombre Comercial**: Productos Sucreñita
* **Giro de Negocio**: Abarrotes tradicionales de cocina chuquisaqueña (maní crudo, maní molido para sopa, ají colorado en batán, ají amarillo dulce) y snacks artesanales (chicharrón crocante, maní garrapiñado, habas fritas).
* **Ubicación Física**: Sucre, Chuquisaca, Estado Plurinacional de Bolivia.
* **Modelo de Negocio**: B2C (Directo al consumidor) y ventas por mayor a pensiones y restaurantes.
* **URL Oficial de Producción**: [https://productos-sucrenita.vercel.app/](https://productos-sucrenita.vercel.app/)
* **Repositorio de Código**: [https://github.com/engel7w7/productos-sucrenita](https://github.com/engel7w7/productos-sucrenita)
* **Stack Tecnológico**:
  * **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React Icons.
  * **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (Supabase) / SQLite.
  * **Pasarelas de Pago**: Simple QR (Red Bancaria de Bolivia) y PayPal Checkout Internacional (USD).
  * **Infraestructura Cloud**: Vercel Edge Network, Supabase Managed Database, Render Cloud Services, Nginx Reverse Proxy (Entorno local SSL).

---

## Índice General de Módulos

1. Instalación en CMS y Dominio
2. Incorporación de SSL (Let's Encrypt, ZeroSSL y Certificado Autofirmado)
3. Incorporación de Google Analytics 4 (GA4)
4. Presencia Orgánica en Facebook e Instagram
5. Aplicación de Técnicas de SEO Avanzado y Geo-etiquetado
6. Vista Inicial Temática y Componentes Esenciales
7. Plugins Sociales Multicanal (WhatsApp, Messenger, Telegram, TikTok, Instagram)
8. Documentación de Arquitectura de Software
9. Pasarela de Pago PayPal
10. Canal de TikTok Oficial y Video Marketing para Atracción de Tráfico
11. Chat en Línea Interactivo y Preguntas Frecuentes
12. Mensajería Automatizada a WhatsApp
13. Contenido Final de la Plataforma y Políticas Comerciales
14. Panel de Administración y Gestión de Inventario
15. Identidad Visual Armoniosa y Paleta Artesanal Sucrense
16. Soporte de Modo Oscuro Adaptable (Dark Mode) y Prevención de FOUC

---

## 1. Instalación en CMS y Dominio

### 1.1 Configuración de Dominio y Entorno de Ejecución Local
El proyecto está configurado para operar 100% de manera **local** y autónoma (Frontend en http://localhost:3000, Backend en http://localhost:10000, y Nginx SSL local en https://localhost:8443 con los scripts iniciar-local.bat / iniciar-local.ps1):
* **Dominio**: `https://productos-sucrenita.vercel.app`
* **Enrutamiento DNS**:
  * Registro CNAME que apunta el host a los servidores Edge de Vercel (`cname.vercel-dns.com`).
  * Conectividad HTTPS forzada con cabecera HSTS (*HTTP Strict Transport Security*).
  * Soporte para compresión Brotli y Gzip a nivel de CDN.

### 1.2 Arquitectura Headless CMS / Catálogo
La plataforma utiliza una arquitectura desacoplada (*Headless*):
* El frontend en Next.js consulta la API REST de productos (`/api/products`) utilizando **ISR (Incremental Static Regeneration)** con revalidación periódica de 60 segundos (`revalidate: 60`).
* En caso de indisponibilidad temporal del backend, el frontend cuenta con un catálogo de respaldo local de alta fidelidad (`FALLBACK_PRODUCTS` en `frontend/src/lib/api.ts`) que garantiza 100% de disponibilidad (*Zero-Downtime*).
* La administración de productos, precios y categorías se gestiona mediante modelos Prisma (`Category`, `Product` y `User`) con serialización de precios decimales y control de inventario (`stock` y `isActive`).

---

## 2. Incorporación de SSL: Let's Encrypt, ZeroSSL y Certificado Autofirmado

El sistema implementa tres niveles de seguridad de capa de transporte (TLS/SSL):

### 2.1 Let's Encrypt (Producción Vercel & Render)
* Emisión y renovación automática de certificados X.509 mediante protocolo ACME v2.
* Directorio preparado para validación HTTP-01: `backend/public/.well-known/acme-challenge/`.
* Cifrado con algoritmos TLS 1.3 y suites seguras (ECDHE-ECDSA-AES128-GCM-SHA256).

### 2.2 ZeroSSL (Certificados Comerciales / Alternativos)
* Soporte para certificados emitidos por la autoridad ZeroSSL mediante validación CNAME en el panel DNS o carga del archivo de autenticación HTTP.
* Instalación del bundle completo (Certificado de dominio + Intermedio ZeroSSL CA + Root CA).

### 2.3 Certificado Autofirmado Local (Nginx Reverse Proxy)
Para pruebas en desarrollo local seguro (`https://localhost:8443`), se implementó la infraestructura de Nginx:
* **Archivo de Configuración Nginx**: `deploy/nginx/sucrenita.conf`.
* **Script de Generación PowerShell**: `deploy/ssl/generate-local-ssl.ps1`.
* **Script de Generación Node.js**: `deploy/ssl/generate-certs.js`.
* **Parámetros de Seguridad**: Clave privada RSA de 2048 bits protegida en `.gitignore` para prevenir fugas de secretos en el repositorio público.

---

## 3. Incorporación de Google Analytics 4 (GA4)

### 3.1 Identificador y Etiqueta Oficial
* **Measurement ID**: `G-488V6796W5`
* **Componente de Inyección**: `frontend/src/components/GoogleAnalytics.tsx`.
* **Carga Asíncrona**: Utiliza la directiva `next/script` con estrategia `afterInteractive` para no penalizar el *Largest Contentful Paint* (LCP).

### 3.2 Eventos Rastreados en Tiempo Real
La librería `frontend/src/lib/analytics.ts` centraliza el envío de eventos de comercio electrónico:
* `page_view`: Registro de navegación en cada ruta.
* `view_item`: Visualización de la ficha técnica de producto.
* `add_to_cart`: Adición de productos a la bolsita interactiva.
* `whatsapp_contact`: Clics en botones de WhatsApp con origen y monto en Bs.
* `paypal_checkout`: Inicio y confirmación de transacciones internacionales en USD.

---

## 4. Presencia Orgánica en Facebook e Instagram

Para promover el taller familiar sin incurrir en gasto publicitario de pago:
* **Página de Facebook Oficial**: `https://www.facebook.com/profile.php?id=61595923780807`
* **Perfil de Instagram Oficial**: `https://www.instagram.com/productossucrenita`
* **Botones para Compartir Productos**: Componente `ShareProductButtons.tsx` en cada ficha de producto (Facebook Sharer, Instagram directo y WhatsApp).
* **Integración en Schema**: Ambas redes sociales se encuentran registradas en el atributo `sameAs` del marcado estructurado Schema.org en `layout.tsx`.
* **Sección de Comunidad**: Bloque interactivo en la página de inicio que invita a los usuarios a unirse a la comunidad para recibir recetas tradicionales y avisos de tostados frescos.

---

## 5. Aplicación de Técnicas de SEO Avanzado y Geo-etiquetado

### 5.1 Marcado Estructurado JSON-LD (Schema.org)
* **Organización / Tienda Local**: Tipo `FoodEstablishment` y `Store` con nombre, logo, teléfono de atención, coordenadas geográficas, rango de precios y métodos de pago aceptados.
* **Ficha de Producto**: Tipo `Product` en `frontend/src/app/productos/[slug]/page.tsx` con nombre, descripción, imagen en alta resolución, precio en `BOB`, condición de producto nuevo (`NewCondition`) y estado de inventario (`InStock`).

### 5.2 Metadatos OpenGraph y Twitter Cards
* Previews optimizadas en resolución 1200x630 para WhatsApp, Facebook, Instagram y Twitter con tarjetas `summary_large_image`.

### 5.3 Geo-etiquetado Local
Etiquetas geoespaciales inyectadas en las cabeceras HTML para optimizar el posicionamiento en búsquedas locales de Chuquisaca y Bolivia:
* `geo.region`: `BO-H` (Chuquisaca)
* `geo.placename`: `Sucre`
* `geo.position`: `-19.0353;-65.2627`
* `ICBM`: `-19.0353, -65.2627`

### 5.4 Sitemap y Robots Dinámicos
* `frontend/src/app/sitemap.ts`: Genera automáticamente el índice XML de URLs canónicas.
* `frontend/src/app/robots.ts`: Instrucciones para motores de búsqueda con referencia al sitemap oficial.
* Protección de áreas privadas: `frontend/src/app/admin/layout.tsx` incluye metadatos específicos `robots: { index: false, follow: false }` para que los motores de búsqueda jamás indexen el panel administrativo o formularios internos.

---

## 6. Vista Inicial Temática y Componentes Interactivos Anti-IA

La interfaz fue diseñada con identidad propia de taller artesanal chuquisaqueño, descartando patrones genéricos de IA mediante componentes dinámicos e interactivos de alto valor gastronómico:
* **Calculadora Culinaria Interactiva (`CulinaryCalculatorSection.tsx`)**:
  * Permite al usuario seleccionar platos emblemáticos de Sucre (Sopa de Maní Tradicional, Picante Mixto y Mondongo, o Picoteo de Chicharrón y Habas).
  * Deslizador y botones de porciones dinámicas (de 2 a 24 personas).
  * Cálculo en tiempo real de gramos de maní molido y ají en batán requeridos, paquetes sugeridos y costo en Bs.
  * Botón interactivo "Agregar a la bolsita en 1 clic" que inserta los ingredientes al carrito y botón directo a WhatsApp.
* **Modal Interactivo de Cobro Simple QR (`SimpleQRModal.tsx`)**:
  * Genera el comprobante virtual con el monto exacto en Bolivianos (Bs) y la orden de compra (`#PS-QR-XXXXXX`).
  * Glosa de transferencia copiable al portapapeles con un solo clic.
  * Entidades financieras de Bolivia soportadas (BNB, BCP, Banco Unión, Mercantil, Bisa, FIE).
  * Botón directo para adjuntar el comprobante bancario al WhatsApp oficial (+591 71152182).
* **Reseñas y Experiencias de Clientes Verificados (`TestimonialsSection.tsx`)**:
  * Filtrado interactivo por categoría (Sopa de Maní, Ají en Batán, Snacks, Envíos Nacionales).
  * Calificación global de 4.9 / 5.0 con 128 pedidos verificados.
  * Botones interactivos de "Me gusta / Útil" por reseña con actualización de estado en vivo.
* **Buscador y Ordenador en Vivo en Catálogo (`CatalogSearchFilter.tsx`)**:
  * Ordenamiento en vivo por precio (menor/mayor), destacados y alfabético.
  * Etiquetas de filtrado rápido ("Sopa de Maní", "Ají Colorado", "Chicharrón", "Habas").
  * Contador instantáneo de productos coincidentes.
* **Marcado SEO y Schema.org Enriquecido (Rich Snippets)**:
  * Esquema `FAQPage` en la página de inicio para desplegar preguntas y respuestas directamente en Google Search.
  * Esquema `BreadcrumbList` para navegación por migas de pan.
  * Esquema `Product` con `aggregateRating` (4.9 estrellas) para visualización de valoraciones en los resultados de búsqueda.

---

## 7. Canales Sociales Oficiales y Atención Unificada

La presencia digital de la marca se concentra de manera exclusiva y rigurosa en **4 redes sociales oficiales**, unificando la comunicación con el cliente y eliminando canales dispersos:

1. **WhatsApp Oficial de Ventas y Pedidos**: `https://wa.me/59171152182` (+591 71152182).
   * Atención directa de la familia propietaria.
   * Recepción de comprobantes de pago por Simple QR y PayPal.
   * Coordinación de entregas locales en Sucre y despachos por flota a nivel nacional.
2. **TikTok Oficial (@sucrenita_artesanal)**: `https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk`.
   * Video marketing, recetas tradicionales de Chuquisaca, técnicas en batán y demostración de crocancia de snacks.
3. **Facebook Oficial**: `https://www.facebook.com/profile.php?id=61595923780807`.
   * Comunidad chuquisaqueña, avisos de molienda fresca semanal y contacto directo.
4. **Instagram Oficial**: `https://www.instagram.com/productossucrenita`.
   * Galería visual de productos, presentación de recetas y novedades gastronómicas.

> **Nota de Gobernanza de Marca**: Las plataformas secundarias (YouTube, Telegram, Messenger) fueron deshabilitadas y retiradas del catálogo para evitar dispersión operativa y garantizar que el 100% de los clientes reciban atención rápida y directa por los canales verificados de la marca.

---

## 8. Documentación de Arquitectura de Software

```
+-------------------------------------------------------------+
|                     CLIENTE (Navegador)                     |
| Next.js 14 (App Router) + Tailwind CSS + Lucide Icons       |
+------------------------------+------------------------------+
                               |
                               | (HTTPS / ISR / Fetch)
                               v
+-------------------------------------------------------------+
|                   VERCEL EDGE INFRASTRUCTURE                |
|  - Certificado SSL Let's Encrypt                            |
|  - Google Analytics 4 (gtag.js)                             |
|  - Schema.org JSON-LD + OpenGraph                           |
|  - Panel /admin con cabecera noindex / nofollow             |
+------------------------------+------------------------------+
                               |
                               | (REST API / CORS)
                               v
+-------------------------------------------------------------+
|                BACKEND API (Node.js + Express)              |
|  - Rutas de Autenticación: /api/auth/*                      |
|  - Rutas de Productos: /api/products/*                      |
|  - Rutas de Pagos: /api/payments/paypal/*                   |
|  - Prisma ORM + PostgreSQL (Supabase Pooler)                |
+------------------------------+------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
+-----------------------------+ +-----------------------------+
|     PASARELA SIMPLE QR      | |   PASARELA PAYPAL CHECKOUT  |
|  Red Bancaria de Bolivia    | |  Tarjetas Internacionales   |
|  Moneda: BOB (Sin comisión) | |  Moneda: USD (Tasa: 6.96)   |
+-----------------------------+ +-----------------------------+
```

---

## 9. Pasarela de Pago PayPal

Para atender a compradores en el exterior, residentes extranjeros y clientes con tarjetas de crédito/débito internacionales:
* **Componente de Checkout**: `PayPalCheckoutModal.tsx`.
* **Conversión de Divisas en Vivo**:
  * Moneda base: Bolivianos (`BOB`).
  * Tipo de cambio oficial referencial: `1 USD = 6.96 BOB`.
  * Cálculo transparente sin comisiones ocultas para el usuario.
* **Formulario de Despacho**: Captura de nombre, teléfono WhatsApp, ciudad y dirección.
* **Generación de Ticket de Compra**: Emisión de identificador de orden (`#PS-PAYPAL-XXXXXX`).
* **Integración con WhatsApp**: Botón final para enviar el comprobante de pago de PayPal directamente al taller familiar para el despacho inmediato del pedido.
* **Endpoints Backend**:
  * `POST /api/payments/paypal/create-order`
  * `POST /api/payments/paypal/capture-order`

---

## 10. Canal de TikTok Oficial y Video Marketing para Atracción de Tráfico

El componente `VideoMarketingSection.tsx` implementa la estrategia de atracción audiovisual orgánica:
### 10.1 Cápsulas de Recetas y Secretos Culinarios en TikTok (@sucrenita_artesanal)
* **Video 1**: "Receta Secreta: Auténtica Sopa de Maní Chuquisaqueña" (Técnica de hervor y molienda).
* **Video 2**: "Cómo sofreír el Ají Colorado en Batán sin que se queme" (Extracción de color y aroma).
* **Video 3**: "Elaboración de Chicharrón Crocante y Habas Fritas de Altura" (Fritura artesanal controlada).
* Cada cápsula en video incluye enlace directo a TikTok (@sucrenita_artesanal) y botón de conversión directa para pedir los ingredientes exactos por WhatsApp (+591 71152182).

### 10.2 Contenido en TikTok (@sucrenita_artesanal)
* Tarjetas de video corto en formato vertical enfocadas en *lifestyle*, crocancia del chicharrón y empaque artesanal.
* Enlaces directos para sumar seguidores en la cuenta oficial de TikTok.

---

## 11. Chat en Línea Interactivo y Preguntas Frecuentes

### 11.1 Centro de Asistencia en Vivo (`SocialChatHub.tsx`)
Pestaña de asistente virtual con 4 preguntas frecuentes inmediatas:
1. ¿Cómo realizo un pedido de maní, ají o snacks?
2. ¿Cuáles son los métodos de pago aceptados?
3. ¿Realizan envíos a otras ciudades de Bolivia?
4. ¿Venden al por mayor o por arroba para restaurantes?
Cada respuesta cuenta con un botón directo para continuar la conversación personalizada en WhatsApp con la pregunta pre-cargada.

### 11.2 Sección Desplegable de FAQ (`FAQSection.tsx`)
Sección en la página principal con diseño acordeón interactivo que responde preguntas sobre recetas, diferencias entre ají dulce y picante, conservación de granos sin químicos y cotizaciones para eventos.

---

## 12. Mensajería Automatizada a WhatsApp

Los mensajes dirigidos al número oficial de WhatsApp (+591 71152182) se generan mediante cadenas estructuradas que evitan malentendidos en los pedidos:
* Encabezado institucional ("Pedido Oficial - Productos Sucreñita").
* Desglose ítem por ítem con cantidades y subtotales en Bolivianos.
* Total general de la compra en Bs.
* Modalidad de cobro elegida (Simple QR, PayPal con ID de transacción, o Efectivo contra entrega).
* Dirección del comprador en Sucre o ciudad de destino para envío por encomienda.

---

## 13. Contenido Final de la Plataforma y Políticas Comerciales

### 13.1 Catálogo Oficial de Productos Reales de la Casa
1. **Ají Colorado Seleccionado en Vaina / Molido (1 kg)** - Bs 100.00 (Primera calidad desvenado) / Bs 80.00 (Con pepa).
2. **Chicharrón Artesanal en Tira (13 Unidades)** - Bs 10.00.
3. **Platanitos Chips Artesanales Crocantes (Paquete de 26 Unidades)** - Bs 20.00 (Novedad de la casa).
4. **Habas Saladas Fritas Crocantes (Paquete de 26 Unidades)** - Bs 20.00.
5. **Maní Dulce Confitado Garrapiñado (Paquete de 26 Unidades)** - Bs 20.00.
6. **Chicharrón Artesanal Redondo Crocante Familiar (200g)** - Bs 20.00.
7. **Ají Colorado Secado al Sol Chuquisaqueño (250g)** - Bs 15.00.
8. **Chicharrones Crocantes en Tira Doble (26 Unidades)** - Bs 20.00.
9. **Ají Colorado Primera Calidad por Quintal (100 lbs - Venta Mayorista)** - Bs 4,000.00.
10. **Ají Colorado con Pepa por Quintal (100 lbs - Venta Mayorista)** - Bs 2,200.00.
11. **Maní Molido Tradicional para Sopa (500g)** - Bs 15.00.
12. **Maní Crudo Seleccionado (1 kg)** - Bs 18.00.
13. **Ají Amarillo Molido Sin Picante / Dulce (250g)** - Bs 12.00.

### 13.2 Políticas de Entrega
* **Entregas en Sucre**: Distribución en el centro histórico, San Roque, La Recoleta, Barrio Petrolero y zonas residenciales en un plazo máximo de 24 horas.
* **Envíos Nacionales**: Despachos semanales por flota o empresas de transporte interdepartamental hacia La Paz, Cochabamba, Santa Cruz, Potosí, Oruro, Tarija, Beni y Pando.
* **Garantía**: Productos 100% artesanales elaborados en Sucre, libres de harinas de relleno, conservantes o colorantes artificiales.

---

## 14. Panel de Administración y Gestión de Inventario
15. Identidad Visual Armoniosa y Paleta Artesanal Sucrense
16. Soporte de Modo Oscuro Adaptable (Dark Mode) y Prevención de FOUC

### 14.1 Arquitectura y Acceso
* **Ruta de Acceso**: `/admin` (disponible en local y en producción).
* **Protección SEO**: `frontend/src/app/admin/layout.tsx` configura metadatos `robots: { index: false, follow: false }` para evitar la indexación de las herramientas de administración en buscadores.
* **Enlace Discreto**: Incorporado en el pie de página (`Footer.tsx`) con icono vectorial seguro.

### 14.2 Seguridad y Almacenamiento Criptográfico de Credenciales
* **Modelo Prisma**:
  ```prisma
  model User {
    id        String   @id @default(uuid())
    name      String
    username  String   @unique
    password  String
    role      String   @default("ADMIN")
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```
* **Cifrado Robusto**: Las contraseñas se almacenan mediante derivación de claves **PBKDF2-SHA512** con un salt aleatorio criptográfico de 16 bytes y 10,000 iteraciones (`crypto.pbkdf2Sync`).
* **Comparación en Tiempo Constante**: La verificación utiliza `crypto.timingSafeEqual` para prevenir ataques de temporización (*timing attacks*).
* **Usuario Administrador Inicial**:
  * **Nombre**: `Jhojan Erick Romero Morales`
  * **Nombre de Usuario**: `engel7u7`
  * **Estado en Base de Datos**: Registrado y activo en PostgreSQL (Supabase) mediante el script `backend/prisma/create-admin.ts`.
  * **Tokens de Sesión**: Generación y firma de tokens de sesión HMAC-SHA256 con tiempo de expiración de 7 días.

### 14.3 Capacidades del Panel Administrativo
1. **Métricas en Tiempo Real**: Total de productos en catálogo, unidades en stock físico, valor total estimado del inventario en Bolivianos (Bs) y conteo de productos activos.
2. **Creación de Nuevos Productos**: Formulario modal con selección de línea (Abarrotes vs Snacks), generación automática de slug amigable, precio, stock, descripción y selector de fotografía de producto.
3. **Edición Completa**: Modificación inmediata de nombres, descripciones, precios, existencias y categoría de productos existentes.
4. **Control de Visibilidad**: Activación y desactivación de productos con un solo clic para ocultar temporalmente del catálogo público productos sin stock sin eliminarlos del historial.
5. **Persistencia Dual**: Capaz de sincronizarse con la API REST (`/api/products`) y mantener persistencia en almacenamiento local (`localStorage`) para funcionamiento continuo tanto en entornos conectados a la base de datos remota como en entornos desacoplados.

---

## 15. Identidad Visual Armoniosa y Paleta Artesanal Sucrense

Para transmitir la calidez, tradición y sobriedad de la gastronomía chuquisaqueña, la tienda virtual abandonó contrastes estridentes o chillantes (amarillos saturados, verdes neón, rosas eléctricos) y consolidó una paleta cromática sobria y armónica:

* **Fondos y Lienzo**: Tonos lino y arena natural (`#FCFAF7`, `#F7F4EE`, `#FAF8F5`) con bordes en lino suave (`#EAE3D6`).
* **Tipografía Primaria**: Tono café carbón profundo (`#26170E`, `#3E2314`) para máxima legibilidad y confort visual.
* **Acentos Gastronómicos**:
  * **Terracota Suave**: `#874C37` para detalles de recetas, batán e historia familiar.
  * **Ámbar Miel**: `#7C5B28` para consejos de Doña Sucreñita y valoraciones.
  * **Verde Bosque / Sabio**: `#3B5745` y verde institucional atenuado `#1F7A4C` para disponibilidad de inventario y atención directa por WhatsApp.
* **Cero Emojis y Cero Comentarios**: Toda la iconografía se basa exclusivamente en vectores SVG y componentes de `lucide-react`, manteniendo el código de producción limpio y estilizado.

---

## 16. Soporte de Modo Oscuro Adaptable (Dark Mode) y Prevención de FOUC

### 16.1 Filosofía de Diseño Artesanal en Modo Oscuro
Para evitar la estética genérica de plantilla de inteligencia artificial (que suele recurrir a negros puros `#000000` o azules espaciales `#0F172A` con bordes de neón estridentes), el modo oscuro de Productos Sucreñita fue concebido bajo la paleta semántica **Cacao Tostado Chuquisaqueño**:
* **Superficie Principal (`cacao-950` / `cacao-900`)**: `#0E0A08` y `#140F0C`, inspirados en ollas de barro curadas y granos de maní tostados a leña.
* **Tarjetas y Contenedores Elevados (`cacao-850` / `cacao-800`)**: `#1A1411` y `#221A15`, ofreciendo profundidad y calidez orgánica.
* **Bordes y Delimitadores (`cacao-700` / `cacao-600`)**: `#342821` y `#4A3B32`, reemplazando líneas frías por acabados de madera rústica y arcilla.
* **Tipografía y Contraste (`cacao-50` / `cacao-100`)**: Lino marfil `#FAF6F0` y crema suave `#F0E8DD`, garantizando descanso visual prolongado (ratio de contraste superior a 12:1 bajo normas WCAG AAA).
* **Acentos Cálidos**: Miel andino (`#D4A853`), terracota viva (`#D48065`) y esmeralda bosque (`#34D399`) para estados activos y botones de pago.

### 16.2 Arquitectura Técnica Anti-FOUC (Modern Web Guidance)
Siguiendo las recomendaciones oficiales de **Modern Web Guidance** (`dark-mode`, `dark-mode-toggle`):
1. **Declaración en `<head>`**: Se incluye `<meta name="color-scheme" content="light dark" />` y `<meta name="theme-color" ... />` en `layout.tsx` para sincronizar los controles del navegador y scrollbars nativos.
2. **Script Síncrono de Inicialización**: Se inyecta un script inline en `<head>` que evalúa la preferencia guardada en `localStorage.getItem('sucrenita_theme')` o el query de medios del sistema `window.matchMedia('(prefers-color-scheme: dark)')` antes del primer renderizado de la pintura, eliminando el parpadeo blanco (*Flash of Unstyled Content*).
3. **Sincronización React Context (`ThemeContext.tsx`)**:
   * Manejo reactivo de estado con persistencia automática en `localStorage`.
   * Listener bidireccional sobre `prefers-color-scheme` para usuarios que cambian el tema a nivel del sistema operativo.
   * Listener del evento nativo `storage` para sincronizar el modo oscuro instantáneamente entre múltiples pestañas abiertas.
4. **Control Accesible (`ThemeToggle.tsx`)**:
   * Botón con icono vectorial adaptable (`Sun` y `Moon` de `lucide-react`), atributos `aria-label` descriptivos y transiciones suaves de opacidad y rotación.
   * Ubicado de manera prominente en el `Navbar` superior (tanto en barra de escritorio como en el menú desplegable móvil).
5. **Cobertura al 100% de Vistas y Componentes**:
   * Página de inicio (`Hero`, `BrandStory`, `CulinaryCalculator`, `Testimonials`, `VideoMarketing`, `FAQ`).
   * Catálogo de productos (`CatalogSearchFilter`, `ProductCard`, tags y paginación).
   * Ficha de detalle de producto (`/productos/[slug]`, `ShareProductButtons`, `ProductDetailActions`).
   * Carrito flotante (`CartDrawer`).
   * Centro de atención y chat (`SocialChatHub`).
   * Pasarelas y modales de cobro (`SimpleQRModal` y `PayPalCheckoutModal`).
   * Panel administrativo de inventario (`/admin`).

