<template>
  
    <div id="createwallet-app">
    <x-header>创建EOS帐号</x-header>
    <flexbox  orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item">
            <group>
                <x-input title="" placeholder="请输入EOS帐号" v-model="eosname"></x-input>
            </group>
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">      

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
    FlexboxItem
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

  },
    methods: {

        newkeypairs() {
            eosjs.randomKey().then(privateKey => {
                this.privateKey = privateKey
                this.publicKey = ecc.privateToPublic(privateKey)
            })

        },
        createEOSAccount() {
  

            this.$http.post(eosEndpoint + '/v1/chain/get_account', {
                account_name: this.eosname
            }).then( res=>{
                if( res.status === 200 && res.data.account_name ) {
                    // account check out,next
                    this.$vux.toast.show({
                        text:this.$t('Account name unavailabe, please input another one' ),
                        type:'text',
                        // width:'16rem',
                        // position:'middle'
                    })                    
                } else {
                    // alert('ok')
                    this.$router.push({ 
                        path: '/createwalletpay', 
                        query: {
                            eosname: this.eosname,
                            pubkey: this.publicKey,
                            prvkey: this.privateKey
                        }
                    })

                }
            }, err=>{

            })
        }
    }
}
</script>

<style scoped>

#createwallet-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg")  no-repeat ;
    background-size: 100%;
}

.flex-item {
    display: flex;
    width: 75%;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;

    text-align: center;
    background-clip: padding-box;
}


label#hint-label {
    color: #fff;
    font-size: 1.2em;
}



</style>
