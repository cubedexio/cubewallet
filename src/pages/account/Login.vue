<template>
  <div id="login-app">

        <div class="container">

            <div class="logo">
                <img id="logo-img" src="@/assets/images/cbt_logo.png"/>
            </div>
            <div class="login">                
    
                <!-- <group>
                    <x-input />
                </group> -->
                
                <label>手机号</label>
                <cube-input name="phone" v-model="phone"></cube-input>                
                <label>密码</label>
                <cube-input name="password" v-model="password"></cube-input>
            </div>
            
            <div>                
                <x-button @click.native="onLogin">{{ $t('Login') }}</x-button>
                <x-button type='primary' link='/register'>{{ $t('Register') }}</x-button>
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

import CubeInput from '@/components/CubeInput'

export default {

    components: {
        Group,
        XInput,
        XButton,
        Cell,
        Tabbar,
        CubeInput,
        TabbarItem
    },
    data: function() {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        onLogin: function() {
            console.log('onLogin')
            

            this.$http.post('/login',  {
                phone: this.phone,
                pass: this.password
            })
            .then( (res) => {
                console.log(res)

                if( res.status !== 200  || res.data.code !== 0 ) {
                    this.$vux.alert.show({
                        title: '登录失败',
                        content: res.data.msg ||  res.statusText || '未知错误',
                    });               
                    return;     
                }
                this.$store.commit('setLoggedIn', true)
                this.$router.replace('/home')

            }, (err)=> {
                console.log(err)                                
                this.$vux.alert.show({
                    title: '登录失败',
                    content: err.message
                });   
            })
        }
    }
}
</script>

<style scoped>

label {
    color: white;
    line-height: 3.2em;
    height: 3.2em;
}

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

.login {
    width: 70%;
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
