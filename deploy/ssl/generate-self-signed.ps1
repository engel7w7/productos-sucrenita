# Script PowerShell para generar certificados SSL autofirmados para desarrollo local o pruebas
param (
    [string]$Domain = "localhost",
    [int]$Days = 365,
    [string]$OutputDir = "$PSScriptRoot"
)

Write-Host "Generando certificado SSL autofirmado para: $Domain" -ForegroundColor Cyan

$KeyPath = Join-Path $OutputDir "server.key"
$CrtPath = Join-Path $OutputDir "server.crt"
$CnfPath = Join-Path $OutputDir "openssl.cnf"

$CnfContent = @"
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
CN = $Domain

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = $Domain
DNS.2 = *.`$Domain
DNS.3 = localhost
IP.1 = 127.0.0.1
"@

Set-Content -Path $CnfPath -Value $CnfContent -Encoding Ascii

# Verificar si openssl está disponible
if (Get-Command openssl -ErrorAction SilentlyContinue) {
    openssl req -x509 -nodes -days $Days -newkey rsa:2048 -keyout $KeyPath -out $CrtPath -config $CnfPath
    Remove-Item $CnfPath -ErrorAction SilentlyContinue
    Write-Host "Certificado generado exitosamente:" -ForegroundColor Green
    Write-Host "  Clave privada: $KeyPath" -ForegroundColor Yellow
    Write-Host "  Certificado:   $CrtPath" -ForegroundColor Yellow
} else {
    Write-Warning "OpenSSL no fue encontrado en el PATH. Para Windows puedes usar New-SelfSignedCertificate o instalar OpenSSL (Git Bash incluye openssl)."
    Write-Host "Generando mediante cmdlet nativo de Windows New-SelfSignedCertificate..." -ForegroundColor Cyan
    $cert = New-SelfSignedCertificate -DnsName $Domain, "localhost" -CertStoreLocation "cert:\LocalMachine\My" -NotAfter (Get-Date).AddDays($Days)
    Write-Host "Certificado instalado en almacén de Windows con Thumbprint: $($cert.Thumbprint)" -ForegroundColor Green
}
