#!/bin/bash

# Create deployment package for VPS
echo "📦 Creating deployment package..."

# Create temporary directory for deployment files
rm -rf deployment-package-temp
mkdir deployment-package-temp

# Copy essential files
echo "📁 Copying project files..."
cp -r server deployment-package-temp/
cp -r client deployment-package-temp/
cp -r shared deployment-package-temp/
cp -r attached_assets deployment-package-temp/

# Copy config files
cp package.json deployment-package-temp/
cp package-lock.json deployment-package-temp/
cp tsconfig.json deployment-package-temp/
cp vite.config.ts deployment-package-temp/
cp tailwind.config.ts deployment-package-temp/
cp postcss.config.js deployment-package-temp/
cp components.json deployment-package-temp/
cp drizzle.config.ts deployment-package-temp/

# Copy deployment scripts
cp build-production.sh deployment-package-temp/
cp deploy.sh deployment-package-temp/

# Create production deployment script
cat > deployment-package-temp/deploy-on-vps.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Tashan Win VIP on VPS..."

# Set permissions
chmod +x build-production.sh
chmod +x deploy.sh

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build production version
echo "🔨 Building production version..."
npm run build

# Build production server
echo "🔧 Building production server..."
npx esbuild server/index-production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index-production.js

echo "✅ Build complete!"

# Set environment variables
echo ""
echo "⚙️  Environment Setup:"
echo "For database storage (recommended):"
echo "export DATABASE_URL='postgresql://username:password@host:5432/database'"
echo ""
echo "For all deployments:"
echo "export NODE_ENV=production"
echo "export PORT=3000"
echo ""

# Start with PM2
echo "🚀 Starting application..."
echo "pm2 start dist/index-production.js --name 'tashan-win-vip' --env production"
echo "pm2 save"
echo ""

echo "🌐 Your app will be available at: http://your-vps-ip:3000"
echo "📊 Admin panel: http://your-vps-ip:3000/admin"

EOF

chmod +x deployment-package-temp/deploy-on-vps.sh

# Create README for deployment
cat > deployment-package-temp/DEPLOYMENT-INSTRUCTIONS.txt << 'EOF'
TASHAN WIN VIP - VPS DEPLOYMENT INSTRUCTIONS
===========================================

1. UPLOAD TO VPS:
   scp -r tashan-win-vip-deployment root@your-vps-ip:/root/

2. SSH TO VPS:
   ssh root@your-vps-ip

3. NAVIGATE TO PROJECT:
   cd /root/tashan-win-vip-deployment

4. RUN DEPLOYMENT SCRIPT:
   chmod +x deploy-on-vps.sh
   ./deploy-on-vps.sh

5. SET ENVIRONMENT VARIABLES:
   # With database (recommended):
   export DATABASE_URL="postgresql://username:password@host:5432/database"
   
   # Always required:
   export NODE_ENV=production
   export PORT=3000

6. START APPLICATION:
   pm2 start dist/index-production.js --name "tashan-win-vip" --env production
   pm2 save

7. VERIFY:
   pm2 list
   curl http://localhost:3000/health

FEATURES INCLUDED:
- ✅ Updated register link with invitation code 487522520975
- ✅ New telegram channel: https://t.me/TashanGamesss
- ✅ Database storage for persistent data
- ✅ Working admin panel
- ✅ Production error handling
- ✅ Health monitoring

EOF

# Create the zip file
echo "🗜️  Creating zip file..."
cd deployment-package-temp
zip -r ../tashan-win-vip-deployment.zip . -x "node_modules/*" "dist/*" ".git/*" "*.log"
cd ..

# Cleanup
rm -rf deployment-package-temp

echo "✅ Deployment package created: tashan-win-vip-deployment.zip"
echo ""
echo "📁 Package Contents:"
echo "   • Complete source code"
echo "   • All assets and configurations"
echo "   • Deployment scripts"
echo "   • Instructions file"
echo ""
echo "📥 Download the zip file and follow the upload instructions below."