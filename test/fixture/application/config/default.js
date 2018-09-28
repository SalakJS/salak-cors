const cors = require('../../../..')

module.exports = (app) => {
  const config = {}

  const keys = ['cors', 'corsOrigin', 'corsOriginFn', 'corsAllowMethods', 'corsWithSkipAllowMethods', 'corsWithExposeHeaders', 'corsWithAllowHeaders', 'corsWithMaxAge', 'corsWithCredentials']

  config.middleware = keys.map((item) => {
    return {
      name: item,
      package: cors
    }
  })

  config.cors = {
    match: '/corsWithoutOptions'
  }

  config.corsOrigin = {
    origin: '*',
    match: '/corsWithWildcardOrigin'
  }

  config.corsAllowMethods = {
    allowMethods: ['GET', 'POST'],
    match: '/corsWithAllowMethods'
  }

  config.corsOriginFn = {
    origin: (ctx) => {
      if (ctx.request.query.cors) {
        return '*'
      }

      return false
    },
    match: '/corsWithOriginFn'
  }

  config.corsWithSkipAllowMethods = {
    allowMethods: null,
    match: '/corsWithSkipAllowMethods'
  }

  config.corsWithExposeHeaders = {
    exposeHeaders: 'content-length',
    match: '/corsWithExposeHeaders'
  }

  config.corsWithAllowHeaders = {
    allowHeaders: ['X-KEY'],
    match: '/corsWithAllowHeaders'
  }

  config.corsWithMaxAge = {
    maxAge: 600,
    match: '/corsWithMaxAge'
  }

  config.corsWithCredentials = {
    credentials: true,
    match: '/corsWithCredentials'
  }

  return config
}
