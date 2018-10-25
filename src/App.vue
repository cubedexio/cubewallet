<template>
    <div id="app">
        <router-view></router-view>

        <div v-if="$store.state.loggedIn">

            <tabbar class="nav-tab" :v-if="$store.state.loggedIn ">
            <tabbar-item @click.native="go('home')" selected>
                <i class="icon-wallet" slot="icon"></i>
            </tabbar-item>
            <tabbar-item @click.native="go('market')" >
                <i class="icon-chart" slot="icon"></i>
            </tabbar-item>
            <tabbar-item @click.native="go('news')" >
                <i class="icon-compass" slot="icon"></i>
            </tabbar-item>
            <tabbar-item  @click.native="go('profile')">
                <i class="icon-settings" slot="icon"></i>
            </tabbar-item>
            </tabbar>
        </div>

        <div v-else>


        </div>

    </div>

</template>

<script>
  import {Tabbar, TabbarItem, XButton} from 'vux'
  import Index from '@/pages/account/Index'

  export default {
    name: 'app',
    components: {
      Tabbar, XButton,
      TabbarItem,
      Index
    },
    methods:{
      go(str){
        this.$router.push('/'+str)
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './style/style.less';//引入网页字体
@import './assets/iconfont/style.css';//引入网页字体

</style>
