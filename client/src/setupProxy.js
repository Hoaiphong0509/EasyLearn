const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://easy-learn.vercel.app/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
