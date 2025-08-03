#!/bin/bash

# Tashan Win VIP - Production Build Script
# This script builds the application for production deployment

echo "🔨 Building Tashan Win VIP for Production"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Set production environment
export NODE_ENV=production

echo "📦 Installing dependencies..."
npm install

echo "🏢️ Building frontend..."
npm run build

echo "🔨 Building production server..."
npx esbuild server/index-production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index-production.js

echo "🔨 Building memory server (fallback)..."
npx esbuild server/index-memory.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index-memory.js

echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p dist/public

# Check if build was successful
if [ -f "dist/index-production.js" ]; then
    echo "✅ Production server built successfully"
else
    echo "❌ Production server build failed"
    exit 1
fi

if [ -d "dist/public" ] && [ "$(ls -A dist/public)" ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed or empty"
    exit 1
fi

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Build Summary:"
echo "   • Frontend: dist/public/"
echo "   • Backend: dist/index-production.js"
echo "   • Fallback: dist/index-memory.js"
echo ""
echo "🚀 To start production server:"
echo "   NODE_ENV=production PORT=3000 node dist/index-production.js"
echo ""
echo "📄 With database:"
echo "   DATABASE_URL='postgresql://...' NODE_ENV=production PORT=3000 node dist/index-production.js"
echo ""
echo "🧠 Without database (memory only):"
echo "   NODE_ENV=production PORT=3000 node dist/index-memory.js"