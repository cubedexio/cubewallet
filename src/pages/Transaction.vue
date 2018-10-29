<template>
  <transition name="slide">
  <div id="transaction">
    <view-box>

      <x-header class="header-content-sm" :left-options="{backText:''}">{{ $t('Transaction') }}</x-header>

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
            <x-input disabled type='text' class="c-input" placeholder="请输入数量" :value="transactionCBT"/>
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
            <x-input disabled type='text' class="c-input" :placeholder="$t('Please enter a number')" :value="transactionEos"></x-input>
          </group>
        </swiper-item>
      </swiper>
      <p class="terms">
        <check-icon class="checkTerms" :value.sync="checkTerms" >
          {{ $t('Please make sure you read') }}
        </check-icon>
        <a href="#" class="terms-text">
          《{{$t('The Terms of Transaction')}}》
        </a>
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
    Toast
  } from 'vux'

import { setInterval } from 'timers';
import { mapState } from 'vuex'

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
      Toast
    },
    data() {
      return {
        exchangeRate: 1,
        amount: 0,
        CBTAmount: 0,
        eosRmb: 36,
        i:0,
        checkTerms:false
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

          console.log('eos兑换cbt')
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
          console.log('cbt兑换eos')

        }



        this.transaction()


      },
      switchTab(index){
        this.i = index;
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
                    content: err.message
                });   
            })
      },

      async transaction() {

        const rpc = new JsonRpc('https://eos.greymass.com');
        const signatureProvider = new JsSignatureProvider([this.privateKey]);
        const api = new Api({ rpc, signatureProvider });
        

          let textContent = ''

            let quanity = (new Number(this.amount)).toFixed(4) + ' EOS'
            try {
                console.log('sb1')
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
                            to: 'skyhigh12345',
                            quantity: quanity,
                            memo: '',
                        },
                    }]
                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                });
            
                textContent += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);

                
            } catch (e) {
                textContent = '\nCaught exception: ' + e;
                console.log(textContent);
                
                if (e instanceof RpcError)
                    textContent += '\n\n' + JSON.stringify(e.json, null, 2);
            }
            console.log(textContent)
            alert(textContent)
        // }
      }
    },
    beforeDestroy() {
        clearInterval(interval)
    },
    mounted() {


        console.log('sb0')

        this.getPrice();

        interval = setInterval(()=>{
            this.getPrice();
        }, 1 * 60 * 1000) // 每分钟更新一次价格

    }
  }
</script>

<style scoped>
  .rate-hint {
    text-align: center;
  }
</style>
