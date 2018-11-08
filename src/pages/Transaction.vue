<template>
  <transition name="slide">

  <div id="transaction">
    <view-box>

      <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Transaction') }}</x-header>

      <br/>

      <divider></divider>

      <tab class="transaction-tab" v-model="i" custom-bar-width="3rem">
        <tab-item selected @on-item-click="switchTab">
          {{$t('Buy')}}
        </tab-item>
        <tab-item @on-item-click="switchTab">
          {{$t('Sell')}}
        </tab-item>
      </tab>
      <br/>

      <swiper v-model="i" :show-dots="false" height="20rem">
        <swiper-item>
          <group class="eos-token transaction-token" :title="$t('Buy Amount')">
            <span class="eos-logo token-name">EOS</span>
            <x-input type='text' class="c-input" placeholder="请输入数量" v-model='amount'></x-input>
          </group>
          <group class="transaction-symbol text-center">
            <span>1 EOS ≈ {{ exchangeRate_divided_by_1 }} CBT (≈￥ {{eosRmb}})</span>
            <p>
              <img src="../assets/images/arrow_down.png" alt="">
            </p>
          </group>
          <group class="transaction-token" :title="$t('Transaction Amount')">
            <span class="cbt-logo token-name">CBT</span>
            <!-- <x-input disabled type='text' class="c-input" placeholder="请输入数量" :value="transactionCBT"/> -->
            <div class="c-input weui-cell">
                <label class="c-output-label">{{ transactionCBT }}</label>
            </div>
          </group>
        </swiper-item>
        <swiper-item>
          <group class="transaction-token" :title="$t('Transaction Amount')">
            <span class="cbt-logo token-name">CBT</span>
            <x-input type='text' class="c-input" :placeholder="$t('Please enter a number')" v-model='CBTAmount'/>
          </group>
          <group class="transaction-symbol text-center">
            <span>1 EOS  ≈ {{ exchangeRate_divided_by_1 }} CBT (≈￥ {{eosRmb}})</span>
            <p>
              <img src="../assets/images/arrow_down.png" alt="">
            </p>
          </group>
          <group class="eos-token transaction-token" :title="$t('Sell Amount')">
            <span class="eos-logo token-name">EOS</span>
            <!-- <x-input disabled type='text' class="c-input" :placeholder="$t('Please enter a number')" :value="transactionEos"></x-input> -->
            <div class="c-input weui-cell">
                <label class="c-output-label">{{ transactionEos }}</label>
            </div>
          </group>
        </swiper-item>
      </swiper>
      <p class="terms">
        <check-icon class="checkTerms" :value.sync="checkTerms" >
          {{ $t('Please make sure you read') }}
        </check-icon>
        <router-link to="/license">
          <a class="terms-text">
            《{{$t('The Terms of Transaction')}}》
          </a>
        </router-link>
      </p>


      <br/>
      <!--<button @click="doTransaction">test</button>-->
      <x-button type='primary' @click.native="doTransaction">{{ $t('Confirm Tansaction') }}</x-button>

    </view-box>
  </div>
  </transition>
</template>

<i18n>

Transaction:
  zh-CN: CBT通证兑换
Buy:
  zh-CN: 买入
Sell:
  zh-CN: 卖出
Buy Amount:
  zh-CN: 买入数量
Sell Amount:
  zh-CN: 卖出数量
Transaction Amount:
  zh-CN: 兑换数量
Confirm Tansaction:
  zh-CN: 确认兑换
Please enter a Non-negative number:
  zh-CN: 请输入非零且非负数字
Please make sure you read:
  zh-CN: 我已经仔细阅读并同意
The Terms of Transaction:
  zh-CN: 服务及隐私条款
Please check the terms box:
  zh-CN: 请勾选已阅读隐私及服务条款
Transaction completed:
  zh-CN: 兑换完成
Get Memo failed, try to re-entry this page:
  zh-CN: 获取Memo失败，请尝试重新进入此页面
</i18n>

<script>

