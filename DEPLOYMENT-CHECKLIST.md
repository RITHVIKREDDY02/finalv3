# VPS Deployment Checklist

## Before You Start
- [ ] Download the project ZIP file from Replit
- [ ] Have VPS login credentials ready (IP, username, password/SSH key)
- [ ] Ensure VPS meets minimum requirements (1GB RAM, Ubuntu 20.04+)

## Quick Deployment Steps

### 1. Upload Files to VPS
```bash
# Connect to VPS
ssh root@YOUR_VPS_IP

# Create directory
mkdir -p /var/www/tashan-win-vip
cd /var/www/tashan-win-vip

# Upload ZIP file (choose one method):
# Method A: SCP from local machine
scp tashan-win-vip.zip root@YOUR_VPS_IP:/var/www/tashan-win-vip/

# Method B: If ZIP is hosted online
wget YOUR_ZIP_URL -O tashan-win-vip.zip
```

### 2. Extract and Run Deployment Script
```bash
# Extract files
unzip tashan-win-vip.zip
rm tashan-win-vip.zip

# Run automated deployment
chmod +x deploy.sh
./deploy.sh
```

### 3. Verify Deployment
- [ ] Check PM2 status: `pm2 status`
- [ ] View logs: `pm2 logs tashan-win-vip`
- [ ] Test locally: `curl http://localhost:5009`
- [ ] Test externally: Visit `http://YOUR_VPS_IP:5009`

## Manual Steps (if deploy.sh fails)

### Install Node.js and PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs
npm install -g pm2
```

### Install Dependencies and Build
```bash
cd /var/www/tashan-win-vip
npm install
npm run build
mkdir -p logs
```

### Configure Firewall
```bash
ufw allow 5009
ufw allow ssh
ufw --force enable
```

### Start Application
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## Application Details
- **Port**: 5009
- **Memory Limit**: 256MB
- **Auto-restart**: Enabled
- **Process Manager**: PM2
- **Architecture**: In-memory storage (no database required)

## Access Points
- **Main Application**: `http://YOUR_VPS_IP:5009`
- **Admin Panel**: `http://YOUR_VPS_IP:5009/admin` (Password: Samara@tashan)
- **Wingo Games**: `http://YOUR_VPS_IP:5009/wingo`
- **TRX Wingo**: `http://YOUR_VPS_IP:5009/trx-wingo`

## Useful Commands
```bash
# Check application status
pm2 status

# View real-time logs
pm2 logs tashan-win-vip

# Restart application
pm2 restart tashan-win-vip

# Stop application
pm2 stop tashan-win-vip

# Monitor performance
pm2 monit
```

## Troubleshooting
1. **Can't access on port 5009**: Check firewall and VPS provider settings
2. **Application won't start**: Check `pm2 logs` for errors
3. **Out of memory**: Upgrade VPS or check for memory leaks
4. **Build fails**: Ensure Node.js 20+ is installed

## Files Included in ZIP
- Complete application source code
- Pre-configured PM2 ecosystem
- Automated deployment script
- All dependencies and assets
- Documentation and guides

✅ Your crypto prediction platform is ready for production deployment!