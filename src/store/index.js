import Vue from 'vue'
import Vuex from 'vuex'
// import profile from './modules/profile'
// import wallet from './modules/wallet'
// import createLogger from '../src/plugins/logger'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

import createPersistedState from 'vuex-persistedstate'



export default new Vuex.Store({
    state: {
        count: 0,
        loggedIn: false,
        privateKey: undefined,
        eosAccountName: undefined
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setLoggedIn (state, login) {
            state.loggedIn = login
        },
        setPrivateKey (state, key) {
            state.privateKey = key
        },
        setEOSAccountName (state, name) {
            state.eosAccountName = name
        }
    },
  modules: {
    // profile,
    // wallet
  },
  strict: debug,
  plugins: debug ? [createLogger(),createPersistedState()] : [createPersistedState()]
  // plugins: [createPersistedState()]
    // plugins: debug ? [createLogger()] : []
})
