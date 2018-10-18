<template>
    <div id="app">



        <router-view></router-view>

        <div v-if="$store.state.loggedIn">



            <tabbar class="nav-tab" :v-if="$store.state.loggedIn ">
            <tabbar-item link="/home" selected>
                <i class="icon-wallet" slot="icon"></i>
            </tabbar-item>
            <tabbar-item link="/market">
                <i class="icon-chart" slot="icon"></i>
            </tabbar-item>
            <tabbar-item link="/news">
                <i class="icon-compass" slot="icon"></i>
            </tabbar-item>
            <tabbar-item link="/profile">
                <i class="icon-user" slot="icon"></i>
            </tabbar-item>
            </tabbar>
        </div>

        <div v-else>

            
        </div>

    </div>

</template>

<script>
import {Tabbar, TabbarItem, XButton} from 'vux'
import Index  from '@/components/account/Index'

export default {
  name: 'app',
  components:{
    Tabbar, XButton,
    TabbarItem,
    Index
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './style/style.less';//引入网页字体
@import './assets/iconfont/style.css';//引入网页字体

body {
  background-color: #fbf9fe;
}
</style>
