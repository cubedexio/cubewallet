<template>
  <transition name="slide">
  <div id="token-intro" class="head-bg-pic">
    <view-box>
      <x-header :left-options="{backText:''}" class="header-content"><i class="token-icon"><img :src="tokenImg" alt=""></i></x-header>
      <section class="head-box-lg text-center">
        <span>{{tokenName}}</span>
        <p class="token-amount"><b>{{tokenAmount}}</b></p>
      </section>
      <group>
        <cell :title="$t('Max Supply')" :value="numberC(maxSupply)"></cell>
        <cell :title="$t('Exchange Maximum')" :value="numberC(exchangMaximum)"></cell>
        <cell :title="$t('Reserved Supply')" :value="numberC(reservedSupply)"></cell>
        <cell :title="$t('Connector balance')" :value="numberC(connectorBalance)"></cell>
        <cell :title="$t('Connector Weight')" :value="connectorWeight"></cell>
        <cell :title="$t('Reserved Balance')" :value="numberC(reservedBalance)"></cell>
      </group>
    </view-box>
  </div>
  </transition>
</template>
<i18n>
Max Supply:
  zh-CN: 最大发行量
Exchange Maximum:
  zh-CN: 最大流通数
Reserved Supply:
  zh-CN: 保留通证数
Connector balance:
  zh-CN: 准备金
Connector Weight:
  zh-CN: 准备金率
Reserved Balance:
  zh-CN: 保留准备金
</i18n>
<script>
  import {
    ViewBox,
    XHeader,
    Group,
    Cell,
    numberComma
  } from 'vux'
  export default {
    name:'tokenIntro',
    components:{
      ViewBox,
      XHeader,
      Group,
      Cell,
      numberComma
    },
    data(){
      return{
        tokenImg: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
        tokenName: 'CBT',
        tokenAmount: '3256.135',
        maxSupply:4000000000,
        exchangMaximum:6000000000,
        reservedSupply:3000000000,
        connectorBalance:1000000000,
        connectorWeight:'10.97%',
        reservedBalance:6000000000
      }
    },
    methods:{
      numberC(num){
        let n = num.toFixed(4);
        return numberComma(n);
      }
    }
  }
</script>
