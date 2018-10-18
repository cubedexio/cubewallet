import Vue from 'vue'
import Vuex from 'vuex'
// import profile from './modules/profile'
// import wallet from './modules/wallet'
// import createLogger from '../src/plugins/logger'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'



export default new Vuex.Store({
    state: {
        count: 0,
        loggedIn: false
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setLoggedIn (state, login) {
            state.loggedIn = login
        }
    },
  modules: {
    // profile,
    // wallet
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
