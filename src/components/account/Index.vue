<template>
  <div id="app">
      <transition name="fade">
        <div class="start" ref="start" v-if="show">
          <img src="../../assets/images/start.jpg" alt="">
        </div>
      </transition>
      <group>
          Index Page
            <!-- <x-button type='primary' >login</x-button> -->
            <!-- <x-button type='default' link="/register">register</x-button> -->


            <!-- <router-link  to="/register" class='to-hide'>Go to register</router-link> -->
            <!-- <router-view></router-view> -->
            <a href="/register">Go register</a>

      </group>



  </div>
</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册

</i18n>

<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Cell,
    Tabbar,
    TabbarItem
  },
  data () {
    return{
      show:true
    }
  },
  mounted(){
    setTimeout(()=>{
      this.show = false;
    },2000)
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
