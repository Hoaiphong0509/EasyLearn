const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // target: 'https://easy-learn.vercel.app',
      // target: 'https://easy-learn-mkcz67zgc-hoaiphong0509.vercel.app/',
      changeOrigin: true
    })
  )
}
