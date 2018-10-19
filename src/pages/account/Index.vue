<template>
  <div id="index-app">
        <!-- <transition name="fade">
            <div class="start" ref="start" v-if="show">
            <img src="../../assets/images/start.jpg" alt="">
            </div>
        </transition> -->

        <div class="container">

            <div class="logo">
                <img id="logo-img" src="../../assets/images/logo.png"/>
            </div>
            <div class="hint">
                <label id="hint-label">
                    创建<br/>/<br/>登陆帐号
                </label>
            </div>
            
            <div>
                <x-button type='primary' link="/register">创建帐号</x-button>
                <x-button link="/login">登陆帐号</x-button>
            </div>
      </div>


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

<style scoped>
.logo, .hint {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.hint {
    text-align: center;
    color: white;
    font-size: 1.2rem;
    font-weight:bold;
}

#index-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg")  no-repeat ;
    background-size: 100%;
}
.container {
    height: 100%;
}


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
