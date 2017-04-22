// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import auth from './auth'

Vue.config.productionTip = false

// sync(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  auth,
  template: '<App/>',
  components: { App }
})
