@echo off
title Smart Visitor System

echo ==========================================
echo       SMART VISITOR SYSTEM
echo ==========================================
echo.

cd /d "E:\smartvisitor\backend"

echo [1/2] Starting Flask backend...
start "Flask Backend" cmd /k "python app.py"

timeout /t 4 /nobreak >nul

echo [2/2] Starting Cloudflare Tunnel...
cd /d "C:\Cloudflared"
start "Cloudflare Tunnel" cmd /k ".\cloudflared.exe tunnel --url http://localhost:5000"

echo.
echo ==========================================
echo   BACKEND + CLOUDFLARE STARTED
echo ==========================================
echo.
echo Keep both windows running.
echo You can now use your Visitor System.
echo.
pause