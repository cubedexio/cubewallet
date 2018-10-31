<template>
  <transition name="slide">
  <div id="token-intro" class="head-bg-pic">
    <view-box>
      <x-header :left-options="{backText:''}" class="header-content">
        <i class="token-icon">
        <img v-if="tokenName=='CBT'" src="@/assets/images/cubecart.png" alt="">
        <img v-else src="@/assets/images/eos.png" alt="">
        </i>
      </x-header>
      <section class="head-box-lg text-center">
        <span>{{tokenName}}</span>
        <p class="token-amount"><b>{{tokenAmount}}</b></p>
      </section>
      <group>
        <div v-if="tokenName == 'CBT'">
          <cell :title="$t('Max Supply')" :value="numberC(maxSupply)"></cell>
          <cell :title="$t('Exchange Maximum')" :value="numberC(exchangMaximum)"></cell>
          <cell :title="$t('Reserved Supply')" :value="numberC(reservedSupply)"></cell>
          <cell :title="$t('Connector balance')" :value="numberC(connectorBalance)"></cell>
          <cell :title="$t('Connector Weight')" :value="connectorWeight"></cell>
          <cell :title="$t('Reserved Balance')" :value="numberC(reservedBalance)"></cell>
        </div>
        <div v-else>
          <cell :title="$t('Max Supply')" value="1,000,000,000.0000"></cell>
        </div>
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
        tokenName: 'CBT',
        tokenAmount: 0,
        maxSupply:4000000000,
        exchangMaximum:6000000000,
        reservedSupply:3000000000,
        connectorBalance:1000000000,
        connectorWeight:'10.97%',
        reservedBalance:6000000000,
        code:'cbtban1',
        account:''
      }
    },
    created(){
      this.account = this.$store.state.eosAccountName
      if(!this.account){
        this.account = 'fenghaha'
      }
      this.code = this.$route.params.code
      if(!/cbt/.test(this.code)){
        this.tokenName = 'EOS'
      }
      this.getBalance()
    },
    methods:{
      numberC(num){
        let n = num.toFixed(4);
        return numberComma(n);
      },
      getBalance(){
        this.$http.get('/balance',{
          params:{
            code:this.code,
            scope:this.account
          }
        }).then(res=>{
          console.log(res)
          this.tokenAmount = res.data.data[0].balance
        }).catch(res=>{
          console.log("获取余额失败："+res)
        })
      }

    }
  }
</script>
