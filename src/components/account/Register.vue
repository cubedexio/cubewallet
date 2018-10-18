<template>
  <div id="app">



      <group title="Register">
          <x-input title="phone" type='text' />
          <x-input title="password" type='text' />

          <x-button type='primary' >Register</x-button>


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
}
</script>

<style>
.to-hide {
    display: none;
}

</style>
