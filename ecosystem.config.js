// PM2 ecosystem configuration for VPS deployment
module.exports = {
  apps: [
    {
      name: 'tashan-win-vip',
      script: 'dist/index.js',
      instances: 1, // Single instance for in-memory storage
      exec_mode: 'fork', // Fork mode for single instance
      env: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      // Performance optimizations
      max_memory_restart: '256M', // Restart if memory exceeds 256MB
      node_args: '--max-old-space-size=256', // Limit Node.js heap to 256MB
      
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart settings
      watch: false, // Don't watch files in production
      ignore_watch: ['node_modules', 'logs'],
      max_restarts: 5,
      min_uptime: '10s',
      
      // Health monitoring
      kill_timeout: 5000,
      listen_timeout: 8000,
      
      // Environment-specific settings
      merge_logs: true,
      autorestart: true
    }
  ],
  
  deploy: {
    production: {
      user: 'root',
      host: ['your-vps-ip'], // Replace with your VPS IP
      ref: 'origin/main',
      repo: 'your-repo-url', // Replace with your repository URL
      path: '/var/www/tashan-win-vip',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};