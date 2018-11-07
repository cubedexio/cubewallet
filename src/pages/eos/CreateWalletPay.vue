<template>
  
    <div id="createwalletpay-app">
    <x-header>支付</x-header>
    <flexbox  orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item">
            <group>
                <label>请支付一定金额用于创建EOS钱包帐号</label>
            </group>

            <group>
                <label>36$</label>
                
                <input type='text' v-model='$route.query.prvkey' />

                <label>{{ info }}</label>


                
            </group>
            <group>
                
                
            </group>

            {{ moment().format('YYYY-MM-DD HH:mm:ss') }}

            
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

import { mapState } from 'vuex'
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
      eosname: '',
      info: ''
    }
  },

      computed: mapState([
        // ...
        'memo',
    ]),
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
            return new Promise((resolve, reject)=>{
                aliPayPlus.payOrder({
                    orderInfo: orderInfo
                }, (ret, err)=>{                    
                    console.log(ret)
                    console.log(err)
                    if( ret.code == 9000) { // ret.code 为字符串类型
                        resolve(ret)
                    }else {
                        reject(err)
                    }
                })
            })
        },

        
        pay() {            

            this.$vux.loading.show({
                text: this.$t('Processing..')
            })
            setTimeout(()=>{
                this.$vux.loading.hide()
            }, 20 * 1000)

            let orderId = null
            this.$http.get('/get_alipay_order') // 获取订单
                .then(res=>{
                    if( res.status === 200 && res.data.code === 0 ) {
                        let orderInfo = res.data.data
                        return this.alipay(orderInfo) // 支付
                    }else {
                        throw new Error(res.data.msg || '获取订单失败')
                    }
                }).then(res=>{                    
                    // 本地判断支付成功, 创建EOS公链帐号
                    return this.$http.get('/eos_newaccount', {
                        params: {
                            name: this.$route.query.eosname,
                            pubkey: this.$route.query.pubkey
                        }
                    })
                }).then(res=>{ 
                    // 创建私链帐号
                    this.info += 'new eos account res: ' + res.status + ' code:' + res.data.code 

                    if( res.status === 200 && res.data.code === 0 ) {

                        return this.$http.post('/create_account', { 
                            memo: this.memo,
                            name: this.$route.query.eosname,
                        })                        
                    }else {
                        throw new Error(res.data.msg || '创建EOS帐号失败，请联系客服')
                    }                    
                }).then(res=>{
                    this.info += 'new account res: ' + res.status + ' code:' + res.data.code 

                    if( res.status === 200 && res.data.code === 0 ) {
                        this.$vux.loading.hide()                    

                        this.$store.commit('setEOSAccountName', this.$route.query.eosname)
                        this.$store.commit('setPrivateKey', this.$route.query.prvkey)

                        this.$router.replace({
                            path: "/createwalletdone", 
                            query: {
                                prvkey: this.$route.query.prvkey
                            }
                        })
                    }else {
                        throw new Error(res.data.msg || '创建私链帐号失败，请联系客服')
                    }
                }).catch(err=>{
                    this.info += 'catch error:' + err
                    this.$vux.loading.hide()

                    this.$vux.toast.show({
                        type: 'text',
                        text: '' + err 
                    })
                })
        }
    }
}
</script>
<i18n>
Processing..
  zh-CN: 处理中...  

</i18n>

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
