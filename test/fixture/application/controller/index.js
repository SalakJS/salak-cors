const { Controller } = require('salak')

class Index extends Controller {}

['corsWithoutOptions',
  'corsWithWildcardOrigin',
  'corsWithAllowMethods',
  'corsWithSkipAllowMethods',
  'corsWithExposeHeaders',
  'corsWithAllowHeaders',
  'corsWithMaxAge',
  'corsWithCredentials',
  'corsWithOriginFn'].forEach((item) => {
  const action = item[0].toUpperCase() + item.slice(1)

  Index.prototype[`action${action}`] = async () => {
    return {
      name: 'cors'
    }
  }
})

module.exports = Index
