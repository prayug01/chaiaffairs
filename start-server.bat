@echo off
echo Starting Chai Affairs website on localhost...
echo.

REM Try Python first
python -m http.server 8000 2>nul
if %errorlevel% equ 0 goto :end

REM Try Python3 if Python failed
python3 -m http.server 8000 2>nul
if %errorlevel% equ 0 goto :end

REM Try Node.js http-server if Python is not available
echo Python not found. Trying Node.js...
npx --yes http-server -p 8000 2>nul
if %errorlevel% equ 0 goto :end

REM If all else fails, use PowerShell (always works on Windows)
echo Using PowerShell server...
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"

:end

