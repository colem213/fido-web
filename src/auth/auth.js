import Keycloak from 'keycloak-js'
import store from 'store'
import expirePlugin from 'store/plugins/expire'

store.addPlugin(expirePlugin)

let config = process.env.KC_CONFIG
config.url = config.authServerUrl
const kc = Keycloak(config)

export const initOptions = Object.assign({}, getAuth(), { responseMode: 'query' })

export function getAuth () {
  let data = store.get('fido-auth')
  if (data === undefined) {
    return undefined
  }
  return JSON.parse(data)
}

export function setAuth () {
  if (kc.refreshToken) {
    let data = JSON.stringify({ token: kc.token, idToken: kc.idToken, refreshToken: kc.refreshToken })
    const expiresAt = ((kc.refreshTokenParsed['exp'] - (new Date().getTime() / 1000) + (kc.timeSkew ? kc.timeSkew : 0)) * 1000) + new Date().getTime()
    store.set('fido-auth', data, expiresAt)
  }
}

function install (Vue) {
  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return kc }
  })
}

kc.install = install

export default kc
