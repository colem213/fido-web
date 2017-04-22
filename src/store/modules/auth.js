import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const initialState = {
  user: {
    authenticated: false,
    id: null
  }
}

const state = Object.assign({}, initialState)

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  login ({ commit }, credentials) {
    let { authenticated, tokenParsed, idTokenParsed } = credentials
    commit(types.LOGIN, { authenticated, ...tokenParsed, id: idTokenParsed })
  },
  logout ({ commit }) {
    commit(types.LOGOUT)
  }
}

// mutations
const mutations = {
  [types.LOGIN] (state, user) {
    state.user = user
  },
  [types.LOGOUT] (state) {
    state.user = Object.assign({}, initialState)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
