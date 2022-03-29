const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    'api/*',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
  // app.use(
  //   'api/auth/google',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true
  //   })
  // )
  // app.use(
  //   'auth/facebook',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true
  //   })
  // )
  // app.use(
  //   'auth/github',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true
  //   })
  // )
  // app.use(proxy('api/auth/google', { target: 'http://localhost:5000' }))
  // app.use(proxy('auth/facebook', { target: 'http://localhost:5000' }))
  // app.use(proxy('auth/github', { target: 'http://localhost:5000' }))
  // app.use(proxy('api/*', { target: 'http://localhost:5000' }))
}
