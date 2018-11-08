<template>
    <div id="importkey-app">

        <x-header id="c-header" class="header-content head-bg-md" :left-options="{backText:''}" style="background-color:transparent;">导入钱包</x-header>
      <br>
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
            <flexbox-item :span="1/2" class="flex-item">
              <br>
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
            privatekey: ''
        }
    },
    mounted(){
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')
    },
    computed: mapState([
        // ...
        'memo',
    ]),
    methods: {
        onImportEOSAccount: function() {
            // var ecc = eosjs_ecc

            if( !eosjs.isValidPrivate(this.privatekey) ) {
                this.$vux.alert.show({ title: '不合法的私钥' })
                return
            }

            this.$vux.loading.show({
                text: '导入中...'
            })

            let eosAccount = undefined

            const publicKey = eosjs.privateToPublic(this.privatekey )

            this.$http.post(eosURI,  {
                public_key: publicKey
            }).then( (res)=>{
                if( res.status !== 200  ) {
                    throw new Error(`服务器错误:${res.status}`)
                }
                if( res.data.account_names === undefined || res.data.account_names.length <= 0 ) {
                    throw new Error(`未找到对应帐户`)
                }
                eosAccount = res.data.account_names[0]


                return this.$http.post('/create_account', {
                    memo: this.memo,
                    name: eosAccount
                })

            }).then(res=>{
                if( res.status !== 200  ) {
                    throw new Error(`服务器错误:${res.status}`)
                }
                if( res.data.code !== 0) {
                    throw new Error(`${res.data.msg}`)
                }

                this.$vux.loading.hide();

                this.$store.commit('setPrivateKey', this.privatekey)
                this.$store.commit('setEOSAccountName', eosAccount)

                let self = this;
                this.$vux.alert.show({
                    title: '导入成功',
                    onHide () {
                        self.$router.replace('/home')
                    }
                });

            }).catch(err=>{
                this.$vux.loading.hide();
               this.$vux.alert.show({ title: '导入失败', content: err.toString() });
            })


        }
    }
}
</script>

<style  lang='less' scoped>


</style>
<style type="less">
#importkey-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg") center 0  no-repeat ;
    background-size: cover;
}

#importkey-app h1.vux-header-title {
    /* color: black !important; */

}
</style>

