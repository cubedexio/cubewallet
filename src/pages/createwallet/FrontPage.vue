<template>
  <div id="app">
      <x-button type='primary'>{{ $('Login')}}</x-button>
      <x-button type=''>{{ $('Register')}}</x-button>
    
  </div>
</template>
<i18n>
Login:
  zh-CN: 登录
Register:
    zh-CN: 注册

</i18n>

<script>
import { Group, XButton } from 'vux'



export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  data () {

  }
}
</script>

<style>

</style>
