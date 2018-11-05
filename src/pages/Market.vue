<template>
  <div id="market" class="head-sm-pic">
    <view-box>
      <x-header id="c-header" :left-options="{showBack: false}" class="header-content">{{$t('Market')}}</x-header>
      <x-table class="token-table" :cell-bordered="false">
        <thead>
        <tr>
          <th class="number">#</th>
          <th class="text-left">Name</th>
          <th></th>
          <th ref="sortPrice" class="sort-price text-left">$
            <!--<i><img src="../assets/images/options-arrow.png" alt=""></i> -->
          </th>
          <th ref="sortRange">24H
            <!--<i><img src="../assets/images/options-arrow.png" alt=""></i>-->
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tokenList" :key="item.id" @click="goTransaction">
          <td>{{index}}</td>
          <td class="text-left">
            <i class="token-img"><img :src="item.tokenImg" alt=""></i>
            {{item.name}}</td>
          <td>{{item.tokenName}}</td>
          <td class="text-left">${{item.price}}</td>
          <td :class="{ goUp : item.range>0, goDown:item.range<0 }">
            {{ item.range + '%'}}
          </td>
        </tr>
        </tbody>
      </x-table>
    </view-box>
  </div>
</template>
<i18n>
Market:
  zh-CN: 市场
</i18n>
<script>
  const tokens = [
    {
      id:1,
      tokenName:'EOS',
      price:6.6,
      name:'Eos',
      tokenImg:'../static/imgs/eos.png',
      range:'-2.46'
    },
    {
      id:2,
      tokenName:'CBT',
      price:0.5,
      name:'CubeCart',
      tokenImg:'../static/imgs/cbt.png',
      range:'+3.46'
    },
  ]
  import {
    ViewBox,
    XHeader,
    XTable
  } from 'vux'

  export default {
    name:'market',
    components:{
      ViewBox,
      XHeader,
      XTable
    },
    data(){
      return{
        tokenList:tokens
      }
    },
    mounted(){
      this.getPriceByCodePerSec()
    },
    methods:{
      goTransaction(){
        this.$router.push('/transaction')
      },
      getPriceByCodePerSec(code){
        // this.$http.get('/bqi/ticker',{
        //   params:{
        //     code:code
        //   }
        // }).then(res=>{
        //   console.log(res)
        //   if(res.length > 0){
        //
        //   }
        // })
        // setInterval(()=>{
        // },10000)

      },
      nextIntegerHour(){
        let data = new Date()

      }
    }
  }
</script>
