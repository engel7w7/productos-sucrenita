#!/bin/bash
# Script para generar certificados SSL autofirmados para pruebas en VPS o entorno local

DOMAIN="${1:-localhost}"
DAYS="${2:-365}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

KEY_PATH="$DIR/server.key"
CRT_PATH="$DIR/server.crt"
CNF_PATH="$DIR/openssl.cnf"

echo "Generando certificado SSL autofirmado para: $DOMAIN ($DAYS días)"

cat > "$CNF_PATH" <<EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
C = BO
ST = Chuquisaca
L = Sucre
O = Productos Sucrenita
OU = TI
CN = $DOMAIN

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = $DOMAIN
DNS.2 = *.$DOMAIN
DNS.3 = localhost
IP.1 = 127.0.0.1
EOF

openssl req -x509 -nodes -days "$DAYS" -newkey rsa:2048 -keyout "$KEY_PATH" -out "$CRT_PATH" -config "$CNF_PATH"
rm -f "$CNF_PATH"

chmod 600 "$KEY_PATH"
chmod 644 "$CRT_PATH"

echo "Certificado generado exitosamente:"
echo "  Clave privada: $KEY_PATH"
echo "  Certificado:   $CRT_PATH"
