import Keycloak from 'keycloak-js'

let auth

export default class Auth {

}

export function install (Vue, options) {
  let config = Vue.config.keycloakConfig
  config.url = config.authServerUrl
  auth = Keycloak(Vue.config.keycloakConfig)
  auth.init()
  Vue.$auth = auth
}

export function sync (router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!auth.loggedIn()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })
}

Auth.install = install
