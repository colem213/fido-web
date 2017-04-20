import Keycloak from 'keycloak-js'

let kc

function install (Vue) {
  let config = process.env.KC_CONFIG
  config.url = config.authServerUrl
  kc = this(config)
  let initOptions = { responseMode: 'query' }
  if (localStorage !== undefined) {
    initOptions = Object.assign({}, JSON.parse(localStorage.getItem('fido-auth')), initOptions)
  }
  kc.init(initOptions).success(function (authenticated) {
    if (authenticated) {
      if (localStorage !== undefined) {
        localStorage.setItem('fido-auth', JSON.stringify({ token: kc.token, idToken: kc.idToken, refreshToken: kc.refreshToken }))
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return kc }
  })
  Vue.mixin({
    data () {
      return {
        authenticated: false
      }
    }
  })
}

Keycloak.install = install

export default Keycloak
