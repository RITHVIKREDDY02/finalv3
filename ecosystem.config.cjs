// PM2 ecosystem configuration for VPS deployment (CommonJS)
module.exports = {
  apps: [
    {
      name: 'tashan-win-vip',
      script: 'dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www',
      env: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5009
      },
      max_memory_restart: '512M',
      node_args: '--max-old-space-size=512 --experimental-modules',
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_restarts: 10,
      min_uptime: '5s',
      kill_timeout: 5000,
      listen_timeout: 8000,
      merge_logs: true,
      autorestart: true,
      restart_delay: 1000
    }
  ]
};