// Import funkcji createProxyMiddleware z pakietu http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Eksportuje funkcję, która ustawia middleware proxy dla danego aplikacji.
 * Middleware przekierowuje żądania z aplikacji do docelowego serwera.
 */
module.exports = function(app) {
  app.use(
    '/radios',
    createProxyMiddleware({
      target: 'http://localhost:8080',  // Docelowy serwer, do którego będą przekierowywane żądania
      changeOrigin: true,  // Zmienia nagłówek `Host` żądania na adres docelowy (serwer docelowy będzie widział, że żądanie pochodzi od hosta).
    })
  );
};