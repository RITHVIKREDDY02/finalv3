# VPS Deployment Guide for Tashan Win VIP

## Deployment Issue Fix

The deployment was failing due to ES module import errors. Here's the complete fix:

### Issues Identified:
1. **ERR_MODULE_NOT_FOUND**: ES module imports not properly handled in production bundle
2. **Missing production dependencies**: Required packages not available in production environment
3. **PM2 configuration**: Not optimized for ES modules

### Solution Steps:

#### 1. Build for Production
```bash
# Run this in your local development environment before zipping
npm run build
cp package-production.json dist/package.json
cd dist && npm install --production
cd ..
```

#### 2. Updated Deployment Script
```bash
# On your VPS, replace the deployment commands with:
cd /var/www
rm -rf tashan-win-vip/
unzip -o tashan-win-vip-final.zip
cd tashan-win-vip

# Install production dependencies
cd dist
npm install --production
cd ..

# Set environment variables
export NODE_ENV=production
export PORT=5009
mkdir -p logs

# Stop any existing PM2 processes
pm2 delete tashan-win-vip 2>/dev/null || true

# Start with updated PM2 config
pm2 start ecosystem.config.cjs --env production

# Verify deployment
pm2 status
pm2 logs tashan-win-vip --lines 10
curl http://localhost:5009/api/games
```

#### 3. Key Changes Made:

**A. Created production package.json** (`package-production.json`):
- Minimal dependencies for production
- Proper ES module configuration
- Only includes runtime dependencies

**B. Updated PM2 configuration** (`ecosystem.config.cjs`):
- Added `--experimental-modules` flag for ES module support
- Increased memory limits
- Better error handling and restart policies
- Set correct working directory

**C. Fixed module imports**:
- Externalized key dependencies in build process
- Proper ES module bundling
- Production-ready dependency management

### Verification Steps:
1. **Check PM2 status**: `pm2 status` should show app as "online"
2. **Check logs**: `pm2 logs tashan-win-vip` should show no errors
3. **Test API**: `curl http://localhost:5009/api/games` should return JSON data
4. **Test full app**: Visit your domain to ensure frontend loads

### Troubleshooting:
If you still get module errors:
1. Ensure Node.js version is 18+ on your VPS
2. Clear PM2 cache: `pm2 flush`
3. Restart PM2 daemon: `pm2 kill && pm2 resurrect`

The app should now deploy successfully and be accessible on port 5009.