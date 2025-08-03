#!/bin/bash

# TASHAN WIN VIP - Production Package Creator
echo "📦 Creating production deployment package..."

# Create deployment directory
mkdir -p deployment-package
cd deployment-package

# Copy essential files
echo "📋 Copying project files..."
cp -r ../client ./
cp -r ../server ./
cp -r ../shared ./
cp -r ../attached_assets ./

# Copy configuration files
cp ../package.json ./
cp ../package-lock.json ./
cp ../tsconfig.json ./
cp ../vite.config.ts ./
cp ../tailwind.config.ts ./
cp ../postcss.config.js ./
cp ../components.json ./
cp ../drizzle.config.ts ./

# Copy deployment files
cp ../ecosystem.config.js ./
cp ../deploy-vps.md ./
cp ../PERFORMANCE-SUMMARY.md ./
cp ../DEPLOYMENT-README.md ./

# Copy replit configuration (for reference)
cp ../replit.md ./

# Create production .gitignore
cat > .gitignore << EOF
node_modules/
dist/
logs/
*.log
.env
.env.local
.env.production
.DS_Store
Thumbs.db
coverage/
.nyc_output/
.cache/
.parcel-cache/
build/
.vscode/
.idea/
*.swp
*.swo
*~
EOF

# Create production package.json (optimized)
cat > package-production.json << EOF
{
  "name": "tashan-win-vip-production",
  "version": "1.0.0",
  "description": "TASHAN WIN VIP Prediction Platform - Production Build",
  "main": "dist/index.js",
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "start:pm2": "pm2 start ecosystem.config.js --env production",
    "stop": "pm2 stop tashan-win-vip",
    "restart": "pm2 restart tashan-win-vip",
    "logs": "pm2 logs tashan-win-vip",
    "monitor": "pm2 monit"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.6",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-collapsible": "^1.1.1",
    "@radix-ui/react-context-menu": "^2.2.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-hover-card": "^1.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.1",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@tanstack/react-query": "^5.62.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.4",
    "date-fns": "^4.1.0",
    "drizzle-orm": "^0.39.2",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.5.1",
    "express": "^4.21.2",
    "framer-motion": "^11.15.0",
    "input-otp": "^1.4.1",
    "lucide-react": "^0.468.0",
    "memoizee": "^0.4.17",
    "next-themes": "^0.4.4",
    "react": "^18.3.1",
    "react-day-picker": "^9.4.2",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.13.3",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.1",
    "wouter": "^3.3.7",
    "zod": "^3.24.1",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/memoizee": "^0.4.11",
    "@types/node": "^22.10.5",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "esbuild": "^0.24.0",
    "postcss": "^8.5.11",
    "tailwindcss": "^3.5.7",
    "typescript": "^5.7.2",
    "vite": "^6.0.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
EOF

echo "✅ Production package created in deployment-package/"
echo "📦 Ready to zip for VPS deployment!"

cd ..
echo "🗜️ Creating zip file..."

# Create zip file
zip -r tashan-win-vip-production.zip deployment-package/ -x "deployment-package/node_modules/*" "deployment-package/.git/*" "deployment-package/dist/*" "deployment-package/logs/*"

echo "✅ Deployment package ready: tashan-win-vip-production.zip"
echo "📤 Upload this zip file to your VPS and follow DEPLOYMENT-README.md"