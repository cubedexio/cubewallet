<template>
  <div id="wallet" class=" head-bg-pic">
    <view-box>

    <x-header id="header" class="header-content" :left-options="{showBack: false}">{{ $t('My Wallet') }}</x-header>
    <section class="head-box-lg">
      <div class="profile-pic">
        <img :src="profilePic" alt="">
        <span class="user-name">{{account}}</span>
        <!--<div class="plus">-->
          <!--<i class="icon-plus"></i>-->
        <!--</div>-->
      </div>
      <div class="my-property" >
        <span class="property-head" @click="eyeOn = !eyeOn">
          {{ $t('MyProperty') }}(₵)：
          <i class="icon-eye" v-if="eyeOn"></i>
          <i class="icon-eye-off" v-if="!eyeOn"></i>
        </span>
        <p class="property-text" v-if="eyeOn">{{propertyComma}} CBT</p>
        <p class="property-text" v-if="!eyeOn">**** CBT</p>
      </div>
      <flexbox class="operation" :gutter="0">
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="4" class="text-center">
          <div class="transfer">
            <x-button class="operation-btn" plain link="/transfer">
              <img src="../assets/images/transfer.png" alt="">
              <span>{{$t('Transfer')}}</span>
            </x-button>
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="text-center">
          <x-button plain class="operation-btn" link="/transaction">
            <img src="../assets/images/exchange.png" alt="">
            <span>{{$t('Transaction')}}</span>
          </x-button>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </section>
    <group class="property-list">
      <transition name="fade">
      <div v-if="isLoaded">
            <cell-box class="property-item" :border-intent="false" link="/tokendetails/eosio.token">
              <flexbox>
                <flexbox-item :span="2">
                  <img src="@/assets/images/eos.png" alt="">
                </flexbox-item>
                <flexbox-item :span="5" class="text-left">
                  <span class="token-name">EOS</span>
                </flexbox-item>
                <flexbox-item :span="5" class="text-right property-num">
                  <p class="amount">
                    {{properyList[0].balance}}
                  </p>
                  <span class="money">
              $0
            </span>
                </flexbox-item>
              </flexbox>
            </cell-box>
            <cell-box class="property-item" :border-intent="false" link="/tokendetails/cbtban1">
              <flexbox>
                <flexbox-item :span="2">
                  <img src="@/assets/images/cbt_logo.png" alt="">
                </flexbox-item>
                <flexbox-item :span="5" class="text-left">
                  <span class="token-name">CBT</span>
                </flexbox-item>
                <flexbox-item :span="5" class="text-right property-num">
                  <p class="amount">
                    {{properyList[1].balance}}
                  </p>
                  <span class="money">
              $0
            </span>
                </flexbox-item>
              </flexbox>
            </cell-box>
      </div>
      <div v-else class="loading">
        <inline-loading></inline-loading>
      </div>
      </transition>
    </group>

    <!--<divider>{{ $t('I have bottom line') }}</divider>-->


    <!--LoggedIn: {{ $store.state.loggedIn }}-->

    </view-box>
  </div>
</template>

<i18n>
MyProperty:
  zh-CN: 我的资产
Transfer:
  zh-CN: 转账
Deposit:
  zh-CN: 收款
Transaction:
  zh-CN: 兑换
My Wallet:
  zh-CN: 资产
I have bottom line:
  zh-CN: 我是有底线的
</i18n>

<script>
  import {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    CellBox,
    Tabbar,
    TabbarItem,
    XHeader,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XButton,
    numberComma,
    ViewBox,
    InlineLoading
  } from 'vux'
  import common from '@/js/commonUtils'


  const propertyArr = [
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenCode:'eosio.token'
    },
    {
      imgSrc: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
      tokenName: 'CBT',
      tokenCode:'cbtban1'
    }
  ]
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      CellBox,
      Tabbar,
      TabbarItem,
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Divider,
      XButton,
      numberComma,
      ViewBox,
      InlineLoading
    },
    data() {
      return {
        properyList: [
          {
            tokenName: 'EOS',
            tokenCode:'eosio.token',
            balance:0
          },
          {
            tokenName: 'CBT',
            tokenCode:'cbtban1',
            balance:0
          }
        ],
        account: '',
        balance:0,
        profilePic:'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
        eyeOn:true,
        msg: 'Hello World!',
        isLoaded:false
      }
    },
    created(){
      this.account = this.$store.state.eosAccountName
      if(!this.account){
        this.account = 'fenghaha'
      }
      this.initBalance()
    },
    computed:{
      propertyComma(){
        let num = (this.balance).toFixed(4);
        return numberComma(num)
      },
    },
    methods:{
      initBalance(){
        let balanceArr = this.properyList
        for (let i = 0; i<balanceArr.length;i++){
          let code = balanceArr[i].tokenCode.toString()
          this.asyncGetBalance(code).then(res=>{
              
                if( res.length > 0 ) {
                    let b = res.data.data[0].balance
                    let n = common.getNumByBalance(b)
                    this.properyList[i].balance = n
                }
                // setTimeout(()=>{
                this.isLoaded = true
                // },1000)
          }).catch(res=>{
            console.log('获取数据出错：' + res)
          })
        }
      },
      async asyncGetBalance(code){
        let res = await this.$http.get('/balance',{
            params:{
              code:code,
              scope:this.account
            }
          })
        console.log(res)
        return new Promise((resolve,reject)=>{
          if(res.data.code == 0){
            resolve(res)
          }else{
            reject(res)
          }
        })
      }
    }
  }
</script>

<style >
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-in-enter-active {
  transition: all .3s ease;
}
.slide-in-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-in-enter, .slide-in-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translatey(10px);
  opacity: 0;
}
</style>
