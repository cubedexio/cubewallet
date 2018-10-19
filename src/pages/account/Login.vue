<template>
  <div id="login-app">

        <div class="container">

            <div class="logo">
                <img id="logo-img" src="../../assets/images/logo.png"/>
            </div>
            <div class="login">
                <input title=""/>
                <input title=""/>
                <group>
                    <x-input />
                </group>
            </div>
            
            <div>                
                <x-button >登陆</x-button>
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

<style scoped>


.to-hide {
    display: none;
}

#login-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in.jpg")  no-repeat ;
    background-size: 100%;
}
.container {
    height: 100%;
}
.logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

input {
    border-bottom: 1px solid white;
}

.weui-cells {
    background: transparent;
}

</style>
