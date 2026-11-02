@echo off
title Productos Sucrenita - Entorno Local
echo ========================================================
echo       INICIANDO PRODUCTOS SUCRENITA (MODO LOCAL)
echo ========================================================
echo.
echo 1. Iniciando Backend API Express en http://localhost:10000...
start "Sucrenita Backend API (Puerto 10000)" cmd /k "cd backend && npm run dev"

echo 2. Iniciando Frontend Next.js en http://localhost:3000...
start "Sucrenita Frontend Web (Puerto 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo Esperando 4 segundos mientras compila el entorno local...
timeout /t 4 /nobreak > nul

echo 3. Abriendo la tienda virtual en tu navegador...
start http://localhost:3000

echo.
echo ========================================================
echo   Plataforma lista en tu maquina local:
echo   - Tienda Web:   http://localhost:3000
echo   - Visor Logos:  http://localhost:3000/ver-logos.html
echo   - Backend API:  http://localhost:10000/api/products
echo ========================================================
echo.
pause

