#!/bin/bash

# Tashan Win VIP - Quick VPS Deployment Script
# Run this script on your VPS after uploading the project files

echo "🚀 Starting Tashan Win VIP deployment..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx (optional)
echo "📦 Installing Nginx..."
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Create logs directory
mkdir -p logs

# Set permissions
echo "🔒 Setting permissions..."
chown -R www-data:www-data .
chmod -R 755 .

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 5009
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Start application
echo "🚀 Starting application..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# Test application
echo "🧪 Testing application..."
sleep 5
if curl -s http://localhost:5009 > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 Access your app at: http://$(curl -s ifconfig.me):5009"
else
    echo "❌ Application failed to start. Check logs with: pm2 logs"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Commands to manage your application:"
echo "  pm2 status              - Check application status"
echo "  pm2 logs tashan-win-vip - View application logs"
echo "  pm2 restart tashan-win-vip - Restart application"
echo "  pm2 stop tashan-win-vip    - Stop application"
echo ""
echo "🔧 Application is configured to run on port 5009"
echo "📊 Memory limit: 256MB (configurable in ecosystem.config.js)"
echo "🔄 Auto-restart enabled"