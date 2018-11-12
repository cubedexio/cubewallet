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
      privateKey:undefined,
      loggedIn:false
    }
  },
  beforeCreate(){
    this.privateKey = this.$store.state.privateKey
    this.loggedIn = this.$store.state.loggedIn
    if(!this.loggedIn){
      this.$router.replace('/login')
    }
    console.log(this.loggedIn,this.privateKey)
    if(this.privateKey == '' || this.privateKey == undefined){
      this.$router.replace({
        path: '/importwallet',
        query: {
          type: 1
        }
      })
    }
  }
}
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
</style>
