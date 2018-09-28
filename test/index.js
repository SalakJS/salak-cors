const request = require('supertest')
const app = require('./fixture')

describe('test cors', () => {
  let callback
  beforeAll(async () => {
    callback = await app.callback()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('default options', () => {
    it('should not set `Access-Control-Allow-Origin` when request `origin` header missing', async () => {
      const res = await request(callback).get('/corsWithoutOptions').expect(200)

      expect(res.body).toEqual({ name: 'cors' })
      expect(res.header['access-control-allow-origin']).toBeUndefined()
    })

    it('should set `Access-Control-Allow-Origin` when request `origin` header set', async () => {
      const res = await request(callback).get('/corsWithoutOptions').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.body).toEqual({ name: 'cors' })
      expect(res.header['access-control-allow-origin']).toBe('https://aotu.io')
    })

    it('should return 204 on preflight request', async () => {
      const res = await request(callback).options('/corsWithoutOptions').set({
        Origin: 'https://aotu.io',
        'Access-Control-Request-Method': 'POST'
      }).expect(204)

      expect(res.header['access-control-allow-origin']).toBe('https://aotu.io')
      expect(res.header['access-control-allow-methods']).toBe('GET,HEAD,PUT,POST,DELETE,PATCH')
    })

    it('should not preflight request if missing `Access-Control-Request-Method`', async () => {
      await request(callback).options('/corsWithoutOptions').set({
        Origin: 'https://aotu.io'
      }).expect(404)
    })

    it('should set `Vary` to Origin', async () => {
      const res = await request(callback).get('/corsWithoutOptions').set({
        Origin: 'https://aotu.io'
      }).expect(200)
      expect(res.header['vary']).toBe('Origin')
    })
  })

  describe('options.origin=*', () => {
    it('should set `Access-Control-Allow-Origin` to *', async () => {
      const res = await request(callback).get('/corsWithWildcardOrigin').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.header['access-control-allow-origin']).toBe('*')
    })
  })

  describe('options.origin=function', () => {
    it('should disable cors', async () => {
      const res = await request(callback).get('/corsWithOriginFn').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.header['access-control-allow-origin']).toBeUndefined()
    })

    it('should set `Access-Control-Allow-Origin` to *', async () => {
      const res = await request(callback).get('/corsWithOriginFn?cors=cors').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.header['access-control-allow-origin']).toBe('*')
    })
  })

  describe('options.allowMethods', () => {
    it('should work with array', async () => {
      const res = await request(callback).options('/corsWithAllowMethods').set({
        Origin: 'https://aotu.io',
        'Access-Control-Request-Method': 'POST' }).expect(204)

      expect(res.header['access-control-allow-methods']).toBe('GET,POST')
    })

    it('should skip allowMethos', async () => {
      const res = await request(callback).options('/corsWithSkipAllowMethods').set({
        Origin: 'https://aotu.io',
        'Access-Control-Request-Method': 'POST' }).expect(204)

      expect(res.header['access-control-allow-methods']).toBeUndefined()
    })
  })

  describe('options.exposeHeaders', () => {
    it('should set `Access-Control-Expose-Headers` to content-length', async () => {
      const res = await request(callback).get('/corsWithExposeHeaders').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.header['access-control-expose-headers']).toBe('content-length')
    })
  })

  describe('options.allowHeaders', () => {
    it('should set `Access-Control-Allow-Headers` to X-KEY', async () => {
      const res = await request(callback).options('/corsWithAllowHeaders').set({
        Origin: 'https://aotu.io',
        'Access-Control-Request-Method': 'POST'
      }).expect(204)

      expect(res.header['access-control-allow-headers']).toBe('X-KEY')
    })
  })

  describe('options.maxAge', () => {
    it('should set `Access-Control-Max-Age` to 600', async () => {
      const res = await request(callback).options('/corsWithMaxAge').set({
        Origin: 'https://aotu.io',
        'Access-Control-Request-Method': 'POST'
      }).expect(204)

      expect(res.header['access-control-max-age']).toBe('600')
    })
  })

  describe('options.credentials', () => {
    it('should set `Access-Control-Allow-Credentials` to true', async () => {
      const res = await request(callback).get('/corsWithCredentials').set({ Origin: 'https://aotu.io' }).expect(200)

      expect(res.header['access-control-allow-credentials']).toBe('true')
    })
  })
})
