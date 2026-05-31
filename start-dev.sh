#!/bin/bash
# Development startup script for SDA Church Keru

echo "================================================"
echo "SDA Church Keru - Development Server"
echo "================================================"
echo ""

# Check if Node modules are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating default..."
    cp .env.example .env 2>/dev/null || echo "Please create .env file manually"
    echo ""
fi

echo "🚀 Starting development server..."
echo "📍 Server: http://localhost:3000"
echo "📍 Health Check: http://localhost:3000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run devStart
