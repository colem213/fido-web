import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../auth'
import authMod from './modules/auth'
import authPlugin from './plugins/auth'

Vue.use(Vuex)

const plugin = authPlugin(auth)

export default new Vuex.Store({
  modules: {
    authMod
  },
  plugins: [plugin],
  strict: process.env.NODE_ENV !== 'production'
})
