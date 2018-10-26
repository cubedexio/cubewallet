<template>
    <div id="importkey-app">

        <x-header  :left-options="{showBack: false}" style="background-color:transparent;">导入钱包</x-header>
        <flexbox id="flexbox" orient="vertical" justify="space-around">

            <flexbox-item :span="1/2" class="flex-item">            
                <div class="importkey">                
                    <label>私钥</label>
                    <cube-textarea v-model="privatekey" placeholder="请输入您的私钥"></cube-textarea>
                    
                    <!-- <label>钱包密码</label>
                    <cube-input class='reversed' name="password" v-model="password"></cube-input>               
                    <label>确认密码</label>
                    <cube-input class='reversed' name="password-confirm" v-model="passwordConfirm"></cube-input> -->
                </div>
            </flexbox-item>
            <flexbox-item :span="1/4" class="flex-item">      
                    <x-button type='primary' @click.native="onImportEOSAccount">{{ $t('Import EOS Account') }}</x-button>
            </flexbox-item>
        </flexbox>
            

        
    </div>
</template>
<i18n>
Import EOS Account:
    zh-CN: 导入EOS帐号

</i18n>
<script src=eosjs-ecc.js></script>
<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem, XHeader, XTextarea, Flexbox, FlexboxItem  } from 'vux'
import eosjs from 'eosjs-ecc'
import { mapState } from 'vuex'


import CubeInput from '@/components/CubeInput'
import CubeTextarea from '@/components/CubeTextarea'


const eosURI = 'https://api.eosnewyork.io/v1/history/get_key_accounts'

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
        XTextarea, Flexbox, FlexboxItem 
    },
    data: function() {
        return {
            passwordConfirm: '',
            password: '',
            privatekey: ''
        }
    },
    computed: mapState([
        // ...
        'privateKey',
        'eosAccountName'
    ]),
    methods: {
        onImportEOSAccount: function() {
            // var ecc = eosjs_ecc
            
            if( !eosjs.isValidPrivate(this.privatekey) ) {
                this.$vux.alert.show({ title: '不合法的私钥' })
                return
            }

            if( this.password !== this.passwordConfirm ) {
                this.$vux.alert.show({ title: '两次密码不一致' })
                return
            }
            if( this.password.length < 8) {
                this.$vux.alert.show({ title: '密码长度不能低于8位' })
                return
            }

            const publicKey = eosjs.privateToPublic(this.privatekey ) 

            this.$http.post(eosURI,  {
                public_key: publicKey
            }).then( (res)=>{
                if( res.status !== 200  ) {
                    this.$vux.alert.show({ title: '导入失败'});                                   
                    return;     
                }
                if( res.data.account_names === undefined || res.data.account_names.length <= 0 ) {
                    this.$vux.alert.show({ title: '导入失败', content: '未找到对应帐户'});                                   
                    return;        
                }
                const eosAccount = res.data.account_names[0]


                this.$store.commit('setPrivateKey', this.privatekey)
                this.$store.commit('setEOSAccountName', eosAccount)
                this.$store.commit('setWalletPassword', this.password)
                this.$store.commit('setLoggedIn', true)

                this.$router.replace('/home')




            }, (err)=>{
               this.$vux.alert.show({ title: '导入失败', content: err.message });   
            })

            
        }
    }
}
</script>

<style  lang='less'>

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

    #flexbox {
        height: 100%;
    }
    .flex-item {
        width: 75%;
    }
}

h1.vux-header-title {
    color: black !important;
    
}
</style>
