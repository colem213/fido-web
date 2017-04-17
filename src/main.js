// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './auth'

Vue.config.productionTip = false

Vue.config.keycloakConfig = process.env.KC_CONFIG
// sync(router)

Vue.use(Auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
