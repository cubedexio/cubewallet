<template>
  <div id="terms">
    <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">用户协议</x-header>

  </div>
</template>

<script>

import {XHeader} from 'vux'

export default {
  components:{
    XHeader
  },
  mounted(){
    this.$common.fixStatusBarByHeader('c-header')
    this.$common.fixTabBarByNav('c-nav-tab')
  }
}
</script>
