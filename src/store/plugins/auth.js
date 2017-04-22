import mod from '../modules/auth'
import kc, { initOptions, setAuth } from '../../auth/auth'

export default function authPlugin (auth) {
  return store => {
    kc.init(initOptions)
    auth.onAuthSuccess = function () {
      setAuth()
      mod.actions.login(store, auth)
    }
    auth.onAuthLogout = function () {
      mod.actions.logout()
    }
  }
}
