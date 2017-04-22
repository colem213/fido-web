import * as types from './mutation-types'

export const loggedIn = ({ commit }, credentials) => {
  if (credentials.authenticated) {
    let { authenticated, tokenParsed, idTokenParsed } = credentials
    commit(types.AUTHENTICATED, { authenticated, ...tokenParsed, id: idTokenParsed })
  }
}
