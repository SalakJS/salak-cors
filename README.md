# salak-cors

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/salak-cors.svg?style=flat-square
[npm-url]: https://npmjs.org/package/salak-cors
[travis-image]: https://img.shields.io/travis/SalakJS/salak-cors.svg?style=flat-square
[travis-url]: https://travis-ci.org/SalakJS/salak-cors
[coveralls-image]: https://img.shields.io/codecov/c/github/salakjs/salak-cors.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/salakjs/salak-cors?branch=master
[david-image]: https://img.shields.io/david/SalakJS/salak-cors.svg?style=flat-square
[david-url]: https://david-dm.org/SalakJS/salak-cors
[download-image]: https://img.shields.io/npm/dm/salak-cors.svg?style=flat-square
[download-url]: https://npmjs.org/package/salak-cors

cors for salak 2.0, compatible for koa2.

## Install

```sh
$ npm install --save salak-cors
```

## Usage

### Config

In middleware:

```javascript
module.exports = {
  middleware: [
    {
      name: 'cors',
      package: 'salak-cors'
    }
  ],
  cors: { // options
    origin: '*'
  }
}
```

#### options

- `origin` {String|Function(ctx)} `Access-Control-Allow-Origin`, default is request Origin header
- `allowMethods` {String|Array} `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
- `exposeHeaders` {String|Array} `Access-Control-Expose-Headers`
- `allowHeaders` {String|Array} `Access-Control-Allow-Headers`
- `maxAge` {String|Number} `Access-Control-Max-Age` seconds
- `credentials` {Boolean} `Access-Control-Allow-Credentials`

## LICENSE

[MIT](LICENSE)
