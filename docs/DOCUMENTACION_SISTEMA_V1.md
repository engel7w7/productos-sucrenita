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
  * **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL / SQLite.
  * **Pasarelas de Pago**: Simple QR (Red Bancaria de Bolivia) y PayPal Checkout Internacional (USD).
  * **Infraestructura Cloud**: Vercel Edge Network, Render Cloud Services, Nginx Reverse Proxy (Entorno local SSL).

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
* La administración de productos, precios y categorías se gestiona mediante modelos Prisma (`Category` y `Product`) con serialización de precios decimales y control de inventario (`stock` y `isActive`).

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

---

## 6. Vista Inicial Temática y Componentes Esenciales

La interfaz fue diseñada respetando una estética de taller artesanal chuquisaqueño, eliminando cualquier aspecto genérico de inteligencia artificial:
* **Paleta Pastel Armoniosa**: Combinación de tonos crema (`pastel-cream`), arena cálida (`pastel-sand`), ámbar tostado (`pastel-amber`), melocotón suave (`pastel-peach`) y salvia natural (`pastel-sage`).
* **Bolsita de Compras Interactiva (`CartContext.tsx` y `CartDrawer.tsx`)**:
  * Persistencia local en `localStorage`.
  * Contador numérico flotante en la barra de navegación.
  * Selector de cantidades dinámico (`+` y `-`).
  * Cálculo instantáneo de subtotales en Bolivianos (Bs).
* **Buscador en Tiempo Real en Catálogo (`CatalogSearchFilter.tsx`)**:
  * Barra de búsqueda que filtra en vivo por texto en nombres y descripciones.
  * Chips interactivos por categoría (Abarrotes y Condimentos vs. Snacks Artesanales).
* **Fichas de Producto Enriquecidas**:
  * Sección "El consejo de la casa de Doña Sucreñita" con secretos gastronómicos para sopa de maní, mondongo y picantes.
  * Selector de cantidad y botones de compra directa.

---

## 7. Plugins Sociales Multicanal

Se implementó el componente central `SocialChatHub.tsx`, ubicado en la esquina inferior de la pantalla:
1. **WhatsApp Directo**: `https://wa.me/59171152182` con mensajes preconfigurados.
2. **Facebook Messenger**: `https://m.me/61595923780807` para atención vía chat de Meta.
3. **Telegram Oficial**: `https://t.me/ProductosSucrenita` para consultas seguras.
4. **TikTok Oficial**: `https://www.tiktok.com/@sucrenita_artesanal?_r=1&_t=ZS-9B4ug7qM3Bk` para videos cortos y recetas.
5. **Página de Facebook**: `https://www.facebook.com/profile.php?id=61595923780807` para comunidad local.
6. **Instagram**: `https://www.instagram.com/productossucrenita` para galería fotográfica.

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
+------------------------------+------------------------------+
                               |
                               | (REST API / CORS)
                               v
+-------------------------------------------------------------+
|                BACKEND API (Node.js + Express)              |
|  - Rutas de Productos: /api/products                        |
|  - Rutas de Pagos: /api/payments/paypal/*                   |
|  - Prisma ORM + Base de Datos (PostgreSQL / SQLite)         |
+------------------------------+------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
+-----------------------------+ +-----------------------------+
|     PASARELA SIMPLE QR      | |   PASARELA PAYPAL CHECKOUT  |
|  Red Bancaria de Bolivia    | |  Tarjetas Internacionales   |
|  Moneda: BOB (Sin comisin) | |  Moneda: USD (Tasa: 6.96)   |
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

### 13.1 Catálogo Oficial de Productos
1. **Maní Crudo Seleccionado (1 kg)** - Bs 18.00
2. **Maní Molido Tradicional para Sopa (500g)** - Bs 15.00
3. **Ají Colorado Molido con Picante (250g)** - Bs 12.00
4. **Ají Amarillo Molido Sin Picante / Dulce (250g)** - Bs 12.00
5. **Chicharrón Artesanal Crocante (200g)** - Bs 20.00
6. **Maní Dulce Garrapiñado (250g)** - Bs 10.00
7. **Habas Fritas Crocantes con Sal Marina (250g)** - Bs 10.00

### 13.2 Políticas de Entrega
* **Entregas en Sucre**: Distribución en el centro histórico, San Roque, La Recoleta, Barrio Petrolero y zonas residenciales en un plazo máximo de 24 horas.
* **Envíos Nacionales**: Despachos semanales por flota o empresas de transporte interdepartamental hacia La Paz, Cochabamba, Santa Cruz, Potosí, Oruro, Tarija, Beni y Pando.
* **Garantía**: Productos 100% artesanales elaborados en Sucre, libres de harinas de relleno, conservantes o colorantes artificiales.

