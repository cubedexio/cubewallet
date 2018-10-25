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
                    <cube-input v-model="sms" name="verifycode" style="flex:3"/>
                    <x-button  :disabled="disablePhoneNumber" plain type='default' class="custom-default" action-type='button' style="flex:1;height:80%" @click.native="requestVerifyCode">
                        
                        {{ countdown == -1 ? $t("VerifyCode") : countdown+"s" }}
                    </x-button>                
                </div>
                <label>密码</label>
                <cube-input v-model='password' name="password"></cube-input>
                <input type="checkbox"  name="agreeterm"  id="agreeterm" v-model='agreeterm'/>
                <label for="agreeterm"> 
                    注册即同意<router-link :to="'license'"><a class='license' >《CUBEWALLET》用户协议</a></router-link>
                </label>
            </div>
            
            <div>                
                <x-button @click.native="register">注册</x-button>
            </div>

            <label>
                <router-link :to="'login'">
                    <a class='gologin' >已有帐号？去登录</a>
                </router-link>
                
            </label>
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
import { setInterval, setTimeout } from 'timers';

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
            agreeterm: false,
            phone: '',
            password: '',
            sms: '',
            countdown: -1
        }
    },
    computed: {
        disablePhoneNumber: function() {                      
            console.log(this.phone)
            return this.phone.length !== 11 || this.countdown !== -1
        }  
    },

    methods: {

        countdownSMS: function(cd) {
            this.countdown = cd
            setTimeout( ()=> {
                if( cd >= 0) {                    
                    this.countdownSMS(cd-1)
                }                            
            }, 1000)
        },

        requestVerifyCode: function() {
            
            this.$http.post('/send_sms',  {
                phone: this.phone,                
            })
            .then( (res) => {
                console.log(res)
                
                this.countdownSMS(60)

                if( res.status !== 200  || res.data.code !== 0 ) {
                    this.$vux.alert.show({ title: '发送失败', content: res.data.msg ||  res.statusText || '未知错误', });               
                    return;     
                }              

            }, (err)=> {
                console.log(err)                                
                this.$vux.alert.show({ title: '发送失败', content: err.message });   
            })

        },
        register: function() {
            if( this.phone.length !== 11) {
                this.$vux.alert.show({ title: '手机号格式不正确' });  
                return;
            } 
            if( this.password.length < 8 ) {
                this.$vux.alert.show({ title: '密码最少8位' });  
                return ;
            }
            if(!this.agreeterm){
                this.$vux.alert.show({ title: '请先同意协议' });  
                return;
            }            
            
            
            this.$http.post('/register',  {
                phone: this.phone,    
                pass: this.password,
                sms: this.sms            
            })
            .then( (res) => {
                console.log(res)
                
                if( res.status !== 200  || res.data.code !== 0 ) {
                    this.$vux.alert.show({ title: '注册失败', content: res.data.msg ||  res.statusText || '未知错误', });               
                    return;     
                }else {

                    

                    var self = this
                    this.$vux.alert.show({ 
                        title: '注册成功', 
                        onHide () {
                            self.$router.replace('/importwallet')
                        }    
                    });               
                    

                }

            }, (err)=> {
                console.log(err)                                
                this.$vux.alert.show({ title: '注册失败',content: err.message });   
            }) 
        }
    }
}
</script>

<style scoped lang="less">
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


.custom-default {
  border-radius: 99px!important;
  border-color: white!important;
  color: white !important;
}
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

</style>
