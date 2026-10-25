$targetDir = "$PSScriptRoot"
$keyPath = Join-Path $targetDir "private.key"
$certPath = Join-Path $targetDir "certificate.crt"
$fullchainPath = Join-Path $targetDir "fullchain.crt"

if (Get-Command openssl -ErrorAction SilentlyContinue) {
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $keyPath -out $certPath -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
    Copy-Item $certPath $fullchainPath -Force
    Write-Output "Certificados SSL generados correctamente con OpenSSL en: $targetDir"
} else {
    $cert = New-SelfSignedCertificate -DnsName "localhost", "127.0.0.1" -CertStoreLocation "cert:\CurrentUser\My" -NotAfter (Get-Date).AddYears(1)
    $pwd = ConvertTo-SecureString -String "sucrenita123" -Force -AsPlainText
    $pfxPath = Join-Path $targetDir "localhost.pfx"
    Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $pwd | Out-Null
    Write-Output "Certificado SSL autofirmado exportado como PFX en: $pfxPath"
}
