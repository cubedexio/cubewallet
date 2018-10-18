<template>
    <div id="app">



        <div v-if="$store.state.loggedIn">


            <router-view></router-view>

            <tabbar class="nav-tab" :v-if="$store.state.loggedIn ">
            <tabbar-item link="/" selected>
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
            <x-button type='primary' >login</x-button>
            <x-button type='default' link="/register">register</x-button>

        </div>

    </div>

</template>

<script>
import {Tabbar, TabbarItem, XButton} from 'vux'
export default {
  name: 'app',
  components:{
    Tabbar, XButton,
    TabbarItem
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
