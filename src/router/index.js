import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Wallet from '@/components/Wallet'
import User from '@/components/User'
// import User from '@/pages/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'wallet',
          name: 'wallet',
          component: Wallet
        },
        {
          path: 'user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})