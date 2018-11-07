<template>

    <div id="createwallet-app">
    <x-header id="c-header" class="header-content" :left-options="{backText:''}">创建EOS帐号</x-header>
        <!--<flexbox  orient="vertical" justify="space-around">-->
          <!--<flexbox-item :span="1/2" class="flex-item eos-account">-->
            <!--<cube-input title="" placeholder="请输入EOS帐号" v-model="eosname"></cube-input>-->
          <!--</flexbox-item>-->
          <!--<flexbox-item :span="1/2" class="flex-item">-->
            <!--<br>-->
            <!--<x-button type='default' @click.native="createEOSAccount">确认</x-button>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
      <flexbox orient="vertical" justify="space-around">
        <flexbox-item class="">
          <cube-input class="eos-account" title="" placeholder="请输入EOS帐号" v-model="eosname"></cube-input>
          <label class="hint-label">EOS帐号名由小写字母和1-5组成的长度为12的字符串</label>
        </flexbox-item>
        <flexbox-item>
          <x-button type='default' @click.native="createEOSAccount">确认</x-button>

        </flexbox-item>
      </flexbox>



    </div>
</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册

</i18n>

<script>
import { Group, XHeader, XButton, XInput, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem } from 'vux'
import CubeInput from '@/components/CubeInput'
import eosjs from 'eosjs-ecc'
import { eosEndpoint } from '@/config'

export default {

  components: {
    Group,
    XInput,
    XHeader,
    XButton,
    Cell,
    Tabbar,
    TabbarItem,
    Flexbox,
    FlexboxItem,
    CubeInput
  },
  data () {
    return{
      eosname: '',
      privateKey: '',
      publicKey: ''

    }
  },
  mounted(){

      this.newkeypairs()
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')

  },
    methods: {

        newkeypairs() {
            eosjs.randomKey().then(privateKey => {
                this.privateKey = privateKey
                this.publicKey = eosjs.privateToPublic(privateKey)
            })

        },
        createEOSAccount() {
            const eosPattern = /^[a-z1-5]{12}$/
            if( this.eosname.match(eosPattern) == null ) {
                this.$vux.toast.show({
                    text: this.$t('Account name pattern incorrect' ),
                    type: 'text',
                    position: 'middle',
                    width: '16rem'
                })      
                return           
            }

            this.$vux.loading.show({
                text: this.$t('Processing..')
            })
            setTimeout(()=>{
                this.$vux.loading.hide()
            }, 10 * 1000)

            this.$http.post(eosEndpoint + '/v1/chain/get_account', {
                account_name: this.eosname
            }).then( res=>{
                console.log(res.status)
                this.$vux.loading.hide()
                if( res.status === 200 && res.data.account_name ) {
                    // account check out,next
                    this.$vux.toast.show({
                        text:this.$t('Account name unavailabe, please input another one' ),
                        type:'text',
                        position: 'middle',
                        width: '16rem'                        
                    })
                } else {
                    throw new Error("")
                }
            }, err=>{
                console.log(err)
                this.$vux.loading.hide()
                this.$router.push({
                    path: '/createwalletpay',
                    query: {
                        eosname: this.eosname,
                        pubkey: this.publicKey,
                        prvkey: this.privateKey
                    }
                })
            })
        }
    }
}
</script>
<i18n>
Account name unavailabe, please input another one:
  zh-CN: 用户名不可用，请使用其他用户名
Account name pattern incorrect:
    zh-CN: 用户名格式错误
Processing..
  zh-CN: 处理中...


</i18n>
<style lang="less" scoped>

#createwallet-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg") center 0  no-repeat ;
    background-size: cover;
}

.eos-account{
    padding: 2rem 3rem 0 3rem;
}




label.hint-label {
    display: block;
    padding:0rem 3rem 2rem 3rem;
    color: #fff;
    font-size: 0.7em;
}



</style>
