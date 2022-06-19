const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target: 'https://easy-learn.vercel.app',
      changeOrigin: true
    })
  )
}
