import * as Salak from 'salak'

declare module 'salak' {
  interface SalakConfig {
    cors: {
      enable: boolean
      origin: string | Function
      allowMethos: string | string[]
      exposeHeaders: string | string[]
      allowHeaders: string | string[]
      maxAge: string | number
      credentials: boolean
    }
  }
}