import {Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs'

// const rpc = new eosjs_jsonrpc.JsonRpc('http://127.0.0.1:8000');

  import {
    Group,
    Cell,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    XHeader,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XInput,
    XNumber,
    XButton,
    ViewBox,
    Swiper,
    SwiperItem,
    CheckIcon,
    Toast,
    Loading
  } from 'vux'

import { setInterval, setTimeout } from 'timers';
import { mapState } from 'vuex'

import { officialEosAccount, eosEndpoint } from '@/config'

let interval = undefined

  export default {
    components: {
      Group,
      Cell,
      Tab,
      TabItem,
      Tabbar,
      TabbarItem,
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Divider,
      XInput,
      XNumber,
      XButton,
      Swiper,
      SwiperItem,
      ViewBox,
      CheckIcon,
      Toast,
      Loading
    },
    data() {
      return {
        exchangeRate: 1,
        amount: 0,
        CBTAmount: 0,
        eosRmb: 0,
        i:0,
        checkTerms:false,
        memo: undefined
      }
    },
    computed: {
        exchangeRate_divided_by_1() {
            return  (new Number(1 / this.exchangeRate)).toFixed(1)
        },
        amountOut() {
            return this.amount * this.exchangeRate
        },
        transactionCBT() {
            return this.amount / this.exchangeRate ;
        },
        transactionEos(){
            return this.CBTAmount * this.exchangeRate ;
        },
        ...mapState([
            'privateKey',
            'eosAccountName'
        ]),
    },
    methods:{
        getEOSPrice() {
            // https://api.coinmarketcap.com/v1/ticker/eos/?convert=CNY
            this.$http.get('https://api.coinmarketcap.com/v1/ticker/eos', {
                params: {
                    convert: 'CNY'
                }
            }).then(res=>{
                if( res.status == 200 && res.data.length > 0){
                    this.eosRmb = new Number(res.data[0].price_cny).toFixed(2)
                } else {
                    this.$vux.toast.show({
                    text:this.$t('Get EOS price failed, please re-enter this page to try again'),
                        type:'text',
                        width:'16rem',
                        position:'middle'
                    })                    
                }
            })
        },
      doTransaction(){
        if(!this.checkTerms){
          this.$vux.toast.show({
            text:this.$t('Please check the terms box'),
            type:'text',
            width:'16rem',
            position:'middle'
          })
          return
        }
        if(this.i == 0){
          //eos兑换cbt
          if(this.amount === 0 || this.amount == ''){
            this.$vux.toast.show({
              text:this.$t('Please enter a Non-negative number'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }else if(!/^(\d)+(\.\d+)?$/.test(this.amount)){
            this.$vux.toast.show({
              text:this.$t('Please enter a Non-negative number'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }
          if( this.memo === undefined ) {
            this.$vux.toast.show({
              text:this.$t('Get Memo failed, try to re-entry this page'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }

            console.log('eos兑换cbt')
            this.eos2cbt()
        }else{
          //cbt兑换eos
          if(this.CBTAmount === 0 || this.CBTAmount == ''){
            this.$vux.toast.show({
              text:this.$t('Please enter a Non-negative number'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }else if(!/^(\d)+(\.\d+)?$/.test(this.CBTAmount)){
            this.$vux.toast.show({
              text:this.$t('Please enter a Non-negative number'),
              type:'text',
              width:'16rem',
              position:'middle'
            })
            return
          }
          //cbt兑换eos
          this.cbt2eos()

          console.log('cbt兑换eos')

        }

      },
      switchTab(index){
        this.i = index;
      },
    getMemo() {
        console.log('getMemo')

        this.$http.get('/memo')
            .then( res=>{
                if( res.status === 200 && res.data.code === 0) {
                    this.memo = res.data.data
                }
            }, err=>{
                console.error(err.toString())
            })
    },
    getPrice() {
        console.log('getprice')
        this.$http.get('/get_price')
            .then( (res) => {
                console.log(res.data)
                if( res.status !== 200  || res.data.code !== 0 ) {
                    this.$vux.alert.show({
                        title: '查询价格失败',
                        content: res.data.msg ||  res.statusText || '未知错误',
                    });
                    return;
                }
                const data = res.data.data;
                this.exchangeRate = data.price
            }, (err)=> {
                console.log(err)
                this.$vux.alert.show({
                    title: '查询价格失败',
                    content: err.msg
                });
            })
      },

        cbt2eos() {
            this.$vux.loading.show({
                text: 'Processing..'
            })
            setTimeout(()=>{
                this.$vux.loading.hide()
            }, 10 * 1000)

            this.$http.get('/sell', {
                params: {
                    from: this.eosAccountName,
                    quant: this.amount
                }
            }).then(res=>{
                this.$vux.loading.hide()
                if( res.status !== 200  || res.data.code !== 0 ) {
                    this.$vux.alert.show({
                        title: '兑换失败',
                        content: res.data.msg ||  res.statusText || '未知错误',
                    });
                    return;
                }

                this.$vux.toast.show({
                    text:this.$t('Transaction completed'),
                    type:'text',
                    width:'16rem',
                    position:'middle'
                })

            }, err=>{
                this.$vux.loading.hide()
                this.$vux.alert.show({ title: '注册失败',content: err.msg });
            })

  },
      async eos2cbt() {


        this.$vux.loading.show({
            text: 'Processing..'
        })

        setTimeout(()=>{
            this.$vux.loading.hide()
        }, 20 * 1000)

        const rpc = new JsonRpc(eosEndpoint);
        const signatureProvider = new JsSignatureProvider([this.privateKey]);
        const api = new Api({ rpc, signatureProvider });


          let textContent = ''

            let quanity = (new Number(this.amount)).toFixed(4) + ' EOS'
            try {
                const result = await api.transact({
                    actions: [{
                        account: 'eosio.token',
                        name: 'transfer',
                        authorization: [{
                            actor: this.eosAccountName,
                            permission: 'active',
                        }],
                        data: {
                            from: this.eosAccountName,
                            to: officialEosAccount,
                            quantity: quanity,
                            memo: this.memo,
                        },
                    }]
                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                });

                this.$vux.loading.hide()
                textContent += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);

                if( result.transaction_id ) {
                    this.$vux.toast.show({
                        text:this.$t('Transaction completed'),
                        type:'text',
                        width:'16rem',
                        position:'middle'
                    })
                }

            } catch (e) {
                this.$vux.loading.hide()
                textContent = '\nCaught exception: ' + e;
                this.$vux.alert.show({
                    title: '兑换失败',
                    content: e.toString()
                });

                if (e instanceof RpcError)
                    textContent += '\n\n' + JSON.stringify(e.json, null, 2);
            }
            console.log(textContent)
            // alert(textContent)
        // }
      }
    },
    beforeDestroy() {
        // clearInterval(interval)
    },
    mounted() {

        this.getEOSPrice();

      this.$common.fixStatusBarByHeader('c-header')

      

        this.getPrice();
        this.getMemo();

        // interval = setInterval(()=>{
            // this.getPrice();
        // }, 1 * 60 * 1000) // 每分钟更新一次价格


    }
  }
</script>

<i18n>
Get EOS price failed, please re-enter this page to try again:
    zh-CN: 获取EOS币价失败，请重新进入此页面再试一次
</i18n>

<style scoped>
.c-output-label {
    padding-right: 5rem;
    padding-left: 0;
    /* border-bottom: 1px solid #000000; */
}

  .rate-hint {
    text-align: center;
  }
</style>
