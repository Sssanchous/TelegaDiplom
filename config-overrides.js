const path = require('path');

module.exports = {
  webpack: (config) => {
    console.log('Webpack config before modification:', config);

    config.resolve.fallback = {
      ...config.resolve.fallback,
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      'https-browserify': path.resolve(__dirname, 'src/libs/https-browserify'), // Указываем путь к вашему файлу
    };

    console.log('Webpack config after modification:', config);

    return config;
  },
};
