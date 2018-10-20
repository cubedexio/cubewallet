<template>
    <div id="app">

    <transition name="fade">
      <div class="start" ref="start" v-if="show">
        <img src="@/assets/images/start.png" alt="">
      </div>
    </transition>


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
  import Index from '@/pages/account/Index'

  export default {
    name: 'app',
    components: {
      Tabbar, XButton,
      TabbarItem,
      Index
    },
    data() {
      return {
        show: false
      }
    },
    mounted() {
      // console.log(this.$refs)
      if(this.$refs.start){
        let w = window.outerWidth;
        let h = window.outerHeight;
        console.log(w + ' . ' + h);
        this.$refs.start.style.width = w + 'px';
        this.$refs.start.style.height = h + 'px';

      }

      // setTimeout(()=>{
      //   this.show = false;
      // },5000)
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './style/style.less';//引入网页字体
@import './assets/iconfont/style.css';//引入网页字体

  /*body {
    background-color: #fbf9fe;
  }*/

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
