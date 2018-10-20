<template>

  <div id="wallet" class=" head-bg-pic">
    <x-header class="header-content" :left-options="{showBack: false}">{{ $t('My Wallet') }}</x-header>
    <section class="head-box-lg">
      <div class="profile-pic">
        <img :src="profilePic" alt="">
        <span class="user-name">{{userName}}</span>
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
        <p class="property-text" v-if="eyeOn">{{myProperty}} CBT</p>
        <p class="property-text" v-if="!eyeOn">**** CBT</p>
      </div>
      <flexbox class="operation" :gutter="0">
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="4" class="text-center">
          <div class="transfer">
            <img src="../assets/images/transfer.png" alt="">
            <span>{{$t('Transfer')}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="text-center">
          <img src="../assets/images/exchange.png" alt="">
          <span>{{$t('Exchange')}}</span>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </section>
    <group class="property-list">
      <cell-box v-for="item in properyList" :key="item.id" class="property-item" :border-intent="false">
        <flexbox>
          <flexbox-item :span="2">
            <img :src="item.imgSrc" alt="">
          </flexbox-item>
          <flexbox-item :span="5" class="text-left">
            <span class="token-name">{{item.tokenName}}</span>
          </flexbox-item>
          <flexbox-item :span="5" class="text-right property-num">
            <p class="amount">
              {{item.tokenAmount}}
            </p>
            <span class="money">
              ₵ {{item.money}}
            </span>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box class="property-item" :border-intent="false">
        <flexbox>
          <flexbox-item :span="2">
            <img src="../assets/images/cbt_logo.png" alt="">
          </flexbox-item>
          <flexbox-item :span="5" class="text-left">
            <span class="token-name">EOS</span>
          </flexbox-item>
          <flexbox-item :span="5" class="text-right property-num">
            <p class="amount">
              24000
            </p>
            <span class="money">
              $200
            </span>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>

    <divider>{{ $t('I have bottom line') }}</divider>


    LoggedIn: {{ $store.state.loggedIn }}

  </div>
</template>

<i18n>
MyProperty:
  zh-CN: 我的资产
Transfer:
  zh-CN: 转账
Deposit:
  zh-CN: 收款
Exchange:
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
    Divider
  } from 'vux'


  const propertyArr = [
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
    },
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenAmount: '5000',
      money: '200'
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
      Divider
    },
    data() {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        properyList: [],
        userName: 'Somebody',
        profilePic:'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
        myProperty:'8,888,888,888.88',
        eyeOn:true,
        msg: 'Hello World!'
      }
    },
    mounted(){
      this.properyList = propertyArr;
    }
  }
</script>

<style>
</style>
