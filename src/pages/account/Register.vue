<template>
    <div id="register-app">

        <div class="container">

            <div class="logo">
                <img id="logo-img" src="@/assets/images/cbt_logo.png"/>
            </div>
            <div class="register">                    

                <!-- <label>名字</label>
                <cube-input name="name"></cube-input>                    -->
                <label>手机号</label>
                <!-- {{ phone }} -->
                <cube-input v-model="phone" name="phone" type='number'></cube-input>                
                <label>验证码</label>
                <div style="display:flex">
                    <cube-input name="verifycode" style="flex:3"/>
                    <x-button  :disabled="disablePhoneNumber" plain type='default' class="custom-default" action-type='button' style="flex:1;height:80%" @click.native="requestVerifyCode">
                        {{ $t("VerifyCode") }}
                    </x-button>                
                </div>
                <label>密码</label>
                <cube-input name="password"></cube-input>
                <input type="checkbox"  name="agreeterm"  id="agreeterm"/>
                <label for="agreeterm"> 
                    注册即同意<a class='license' href='/license'>《CUBEWALLET》用户协议</a>
                </label>
            </div>
            
            <div>                
                <x-button @click.native="register">注册</x-button>
            </div>

            <label><a class='gologin' href="/login">已有帐号？去登录</a></label>
      </div>
    </div>
</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册
VerifyCode:
    zh-CN: 验证码    

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

    data: function(){
        return {
            phone: '',
            password: '',
        }
    },
    computed: {
        disablePhoneNumber: function() {                      
            console.log(this.phone)
            return this.phone.length !== 11 
        }  
    },

    methods: {

        requestVerifyCode: function() {
            
            alert("requestVerifyCode")


        },
        register: function() {
            
        },
        onLogin: function() {
            console.log('onLogin')
            this.$store.commit('setLoggedIn', true)
            this.$router.replace('/home')
        }
    }
}
</script>

<style scoped>
.license {
    color: #F5A623;
}
label {
    color: white;
    line-height: 3.2em;
    height: 3.2em;
}
label a {
    color: white;
}

.to-hide {
    display: none;
}

#register-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in.jpg")  no-repeat ;
    background-size: 100%;
}
.container {
    height: 100%;
}

.register {
    width: 60%;
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


.custom-default {
  border-radius: 99px!important;
  border-color: white!important;
  color: white !important;
}
</style>
