// config-overrides.js
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
      };
      return config;
    },
  };
  