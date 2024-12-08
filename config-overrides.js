const path = require('path');

module.exports = {
  webpack: (config) => {
    // Добавляем полифиллы для https и http
    config.resolve.fallback = {
      ...config.resolve.fallback,
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
    };

    // Разрешаем импорт модуля https-browserify из node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'https-browserify': path.resolve(__dirname, 'node_modules/https-browserify'),
    };

    return config;
  },
};
