<template>
  <div id="app">
    <router-view></router-view>

    <tabbar class="nav-tab">
      <tabbar-item link="/" selected>
        <i class="icon-wallet" slot="icon"></i>
      </tabbar-item>
      <tabbar-item link="/market">
        <i class="icon-chart" slot="icon"></i>
      </tabbar-item>
      <tabbar-item link="/news">
        <i class="icon-news-paper" slot="icon"></i>
      </tabbar-item>
      <tabbar-item link="/profile">
        <i class="icon-user" slot="icon"></i>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import {Tabbar, TabbarItem} from 'vux'
export default {
  name: 'app',
  components:{
    Tabbar,
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
