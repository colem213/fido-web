// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './auth'

Vue.config.productionTip = false

Vue.config.keycloakConfig = process.env.KC_CONFIG
// sync(router)
Vue.use(auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  auth,
  template: '<App/>',
  components: { App }
})
