// PM2 ecosystem configuration for VPS deployment (CommonJS)
module.exports = {
  apps: [
    {
      name: 'tashan-win-vip',
      script: 'dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      max_memory_restart: '256M',
      node_args: '--max-old-space-size=256',
      max_restarts: 5,
      min_uptime: '10s',
      autorestart: true
    }
  ]
};