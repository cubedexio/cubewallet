<template>
  <div id="app">



      <group title="Login">
          {{ $store.state.loggedIn }}

          <x-input title="phone" type='text' />
          <x-input title="password" type='text' />



          <x-button type='primary' @click.native="onLogin">Login</x-button>


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
//   data () {

//   }
    methods: {
        onLogin: function() {
            console.log('onLogin')
            this.$store.commit('setLoggedIn', true)
            this.$router.replace('/home')
        }
    }
}
</script>

<style>
.to-hide {
    display: none;
}

</style>
