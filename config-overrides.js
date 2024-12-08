const path = require('path');

module.exports = {
  webpack: (config) => {
    console.log('Webpack config before modification:', config);

    config.resolve.fallback = {
      ...config.resolve.fallback,
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
    };

    console.log('Webpack config after modification:', config);

    return config;
  },
};
