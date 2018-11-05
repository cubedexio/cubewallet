import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Wallet from '@/pages/Wallet'

import Transaction from '@/pages/Transaction'
import Transfer from '@/pages/Transfer'
import Market from '@/pages/Market'
import News from '@/pages/News'
import Profile from '@/pages/Profile'
import TokenDetails from '@/pages/TokenDetails'
import TokenIntro from '@/pages/TokenIntro'
import About from '@/pages/About'

import Register from '@/pages/account/Register'
import Login from '@/pages/account/Login'
import Forgot from '@/pages/account/Forgot'

import Index from '@/pages/account/Index'
import ImportWallet from '@/pages/eos/ImportWallet'
import CreateWallet from '@/pages/eos/CreateWallet'
import CreateWalletPay from '@/pages/eos/CreateWalletPay'
import CreateWalletDone from '@/pages/eos/CreateWalletDone'
import EOSIndex from '@/pages/eos/Index'

// import ComingSoon from '@/pages/ComingSoon'


import User from '@/pages/wallet/Wallet'

import License from '@/pages/license'




Vue.use(Router)

export default new Router({
    // mode:'history',
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
            path: '/createwallet',
            name: 'CreateWallet',
            component: CreateWallet
        },
        {
            path: '/createwalletPay',
            name: 'CreateWalletPay',
            component: CreateWalletPay
        },
        {
            path: '/createwalletdone',
            name: 'CreateWalletDone',
            component: CreateWalletDone
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
      path: '/transfer',
      name: 'transfer',
      component: Transfer
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
      },
    {
        path: '/forgot',
        name: 'Forgot',
        component: Forgot
    },
    {
      path: '/tokendetails/:code',
      name:'TokenDetails',
      component:TokenDetails
    },
    {
      path:'/tokenintro/:code',
      name:'TokenIntro',
      component:TokenIntro
    },
    {
      path:'/about',
      name:About,
      component:About
    },
    {
      path: '/eosindex',
      name: 'EOSIndex',
      component: EOSIndex
    },
    // ,
    //   {
    //     path:'/comingsoon',
    //     name:'ComingSoon',
    //     component:ComingSoon
    //   }
    ]
})
