<template>
  
    <div id="createwalletdone-app">
    <x-header>支付</x-header>
    <flexbox  orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item">



            <group>
                创建帐号完成，请务必保存好您的私钥

                {{ $route.query.prvkey }}

                
            </group>
            <group>
                
                
            </group>
            
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">      

                <x-button type='default' @click.native="pay">确认</x-button>

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
import moment from 'moment'


import { eosEndpoint, alipayAppId } from '@/config'
import { resolve } from 'path';
import { rejects } from 'assert';

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
      eosname: ''
    }
  },
  mounted(){
      console.log($api)
      console.log('moment')
      console.log(moment)
      console.log('moment')
  },
    methods: {
        moment: function () {
            return moment();
        },

        getOrder() {
            return this.$http.get('/get_pay_order')
                .then(res=>{

                }, err=>{

                })
        },

        alipay(orderInfo) {
            var aliPayPlus = api.require('aliPayPlus');
            return new Promise((resovle, reject)=>{
                aliPayPlus.payOrder({
                    orderInfo: orderInfo
                }, (ret, err)=>{
                    if( ret.code === 9000) {
                        resolve(ret)
                    }else {
                        reject(ret, err)
                    }
                })
            })
        },

        
        pay() {            

            let orderId = null
            this.$http.get('/get_alipay_order') // 获取订单
                .then(res=>{
                    if( res.status === 200 && res.data.code === 0 ) {
                        let orderInfo = res.data.data
                        this.alipay(orderInfo) // 支付
                    }else {
                        throw new Error(res.data.msg || '获取订单失败')
                    }
                }).then(res=>{
                    // 本地判断支付成功, 创建EOS公链帐号
                    return this.$http.get('/eos_newaccount', {
                        name: this.$route.query.eosname,
                        pubkey: this.$route.query.pubkey
                    })
                }).then(res=>{
                    if( res.status === 200 && res.data.code === 0 ) {
                        this.$store.commit('setEOSAccountName', this.$http.query.eosname)

                        this.router.replace({
                            path: "/createwalletdone", 
                            query: {
                                prvkey: this.$route.prvkey
                            }
                        })
                    }else {
                        throw new Error(res.data.msg || '创建EOS帐号失败，请联系客服')
                    }                    
                }).catch(err=>{
                    this.$vux.toast.show({
                            text: res.data.msg || 'Get order error'
                        })
                    api.alert({
                        title: 'err get order',
                        msg: err.toString(),
                        buttons: ['确定']
                    });
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
