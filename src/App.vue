<template>
    <div id="app">

        <router-view></router-view>


            <tabbar id="c-nav-tab" class="nav-tab" v-if="$store.state.loggedIn ">
            <tabbar-item @click.native="go('home')" selected>
                <i class="icon-wallet" slot="icon"></i>
            </tabbar-item>
            <tabbar-item @click.native="go('market')" >
                <i class="icon-chart" slot="icon"></i>
            </tabbar-item>
            <tabbar-item @click.native="go('news')" >
                <i class="icon-compass" slot="icon"></i>
            </tabbar-item>
            <tabbar-item  @click.native="go('profile')">
                <i class="icon-settings" slot="icon"></i>
            </tabbar-item>
            </tabbar>

    </div>

</template>

<script>
  import {Tabbar, TabbarItem, XButton} from 'vux'
  import Index from '@/pages/account/Index'

  export default {
    name: 'app',
    data(){
      return{
        hideTabbar: false
      }
    },
    components: {
      Tabbar, XButton,
      TabbarItem,
      Index
    },
    methods:{
      go(str){
        this.$router.push('/'+str)
      },

      refreshToken() {
          self = this
        const instance = this.$http.create({
            headers: {'Authorization': 'Bearer ' + self.$store.state.refreshToken }
        });

        instance.post('/refresh_token').then(res=>{
            if( res.status === 200 && res.data.code === 0 ) {
                this.$store.commit('setAccessToken', res.data.data.accessToken)
                this.$store.commit('setRefreshToken', res.data.data.refreshToken)
            }
        }, err=>{
            console.error(err)
        })

      }
    }
    ,
    created() {
        // 每次启动刷新token
        console.log("created")
        this.refreshToken()
    },
    mounted(){
      this.$common.fixTabBarByNav('c-nav-tab')
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './style/style.less';//引入网页字体
@import './assets/iconfont/style.css';//引入网页字体
@import '~vux/src/styles/close.less';

</style>
