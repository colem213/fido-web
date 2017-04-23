import * as types from '../mutation-types'
import Keycloak from 'keycloak-js'
import store from 'store'
import expirePlugin from 'store/plugins/expire'

store.addPlugin(expirePlugin)

let config = process.env.KC_CONFIG
config.url = config.authServerUrl
const kc = Keycloak(config)

const initOptions = Object.assign({}, getAuth(), { responseMode: 'query' })

function getAuth () {
  let data = store.get('fido-auth')
  if (data === undefined) {
    return undefined
  }
  return JSON.parse(data)
}

function setAuth () {
  if (kc.refreshToken) {
    let data = JSON.stringify({ token: kc.token, idToken: kc.idToken, refreshToken: kc.refreshToken })
    const expiresAt = ((kc.refreshTokenParsed['exp'] - (new Date().getTime() / 1000) + (kc.timeSkew ? kc.timeSkew : 0)) * 1000) + new Date().getTime()
    store.set('fido-auth', data, expiresAt)
  }
}

function clearAuth () {
  store.remove('fido-auth')
}

const { createRegisterUrl, createAccountUrl, createLoginUrl, createLogoutUrl } = kc
// initial state
const initialState = {
  auth: {
    createRegisterUrl,
    createAccountUrl,
    createLoginUrl,
    createLogoutUrl
  },
  user: {
    authenticated: false
  }
}

const state = Object.assign({}, initialState)

// getters
const getters = {
  auth: state => state.auth,
  user: state => state.user
}

// actions
const actions = {
  initAuth (ctx, store) {
    kc.onAuthSuccess = function () {
      store.dispatch('login', kc)
    }
    kc.onAuthLogout = function () {
      store.dispatch('logout', kc)
    }
    kc.init(initOptions)
  },
  login ({ commit }, auth) {
    setAuth()
    commit(types.UPDATED_AUTH, auth)
    commit(types.UPDATED_USER, auth)
  },
  logout ({ commit }, auth) {
    clearAuth()
    commit(types.UPDATED_AUTH, auth)
    commit(types.UPDATED_USER, auth)
  }
}

// mutations
const mutations = {
  [types.UPDATED_AUTH] (state, auth) {
    const { createRegisterUrl, createAccountUrl, createLoginUrl, createLogoutUrl } = auth
    state.auth = { createRegisterUrl, createAccountUrl, createLoginUrl, createLogoutUrl }
  },
  [types.UPDATED_USER] (state, auth) {
    const user = { authenticated: auth.authenticated, ...auth.tokenParsed }
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
