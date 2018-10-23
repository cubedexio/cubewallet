import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Wallet from '@/pages/Wallet'

import Transaction from '@/pages/Transaction'
import Market from '@/pages/Market'
import News from '@/pages/News'
import Profile from '@/pages/Profile'

import Register from '@/pages/account/Register'
import Login from '@/pages/account/Login'
import Index from '@/pages/account/Index'
import ImportWallet from '@/pages/account/ImportWallet'



import User from '@/pages/wallet/Wallet'

import License from '@/pages/license'




Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/license',
            name: 'License',
            component: License,
        },
        {
          path: '/',
          name: 'Index',
          component: Index
        },
        {
            path: '/importwallet',
            name: 'ImportWallet',
            component: ImportWallet
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
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]
})
