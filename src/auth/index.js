import Keycloak from 'keycloak-js'

let kc

function install (Vue) {
  let config = Vue.config.keycloakConfig
  config.url = config.authServerUrl
  kc = this(config)
  kc.init({responseMode: 'query'})
  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return kc }
  })
}

export function sync (router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (kc.authenticated) {
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

Keycloak.install = install

export default Keycloak
