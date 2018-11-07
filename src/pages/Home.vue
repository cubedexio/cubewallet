<template>
  <div>
    <Wallet></Wallet>
  </div>
</template>

<script>
import Wallet from '@/pages/Wallet'

export default {
  components: {
    Wallet
  },
  data () {
    return {
    }
  },
  mounted(){
    this.$common.fixStatusBarByHeader('c-header')
    this.$common.fixTabBarByNav('c-nav-tab')
  }
}
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
</style>
