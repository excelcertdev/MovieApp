module.exports = {
  apps: [
    {
      name: 'movieApp',
      exec_mode: 'cluster',
      instances: '1',
      script: 'app.js',
      args: 'start',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
