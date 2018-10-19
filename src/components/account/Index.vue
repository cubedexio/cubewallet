<template>
  <div id="app">
      <group>
          Index Page
          {{ $store.state.loggedIn }}
            <x-button type='primary' link="/login">login</x-button>
            <x-button type='default' link="/register">register</x-button>


            <!-- <router-link  to="/register" class='to-hide'>Go to register</router-link> -->
            <!-- <router-view></router-view> -->


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
}
</script>

<style>
</style>
