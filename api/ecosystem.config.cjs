module.exports = {
  apps: [
    {
      name: "snakes",
      script: "./index.js",
      cwd: "/root/code/snake-meal-tracker/api",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "256M",
      env_file: ".env",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
