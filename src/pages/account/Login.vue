<template>

    <flexbox id="login-app" orient="vertical" justify="space-around">
        <flexbox-item :span="3/12" class="flex-item flex-logo" >

                <img class="logo" src="@/assets/images/cbt_logo.png"/>

        </flexbox-item>
        <flexbox-item :span="4/12" class="flex-item flex-input">
            <div class="login">
                <label>手机号</label>
                <cube-input name="phone" v-model="phone"></cube-input>
                <br/>
                <label>密码</label>
                <cube-input name="password" v-model="password"></cube-input>
            </div>


        </flexbox-item>
        <flexbox-item :span="5/12" class="flex-item ">

            <div>
                <x-button type='primary' @click.native="onLogin">{{ $t('Login') }}</x-button>
              <br/>
                <x-button  link='/register'>{{ $t('Register') }}</x-button>
                <br/>
                <router-link class='gologin' :to="'Forgot'">
                    忘记密码
                </router-link>
            </div>

        </flexbox-item>

    </flexbox>




</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册
Please enter phone number!:
    zh-CN: 手机号码不能为空！
Please enter password!:
    zh-CN: 密码不能为空！

</i18n>

<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem  } from 'vux'

import CubeInput from '@/components/CubeInput'

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
    data: function() {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        onLogin: function() {
            console.log('onLogin')

          if(!this.phone){
            this.$vux.toast.show({
              text:this.$t('Please enter phone number!'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }
          if(!this.password){
            this.$vux.toast.show({
              text:this.$t('Please enter password!'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }

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
                this.$store.commit('setAccessToken', res.data.data.accessToken)
                this.$store.commit('setRefreshToken', res.data.data.refreshToken)
                this.$store.commit('setEOSAccountName', res.data.data.name)
                this.$store.commit('setMemo', res.data.data.memo)
                
                this.$vux.toast.show({
                    text:this.$t('Login succeeed'),
                    type:'text',
                    position:'middle'
                })

                console.log(res.data.data.name)
                console.log(res.data.data.name == "" || res.data.data.name == undefined)

                if(res.data.data.name == "" || res.data.data.name == undefined) { // 若没有EOS帐号提示导入或创建
                    this.$router.replace("/eosindex")
                }else {
                    this.$router.replace('/home')
                }

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

<style type="text/less" scoped>

#login-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg") center 0  no-repeat ;
    background-size:  cover;
    
}

.flex-input {
    min-height: 14rem;
}

.flex-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;

    text-align: center;
    background-clip: padding-box;

}

label {
    display: block;
    color: white;
    line-height: 2.2em;
    height: 2.2em;
}

.login {
    text-align: left;
    width: 75%;
}
  .gologin{
    color: #fff;
  }


</style>
