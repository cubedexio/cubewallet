<template>
  <div id="importkey-app">
        <x-header :left-options="{showBack: false}" style="background-color:transparent;color:black !important">导入钱包</x-header>
        <div class="container">
            

            <div class="importkey">                
    
                <label>私钥</label>
                <!-- <x-textarea :max="20"></x-textarea> -->
                <!-- <cube-textarea v-model="privatekey" placeholder="请输入您的私钥，仅作帐号认证使用，不会被保存"></cube-textarea> -->
                
                <label>钱包密码</label>
                <cube-input name="password" v-model="password"></cube-input>               
                <label>确认密码</label>
                <cube-input name="password-confirm" v-model="passwordConfrim"></cube-input>
            </div>
            
            <div>                
                <x-button @click.native="onLogin">{{ $t('Login') }}</x-button>
                <x-button type='primary' link='/register'>{{ $t('Register') }}</x-button>
            </div>

            
      </div>


    
  </div>
</template>
<i18n>

</i18n>

<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem, XHeader, XTextarea } from 'vux'

import CubeInput from '@/components/CubeInput'
import CubeTextarea from '@/components/CubeTextarea'

export default {

    components: {
        Group,
        XInput,
        XButton,
        Cell,
        Tabbar,
        CubeInput,
        CubeTextarea,
        TabbarItem,
        XHeader,
        XTextarea,
    },
    data: function() {
        return {
            phone: '',
            password: '',
            privatekey: ''
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
    color: black;
    line-height: 3.2em;
    height: 3.2em;
}


#importkey-app {
    width: 100%;
    height: 100%;    
    background-color: white;
    background-size: 100%;
}
.container {
    height: 100%;    
}
.container .importkey {
    width: 70%;
}

.vux-header .vux-header-title {
    color: black !important;
    
}
</style>
