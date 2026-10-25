# Guia de Implementacion SSL/TLS para Productos Sucrenita

Esta guia documenta los procedimientos tecnicos para configurar certificados SSL/TLS y garantizar conexiones seguras HTTPS tanto en entornos cloud (Render, Vercel) como en servidores dedicados o VPS de evaluacion academica.

---

## 1. Opciones de Certificacion SSL

### Opcion A: Let's Encrypt Automatizado (Render / Vercel)
Si el despliegue se realiza en plataformas gestionadas como Render (backend) o Vercel (frontend):
- La emision y renovacion de certificados Let's Encrypt es 100% automatica.
- No requiere intervencion manual ni instalacion de archivos de certificados.
- Render y Vercel renuevan los certificados cada 60-90 dias de forma transparente.

### Opcion B: Let's Encrypt con Certbot (En Servidor VPS)
Para configurar el subdominio de la materia (`sucrenita.dominio.bo`) o dominio propio en un VPS con Ubuntu/Debian y Nginx:

1. Instalar Certbot y el plugin para Nginx:
   ```bash
   sudo apt update
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. Generar e instalar el certificado de forma interactiva:
   ```bash
   sudo certbot --nginx -d sucrenita.dominio.bo -d productos-sucrenita.bo
   ```

3. Certbot modificara automaticamente la configuracion de Nginx e instalara un temporizador de renovacion automatica:
   ```bash
   sudo systemctl status certbot.timer
   ```

---

### Opcion C: Certificado Emitido por ZeroSSL (zerossl.com)
ZeroSSL es una entidad certificadora (CA) gratuita reconocida por todos los navegadores modernos.

1. **Crear el certificado en zerossl.com:**
   - Registrate en [zerossl.com](https://zerossl.com).
   - Haz clic en **New Certificate** e introduce tu dominio (ej: `sucrenita.dominio.bo` o `productos-sucrenita.bo`).
   - Selecciona la validez gratuita de 90 dias y autogeneracion de CSR.

2. **Validacion de posesion del dominio:**
   ZeroSSL ofrece dos metodos de validacion:
   - **Metodo 1: HTTP File Upload (Recomendado con nuestro backend):**
     ZeroSSL te proporcionara un archivo de autenticacion (ej: `2548B012....txt`).
     Coloca dicho archivo en la carpeta del backend:
     `backend/public/.well-known/acme-challenge/`
     El servidor Express ya cuenta con la ruta publica para servirlo:
     `http://tu-dominio/.well-known/acme-challenge/<archivo.txt>`
   - **Metodo 2: DNS (CNAME):**
     Crea un registro CNAME en el panel DNS de tu dominio con el nombre y valor indicados por ZeroSSL.

3. **Descarga e instalacion en el servidor Nginx:**
   - Descarga el archivo ZIP de ZeroSSL. Contiene tres archivos:
     - `certificate.crt` (Certificado primario)
     - `ca_bundle.crt` (Cadena de confianza intermedia)
     - `private.key` (Clave privada generada)
   - Concatena el certificado con el bundle intermedio para formar la cadena completa:
     ```bash
     cat certificate.crt ca_bundle.crt > fullchain.crt
     ```
   - Ubica los archivos en el servidor (ej: `/etc/ssl/zerossl/`):
     ```bash
     sudo mkdir -p /etc/ssl/zerossl
     sudo cp fullchain.crt /etc/ssl/zerossl/fullchain.crt
     sudo cp private.key /etc/ssl/zerossl/private.key
     sudo chmod 600 /etc/ssl/zerossl/private.key
     ```
   - Enlaza las rutas en el archivo `deploy/nginx/sucrenita.conf`.

---

### Opcion D: Certificados Autofirmados (Desarrollo y Evaluacion Interna)
Si el VPS no tiene salida a internet para validar dominios publicos o para pruebas locales:

1. **En Linux/macOS:**
   Ejecuta el script incluido:
   ```bash
   chmod +x deploy/ssl/generate-self-signed.sh
   ./deploy/ssl/generate-self-signed.sh localhost 365
   ```

2. **En Windows (PowerShell):**
   ```powershell
   .\deploy\ssl\generate-self-signed.ps1 -Domain "localhost"
   ```

3. El script genera:
   - `server.key`: Clave privada RSA de 2048 bits.
   - `server.crt`: Certificado X.509 valido por 365 dias con Subject Alternative Names (SAN).

---

## 2. Medidas de Seguridad Implementadas en el Codigo

1. **Cabeceras HSTS (HTTP Strict Transport Security):**
   Implementado en `backend/src/index.ts` con el paquete `helmet`:
   - Envia la cabecera `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
   - Obliga a los navegadores a conectarse exclusivamente por HTTPS durante al menos 1 ano.

2. **Deteccion de Proxy Inverso:**
   - Se configuro `app.set('trust proxy', 1)` para interpretar de manera fiable las cabeceras `X-Forwarded-Proto` y `X-Forwarded-For` provenientes de balanceadores o Nginx.

3. **Redireccion automatica HTTP a HTTPS:**
   - Cualquier solicitud entrante por HTTP en entorno de produccion es redirigida con codigo de estado 301 (Permanent Redirect) a la version segura HTTPS.
