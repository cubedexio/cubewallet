<template>

    <flexbox id="register-app" orient="vertical" justify="space-around">
        <flexbox-item :span="3/12" class="flex-item flex-logo" >

                <img class="logo" src="@/assets/images/cbt_logo.png"/>

        </flexbox-item>
        <flexbox-item :span="6/12" class="flex-item flex-input">

            <div class="register">

                <!-- <label>名字</label>
                <cube-input name="name"></cube-input>                    -->
                <label>{{$t('Phone Number')}}</label>
                <!-- {{ phone }} -->
                <cube-input v-model="phone" name="phone" type='number'></cube-input>
                <label>{{$t('VerifyCode')}}</label>
                <div style="display:flex">
                    <cube-input v-model="sms" name="verifycode" style="flex:3"/>
                    <x-button  :disabled="disablePhoneNumber" plain type='default' class="custom-default" action-type='button' style="flex:1;height:80%" @click.native="requestVerifyCode">

                        {{ countdown == -1 ? $t("VerifyCode") : countdown+"s" }}
                    </x-button>
                </div>
                <label>{{$t('Password')}}</label>
                <cube-input v-model='password' name="password"></cube-input>

                <div>
                <!--<input type="checkbox"  name="agreeterm"  id="agreeterm" v-model='agreeterm'/>-->
                <label class='agreeterm'>
                    {{$t('Please Read The')}}<router-link :to="'license'"><a class='license' >{{$t('User Agreement Of CubeWallet')}}</a></router-link>
                </label>
                </div>
            </div>


        </flexbox-item>
        <flexbox-item :span="3/12" class="flex-item flex-btn">

            <div>
                <x-button @click.native="register">{{$t('Register')}}</x-button>
            </div>
          <br>
           <label>
                <router-link :to="'login'">
                    <a class='gologin' >{{$t('Go To Login')}}</a>
                </router-link>

            </label>
        </flexbox-item>
    </flexbox>
</template>
<i18n>
Phone Number:
  zh-CN: 手机号码
Password:
  zh-CN: 密码
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册
VerifyCode:
    zh-CN: 验证码
Please Read The:
  zh-CN: 注册即同意
Please enter a valid phone number:
  zh-CN: 手机号格式不正确
Password minimum 8 digits:
  zh-CN: 密码最少8位
Go To Login:
  zh-CN: 已有帐号？去登录
User Agreement Of CubeWallet:
  zh-CN: 《CUBEWALLET》用户协议
Please check the user agreement:
  zh-CN: 请先同意用户协议
Please enter verify code:
  zh-CN: 请输入验证码
</i18n>

<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem } from 'vux'

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
        TabbarItem, Flexbox, FlexboxItem
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
                type: 'register',
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
              this.$vux.toast.show({
                text:this.$t('Please enter a valid phone number'),
                type:'text',
                width:'16rem',
                position:'middle'
              })
                return;
            }
            if( this.password.length < 8 ) {
              this.$vux.toast.show({
                text:this.$t('Password minimum 8 digits'),
                type:'text',
                width:'16rem',
                position:'middle'
              })
                return ;
            }
            if(!this.sms){
              this.$vux.toast.show({
                text:this.$t('Please enter verify code'),
                type:'text',
                width:'16rem',
                position:'middle'
              })
              return;
            }
            // if(!this.agreeterm){
            //   this.$vux.toast.show({
            //     text:this.$t('Please check the user agreement'),
            //     type:'text',
            //     width:'16rem',
            //     position:'middle'
            //   })
            //     // this.$vux.alert.show({ title: '请先同意协议' });
            //     return;
            // }


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

.flex-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;

    text-align: center;
    background-clip: padding-box;
}

.license {
    color: #F5A623;
}
label {
    display: inline-block;
    color: white;
    line-height: 2.2em;
    height: 2.2em;
}
label a {
    color: white;
}

label.agreeterm {
    font-size: 14px;
}

#register-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in.jpg") center 0  no-repeat ;
  background-size: auto 100%;
}
.custom-default {
  border-radius: 99px!important;
  border-color: white!important;
  color: white !important;
}
button:disabled,
button[disabled]{
  border: 1px solid #999999;

    background-color: rgba(102  , 102, 102, 0.4);
  color: #666666;
}

.register {
    text-align: left;
    width: 75%;
}

</style>
