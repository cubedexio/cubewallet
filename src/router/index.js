import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Wallet from '@/components/Wallet'

import Transaction from '@/components/Transaction'
import Market from '@/components/Market'
import News from '@/components/News'
import Profile from '@/components/Profile'

import Register from '@/components/account/Register'
import Index from '@/components/account/Index'


import User from '@/components/wallet/Wallet'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {
          path: '/',
          name: 'Index',
          component: Index,
        //   children: [
        //       {
        //           path: 'register',
        //           name: 'Register',
        //           component: Register
        //       }
        //   ]
      },
      
    {

      path: '/home',
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
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction
    },
    {
      path:'/market',
      name:'Market',
      component:Market
    },
    {
      path:'/news',
      name:'News',
      component:News
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile
    },
    {
        path:'/register',
        name:'Register',
        component:Register
      }
  ]
})
