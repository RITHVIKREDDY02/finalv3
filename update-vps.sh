#!/bin/bash

# TASHAN WIN VIP - Quick VPS Update Script
# Run this script on your VPS after uploading the new deployment package

echo "🔄 Starting Tashan Win VIP update process..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Navigate to web directory
cd /var/www

# Check if backup already exists for today
BACKUP_DIR="tashan-win-vip-backup-$(date +%Y%m%d)"
if [ ! -d "$BACKUP_DIR" ]; then
    echo "💾 Creating backup..."
    cp -r tashan-win-vip "$BACKUP_DIR"
    echo "✅ Backup created: $BACKUP_DIR"
fi

# Stop current application
echo "⏹️ Stopping current application..."
cd tashan-win-vip
pm2 stop tashan-win-vip

# Check for new deployment package
if [ ! -f "/var/www/tashan-win-vip-production.zip" ]; then
    echo "❌ Error: tashan-win-vip-production.zip not found in /var/www/"
    echo "Please upload the deployment package first:"
    echo "scp tashan-win-vip-production.zip root@YOUR_VPS_IP:/var/www/"
    exit 1
fi

# Extract new version
echo "📦 Extracting new version..."
cd /var/www
unzip -o tashan-win-vip-production.zip

# Replace files (preserve logs and custom configs)
echo "🔄 Updating application files..."
cp -r deployment-package/client tashan-win-vip/
cp -r deployment-package/server tashan-win-vip/
cp -r deployment-package/shared tashan-win-vip/
cp -r deployment-package/attached_assets tashan-win-vip/
cp deployment-package/package.json tashan-win-vip/
cp deployment-package/package-lock.json tashan-win-vip/
cp deployment-package/vite.config.ts tashan-win-vip/
cp deployment-package/tailwind.config.ts tashan-win-vip/
cp deployment-package/tsconfig.json tashan-win-vip/
cp deployment-package/postcss.config.js tashan-win-vip/
cp deployment-package/ecosystem.config.js tashan-win-vip/

# Clean up
rm -rf deployment-package
rm tashan-win-vip-production.zip

# Update dependencies
echo "📦 Updating dependencies..."
cd tashan-win-vip
npm install

# Rebuild application
echo "🔨 Building application..."
npm run build

# Set proper permissions
echo "🔒 Setting permissions..."
chown -R www-data:www-data /var/www/tashan-win-vip
chmod -R 755 /var/www/tashan-win-vip

# Restart application
echo "🚀 Starting application..."
pm2 restart tashan-win-vip

# Wait a moment for startup
sleep 3

# Check application status
echo "🔍 Checking application status..."
pm2 status

# Test API endpoint
echo "🧪 Testing API..."
if curl -s http://localhost:5009/api/games > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 App accessible at: http://$(curl -s ifconfig.me):5009"
else
    echo "❌ API test failed. Checking logs..."
    pm2 logs tashan-win-vip --lines 10
fi

echo ""
echo "🎉 Update complete!"
echo ""
echo "Commands to monitor your application:"
echo "  pm2 status              - Check application status"
echo "  pm2 logs tashan-win-vip - View live logs"
echo "  pm2 restart tashan-win-vip - Restart if needed"
echo ""
echo "💾 Previous version backed up to: $BACKUP_DIR"