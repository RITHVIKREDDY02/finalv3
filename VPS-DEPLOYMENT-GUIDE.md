# VPS Deployment Guide for Tashan Win VIP Prediction Platform

## Prerequisites

### VPS Requirements
- **Operating System**: Ubuntu 20.04+ or CentOS 7+
- **RAM**: Minimum 1GB (2GB recommended)
- **Storage**: Minimum 10GB free space
- **Network**: Public IP with port 5009 accessible

### Local Requirements
- Your project ZIP file downloaded from Replit
- SSH access to your VPS
- Basic terminal/command line knowledge

## Step 1: Prepare Your VPS

### 1.1 Connect to VPS
```bash
ssh root@YOUR_VPS_IP
# Replace YOUR_VPS_IP with your actual VPS IP address
```

### 1.2 Update System
```bash
# For Ubuntu/Debian
apt update && apt upgrade -y

# For CentOS/RHEL
yum update -y
```

### 1.3 Install Node.js 20
```bash
# Install Node.js 20 (recommended version)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.4 Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### 1.5 Install and Configure Nginx (Optional - for domain setup)
```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

## Step 2: Upload and Extract Project

### 2.1 Create Project Directory
```bash
mkdir -p /var/www/tashan-win-vip
cd /var/www/tashan-win-vip
```

### 2.2 Upload ZIP File
**Option A: Using SCP (from your local machine)**
```bash
scp tashan-win-vip.zip root@YOUR_VPS_IP:/var/www/tashan-win-vip/
```

**Option B: Using wget (if ZIP is hosted online)**
```bash
wget YOUR_ZIP_DOWNLOAD_URL -O tashan-win-vip.zip
```

**Option C: Using SFTP**
```bash
sftp root@YOUR_VPS_IP
put tashan-win-vip.zip /var/www/tashan-win-vip/
exit
```

### 2.3 Extract and Setup
```bash
cd /var/www/tashan-win-vip
unzip tashan-win-vip.zip
rm tashan-win-vip.zip

# If files are in a subfolder, move them up
# mv tashan-win-vip-main/* . && rmdir tashan-win-vip-main
```

## Step 3: Install Dependencies and Build

### 3.1 Install Node Dependencies
```bash
cd /var/www/tashan-win-vip
npm install
```

### 3.2 Build the Application
```bash
npm run build
```

### 3.3 Create Log Directory
```bash
mkdir -p logs
```

## Step 4: Configure Environment

### 4.1 Create Environment File (Optional)
```bash
cat > .env << EOF
NODE_ENV=production
PORT=5009
EOF
```

### 4.2 Set Proper Permissions
```bash
chown -R www-data:www-data /var/www/tashan-win-vip
chmod -R 755 /var/www/tashan-win-vip
```

## Step 5: Configure Firewall

### 5.1 Allow Port 5009
```bash
# Ubuntu/Debian (ufw)
ufw allow 5009
ufw allow ssh
ufw --force enable

# CentOS/RHEL (firewalld)
firewall-cmd --permanent --add-port=5009/tcp
firewall-cmd --reload
```

## Step 6: Start Application with PM2

### 6.1 Start the Application
```bash
cd /var/www/tashan-win-vip
pm2 start ecosystem.config.js --env production
```

### 6.2 Save PM2 Configuration
```bash
pm2 save
pm2 startup
# Follow the instructions shown by PM2 startup command
```

### 6.3 Verify Application is Running
```bash
pm2 status
pm2 logs tashan-win-vip
```

## Step 7: Test Your Application

### 7.1 Test Locally on VPS
```bash
curl http://localhost:5009
```

### 7.2 Test from External
Open your browser and visit:
```
http://YOUR_VPS_IP:5009
```

## Step 8: Optional - Setup Domain with Nginx

### 8.1 Create Nginx Configuration
```bash
cat > /etc/nginx/sites-available/tashan-win-vip << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:5009;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### 8.2 Enable Site
```bash
ln -s /etc/nginx/sites-available/tashan-win-vip /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 8.3 Setup SSL with Let's Encrypt (Optional)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 9: Monitoring and Maintenance

### 9.1 Monitor Application
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs tashan-win-vip

# Monitor real-time
pm2 monit
```

### 9.2 Restart Application
```bash
pm2 restart tashan-win-vip
```

### 9.3 Update Application
```bash
cd /var/www/tashan-win-vip
# Upload new ZIP file and extract
npm install
npm run build
pm2 restart tashan-win-vip
```

## Troubleshooting

### Common Issues

1. **Port 5009 not accessible**
   - Check firewall settings
   - Verify VPS provider allows custom ports
   - Check if application is running: `pm2 status`

2. **Application won't start**
   - Check logs: `pm2 logs tashan-win-vip`
   - Verify Node.js version: `node --version`
   - Check build files exist: `ls dist/`

3. **Out of memory errors**
   - The app is optimized for low memory (256MB limit)
   - Check available memory: `free -h`
   - Consider upgrading VPS if needed

4. **Failed to fetch errors**
   - Ensure application is running on correct port
   - Check if API endpoints are accessible: `curl http://localhost:5009/api/games`

### Log Locations
- PM2 logs: `/root/.pm2/logs/`
- Application logs: `/var/www/tashan-win-vip/logs/`
- Nginx logs: `/var/log/nginx/`

## Security Notes

- Change default SSH port
- Use SSH keys instead of passwords
- Keep system updated: `apt update && apt upgrade`
- Consider using a firewall service
- Regular backups of application data

## Performance Optimization

- The application uses in-memory storage for optimal performance
- Memory limit set to 256MB (configurable in ecosystem.config.js)
- Rate limiting built-in for API protection
- Compression middleware enabled

## Support

For issues specific to the application:
1. Check PM2 logs first
2. Verify all dependencies are installed
3. Ensure build completed successfully
4. Check network connectivity and firewall settings

Your crypto prediction platform should now be running successfully on your VPS at `http://YOUR_VPS_IP:5009`!