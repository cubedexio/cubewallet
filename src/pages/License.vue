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
  //   let cheader = $api.byId("c-header")
  //   // let cheader = document.getElementById("c-header")
  //   console.log($api.isElement(cheader))
  //   $api.fixStatusBar(cheader)
  }
}
</script>
