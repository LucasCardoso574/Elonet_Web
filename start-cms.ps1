# Script para iniciar o Decap CMS com proxy server
Write-Host "Iniciando Decap CMS Proxy Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npx decap-server"

Write-Host "Aguardando 3 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Iniciando Astro dev server..." -ForegroundColor Green
npm run dev

