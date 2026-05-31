@echo off
REM Development startup script for SDA Church Keru (Windows)

echo ================================================
echo SDA Church Keru - Development Server
echo ================================================
echo.

REM Check if Node modules are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo Warning: .env file not found
    echo Please create .env file using .env.example as template
    echo.
)

echo Checking MongoDB connection...
echo.

echo Starting development server...
echo Server: http://localhost:3000
echo Health Check: http://localhost:3000/health
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run devStart

pause
