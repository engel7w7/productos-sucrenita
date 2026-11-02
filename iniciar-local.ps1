Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "      INICIANDO PRODUCTOS SUCRENITA (MODO LOCAL)" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Iniciando Backend API Express en http://localhost:10000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

Write-Host "2. Iniciando Frontend Next.js en http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host ""
Write-Host "Esperando 4 segundos a que inicien los servicios locales..." -ForegroundColor Gray
Start-Sleep -Seconds 4

Write-Host "3. Abriendo la tienda en el navegador..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Plataforma ejecutandose 100% de manera local:" -ForegroundColor Green
Write-Host " - Tienda Web:    http://localhost:3000" -ForegroundColor White
Write-Host " - Visor Logos:   http://localhost:3000/ver-logos.html" -ForegroundColor White
Write-Host " - Backend API:   http://localhost:10000/api/products" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan

