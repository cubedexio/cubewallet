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
            {{item.name}}
          </td>
          <td>{{item.tokenName}}</td>
          <td class="text-left">${{item.price}}</td>
          <td :class="{ goUp : item.range >= 0, goDown:item.range < 0 }">
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
      id: 1,
      tokenName: 'EOS',
      price: 0,
      name: 'Eos',
      tokenImg: '../static/imgs/eos.png',
      range: '-2.46'
    },
    {
      id: 2,
      tokenName: 'CBT',
      price: 0,
      name: 'CubeCart',
      tokenImg: '../static/imgs/cbt.png',
      range: '+3.46'
    },
  ]
  import {
    ViewBox,
    XHeader,
    XTable
  } from 'vux'

  export default {
    name: 'market',
    components: {
      ViewBox,
      XHeader,
      XTable
    },
    data() {
      return {
        tokenList: tokens
      }
    },
    mounted() {
      // setInterval(() => {
      //   this.getEosPrice()
      //   this.getCbtPrice()
      // }, 5000)
      this.getEosPrice()
      this.getCbtPrice()
    },
    methods: {
      goTransaction() {
        this.$router.push('/transaction')
      },
      getEosPrice() {
        this.$http.get('/prices', {
          params: {
            sym: 'eos',
            hour: 14
          }
        }).then(res => {
          console.log(res)
          if (res.status !== 200 || res.data.code !== 0) {
            this.$vux.alert.show({
              title: this.$t('Get price fail'),
              content: res.msg
            })
            return
          }
          this.tokenList[0].price = res.data.data.price
          if(res.data.data.percent){
            this.tokenList[0].range = res.data.data.percent.toFixed(2)
          }else {
            this.tokenList[0].range = 0.00
          }
        })
      },
      getCbtPrice() {
        this.$http.get('/prices', {
          params: {
            sym: 'cbt',
            hour: 14
          }
        }).then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$vux.alert.show({
              title: this.$t('Get price fail'),
              content: res.msg
            })
            return
          }
          if(res.data.data.percent){
            this.tokenList[1].range = res.data.data.percent.toFixed(2)
          }else {
            this.tokenList[1].range = 0
          }
          this.tokenList[1].price = res.data.data.price
        })
      }
    }
  }
</script>
