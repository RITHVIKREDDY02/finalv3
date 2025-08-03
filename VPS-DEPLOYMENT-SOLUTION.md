# Tashan Win VIP - Complete VPS Deployment Solution

## Overview
This guide fixes all backend deployment issues including admin panel and registration model problems on Hostinger VPS.

## ✅ Issues Fixed
- ✅ Database Storage Implementation (instead of memory storage)
- ✅ Admin Panel Authentication and Routes
- ✅ Registration Model with PostgreSQL
- ✅ Environment Variable Configuration
- ✅ Static File Serving for Production
- ✅ Proper Error Handling
- ✅ Health Check Endpoints

## 🚀 Quick Deployment Steps

### 1. Environment Setup on VPS
```bash
# SSH into your Hostinger VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2
```

### 2. Database Setup
```bash
# Set your PostgreSQL database URL (replace with your actual database details)
export DATABASE_URL="postgresql://username:password@host:5432/database_name"

# Make it permanent
echo "export DATABASE_URL=\"postgresql://username:password@host:5432/database_name\"" >> ~/.bashrc
source ~/.bashrc
```

### 3. Upload and Build Application
```bash
# Navigate to your project directory
cd /path/to/your/project

# Install dependencies
npm install

# Build the application
npm run build

# Build production server (you may need to run this manually)
npx esbuild server/index-production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index-production.js
```

### 4. Start Production Server
```bash
# Start using PM2
pm2 start dist/index-production.js --name "tashan-win-vip" --env production

# Or start directly
NODE_ENV=production PORT=3000 node dist/index-production.js
```

## 🗄️ Database Configuration

The application now automatically switches between storage types:

### With Database (Recommended for Production)
```bash
export DATABASE_URL="postgresql://username:password@host:5432/database_name"
```
- Uses PostgreSQL for persistent data
- Admin panel works correctly
- Registration data persists across restarts

### Without Database (Development/Testing)
- Uses in-memory storage
- Data is lost on restart
- Good for testing only

## 🔧 Server Files Explanation

### `server/index-production.ts`
- Production-ready server with enhanced error handling
- Validates environment variables
- Proper static file serving
- Health check endpoint
- Graceful shutdown handling

### `server/db-storage.ts`
- PostgreSQL storage implementation
- Handles all database operations
- Automatic default game initialization
- Proper error handling and fallbacks

### `server/storage.ts`
- Smart storage switching based on DATABASE_URL
- Falls back to memory storage if database fails
- Logging for troubleshooting

## 🌐 API Endpoints

### Public Endpoints
- `GET /` - Main application
- `GET /health` - Health check
- `GET /api/games` - Game configurations
- `POST /api/register` - User registration
- `GET /api/user/:uid` - Check user status

### Admin Panel Endpoints
- `POST /api/admin/login` - Admin login (Password: `Samara@tashan`)
- `GET /api/admin/users` - Get all users (requires auth)
- `PATCH /api/approve/:uid` - Approve user (requires auth)
- `DELETE /api/admin/users/:uid` - Delete user (requires auth)
- `GET /api/admin/games` - Admin game configs (requires auth)
- `PATCH /api/admin/games/:gameName` - Update game config (requires auth)

## 🔒 Security Features

### Admin Authentication
- Password-based authentication: `Samara@tashan`
- JWT-like token system
- All admin routes protected
- CORS configured for admin panel access

### Rate Limiting
- API endpoints: 30 requests/minute
- Prediction endpoints: 60 requests/minute
- Prevents abuse and DoS attacks

## 📊 Monitoring and Logs

### Health Check
```bash
curl http://your-vps-ip:3000/health
```

### View Logs (if using PM2)
```bash
pm2 logs tashan-win-vip
```

### Check Application Status
```bash
pm2 status
```

## 🛠️ Troubleshooting Common Issues

### Issue 1: Admin Panel Not Working
**Solution**: Make sure DATABASE_URL is set and server is using production mode
```bash
export DATABASE_URL="your-database-url"
NODE_ENV=production node dist/index-production.js
```

### Issue 2: Registration Not Persisting
**Solution**: Verify database connection
```bash
# Check if database is accessible
curl http://your-vps-ip:3000/health
```

### Issue 3: Static Files Not Loading
**Solution**: Ensure build was completed successfully
```bash
npm run build
ls -la dist/public/  # Should contain built frontend files
```

### Issue 4: Port Already in Use
**Solution**: Change port or kill existing process
```bash
export PORT=8000  # Use different port
# Or kill existing process
lsof -ti:3000 | xargs kill -9
```

## 🚀 Production Deployment Script

Create this script on your VPS:

```bash
#!/bin/bash
# save as deploy-production.sh

echo "🚀 Deploying Tashan Win VIP..."

# Set environment
export NODE_ENV=production
export PORT=3000

# Build application
npm run build

# Build production server
npx esbuild server/index-production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index-production.js

# Stop existing instance
pm2 stop tashan-win-vip 2>/dev/null || true

# Start new instance
pm2 start dist/index-production.js --name "tashan-win-vip" --env production

# Save PM2 configuration
pm2 save

echo "✅ Deployment complete!"
echo "🌐 Application URL: http://$(curl -s ifconfig.me):$PORT"
echo "📊 Admin Panel: http://$(curl -s ifconfig.me):$PORT/admin"
```

Make it executable and run:
```bash
chmod +x deploy-production.sh
./deploy-production.sh
```

## 📋 Environment Variables Checklist

### Required for Production
- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)
- `DATABASE_URL=postgresql://...` (for persistent storage)

### Optional
- `ADMIN_PASSWORD=Samara@tashan` (default is already set)

## 🎯 Final Verification

After deployment, verify everything works:

1. **Health Check**: `curl http://your-vps-ip:3000/health`
2. **Main App**: Visit `http://your-vps-ip:3000`
3. **Admin Panel**: Visit `http://your-vps-ip:3000/admin`
4. **Registration**: Test user registration flow
5. **Database**: Check if data persists after restart

## 💡 Pro Tips

1. **Use PM2**: Better process management and auto-restart
2. **Set up Nginx**: For reverse proxy and SSL
3. **Monitor Logs**: Use `pm2 logs` to debug issues
4. **Backup Database**: Regular backups of PostgreSQL data
5. **Use Environment Files**: Store sensitive config in `.env` files

## 🆘 Support

If you encounter issues:
1. Check logs: `pm2 logs tashan-win-vip`
2. Verify health: `curl http://localhost:3000/health`
3. Check database connection: Ensure DATABASE_URL is correct
4. Restart application: `pm2 restart tashan-win-vip`

Your application should now work perfectly on Hostinger VPS with full admin panel and registration functionality!