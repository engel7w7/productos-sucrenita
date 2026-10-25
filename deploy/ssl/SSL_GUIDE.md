# Guia de Certificados SSL con ZeroSSL (zerossl.com)

Esta guia detalla el procedimiento oficial para emitir, validar e instalar certificados SSL/TLS emitidos por la entidad certificadora **ZeroSSL** para la plataforma de **Productos Sucrenita**.

---

## 1. Por que ZeroSSL

ZeroSSL (zerossl.com) es una entidad de certificacion (CA) de confianza reconocida por todos los navegadores y sistemas operativos modernos. Permite emitir certificados SSL/TLS con cifrado RSA de 2048 bits para proteger las transacciones de comercio electronico, los datos de pedidos y la navegacion de los usuarios bajo el protocolo HTTPS.

---

## 2. Emision del Certificado en ZeroSSL

1. Ingresa a [zerossl.com](https://zerossl.com) e inicia sesion con tu cuenta.
2. Haz clic en el boton **New Certificate**.
3. En el campo de dominio, ingresa el dominio o subdominio asignado (por ejemplo: `sucrenita.dominio.bo` o `productos-sucrenita.bo`).
4. Selecciona la opcion de certificado gratuito de 90 dias (**90-Day Certificate**).
5. Selecciona la generacion automatica de CSR (**Auto-Generate CSR**).

---

## 3. Validacion de Dominio mediante Desafio HTTP (HTTP-01)

ZeroSSL requiere verificar que eres el propietario legitimo del servidor donde corre el dominio. El proyecto ya cuenta con el soporte necesario en el backend:

1. En el paso **Verification** de ZeroSSL, elige el metodo **HTTP File Upload**.
2. Descarga el archivo de autenticacion que ZeroSSL genera (un archivo de texto plano con nombre similar a `2548B012....txt`).
3. Coloca dicho archivo descargado directamente en la carpeta del backend:
   ```
   backend/public/.well-known/acme-challenge/
   ```
4. El servidor Express ya tiene configurada la ruta publica para servirlo:
   ```
   http://tu-dominio/.well-known/acme-challenge/<archivo.txt>
   ```
5. En la interfaz de ZeroSSL, haz clic en el enlace de prueba para verificar que el archivo responde correctamente en tu navegador.
6. Presiona **Verify Domain** en ZeroSSL. La entidad certificadora validara la respuesta y emitira el certificado inmediatamente.

---

## 4. Descarga y Preparacion de los Archivos del Certificado

Una vez emitido, descarga el paquete en formato ZIP desde el panel de ZeroSSL. Al descomprimirlo encontraras tres archivos:

1. `certificate.crt`: Certificado publico de tu dominio.
2. `ca_bundle.crt`: Cadena de certificados intermedios y raiz de ZeroSSL.
3. `private.key`: Clave privada para el descifrado del trafico TLS.

### Preparacion de la cadena completa (Fullchain)
Para que los navegadores reconozcan toda la cadena de confianza sin advertencias de seguridad, debes concatenar el certificado principal con el bundle intermedio:

En Linux / macOS:
```bash
cat certificate.crt ca_bundle.crt > fullchain.crt
```

En Windows (PowerShell):
```powershell
Get-Content certificate.crt, ca_bundle.crt | Set-Content fullchain.crt
```

---

## 5. Instalacion Segura en el Servidor

Por estrictas normas de ciberseguridad, **las claves privadas (`*.key`), certificados (`*.crt`) y configuraciones internas del servidor web Nginx no se suben a repositorios publicos de GitHub**. Se encuentran excluidos en el archivo `.gitignore`.

Para instalarlos en el servidor VPS de produccion:

1. Copia los archivos preparados a la carpeta segura del servidor (ejemplo: `/etc/ssl/zerossl/`):
   ```bash
   sudo mkdir -p /etc/ssl/zerossl
   sudo cp fullchain.crt /etc/ssl/zerossl/fullchain.crt
   sudo cp private.key /etc/ssl/zerossl/private.key
   sudo chmod 600 /etc/ssl/zerossl/private.key
   sudo chmod 644 /etc/ssl/zerossl/fullchain.crt
   ```

2. En la configuracion local de Nginx en tu servidor, apunta las directivas SSL a dichos archivos:
   ```nginx
   ssl_certificate /etc/ssl/zerossl/fullchain.crt;
   ssl_certificate_key /etc/ssl/zerossl/private.key;
   ssl_protocols TLSv1.2 TLSv1.3;
   ```

3. Reinicia Nginx para aplicar los cambios:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 6. Verificacion de Seguridad

Una vez activo, comprueba tu certificado en navegadores (veras el candado de seguridad con emisor ZeroSSL) o mediante herramientas de analisis como SSL Labs (obteniendo calificacion A o A+ gracias a las cabeceras HSTS y TLS 1.3 activas).
