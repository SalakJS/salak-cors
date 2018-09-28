/**
 * CORS middleware
 *
 * @param {Object} options
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 * @return {AsyncFunction} cors middleware
 */

module.exports = (options = {}, app) => {
  options = Object.assign({
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }, options)

  const joinComma = (value) => Array.isArray(value) ? value.join(',') : value

  const keys = ['exposeHeaders', 'allowHeaders', 'allowMethods']

  keys.forEach((key) => {
    if (options[key]) {
      options[key] = joinComma(options[key])
    }
  })

  if (!isNaN(parseInt(options.maxAge, 10))) { // number
    options.maxAge = '' + parseInt(options.maxAge, 10)
  }

  options.credentials = !!options.credentials

  return async (ctx, next) => {
    const requestOrigin = ctx.get('Origin')

    ctx.vary('Origin')

    if (!requestOrigin) {
      await next()
      return
    }

    let origin

    if (typeof options.origin === 'function') {
      origin = options.origin(ctx)
      if (!origin) {
        await next()
        return
      }
    } else {
      origin = options.origin || requestOrigin
    }

    const isOptions = ctx.method === 'OPTIONS'

    if (isOptions) {
      // Preflight Request
      if (!ctx.get('Access-Control-Request-Method')) {
        await next()
        return
      }

      let allowHeaders = options.allowHeaders
      if (!allowHeaders) {
        allowHeaders = ctx.get('Access-Control-Request-Headers')
      }

      if (allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', allowHeaders)
      }

      if (options.maxAge) {
        ctx.set('Access-Control-Max-Age', options.maxAge)
      }

      if (options.allowMethods) {
        ctx.set('Access-Control-Allow-Methods', options.allowMethods)
      }
    }

    ctx.set('Access-Control-Allow-Origin', origin)

    if (options.credentials === true) {
      ctx.set('Access-Control-Allow-Credentials', 'true')
    }

    if (isOptions) {
      ctx.status = 204
      return
    }

    if (options.exposeHeaders) {
      ctx.set('Access-Control-Expose-Headers', options.exposeHeaders)
    }

    await next()
  }
}
