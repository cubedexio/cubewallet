<template>
  <div id="token-details" class="head-bg-pic">
    <view-box>
      <x-header class="header-content" :left-options="{backText:''}">
        <i class="token-icon">
          <img v-if="tokenName=='CBT'" src="@/assets/images/cubecart.png" alt="">
          <img v-else src="@/assets/images/eos.png" alt="">
        </i>
      </x-header>
      <section class="head-box-lg text-center">
        <span>{{tokenName}}</span>
        <p class="token-amount">
          <b v-if="isLoaded">{{tokenAmount}}</b>
          <inline-loading v-else></inline-loading>
        </p>
      </section>
      <group class="token-intro">
        <cell is-link :link="'/tokenintro/'+code">
          <span slot="title" is-link>
            <i class="icon-details"></i>
            <span style="vertical-align:middle;">{{ $t('Token Intro') }}</span>
          </span>
        </cell>
      </group>
      <!--<tab>-->
      <!--<tab-item selected>{{ $t('All') }}</tab-item>-->
      <!--<tab-item>{{ $t('Out') }}</tab-item>-->
      <!--<tab-item>{{ $t('In') }}</tab-item>-->
      <!--<tab-item>{{ $t('Failed') }}</tab-item>-->
      <!--</tab>-->
      <!--<swiper :show-dots="false" v-model="i">-->
        <!--<swiper-item></swiper-item>-->
      <!--</swiper>-->
      <panel :header="$t('Transfer Record')" class="transfer-record">
        <div v-if="isTransLoaded" slot="body">
          <div v-for="item in trans" class="record-item" :key="item.seq">
            <flexbox slot="title">
              <flexbox-item :span="2" class="text-center">
                <i class="icon-out item-icon" v-if="item.data.from == myAddress"></i>
                <i class="icon-in item-icon" v-else></i>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="record-intro">
                  <p v-if="item.data.from == myAddress">{{item.data.to}}</p>
                  <p v-else>{{item.data.from}}</p>
                  <span class="record-time">
                  {{getTime(item.time)}}
                </span>
                </div>
              </flexbox-item>
              <flexbox-item class="balance-box" :span="4">
              <span :class="{ 'record-balance':true, 'balance-out': item.data.from == myAddress, 'balance-in': item.data.from !== myAddress}">
                {{getQuantity(item.data.quantity)}}
              </span>
              </flexbox-item>
            </flexbox>
          </div>

        </div>
        <div v-else class="text-center" slot="body">
          <inline-loading class="text-center" ></inline-loading>
        </div>
      </panel>
      <divider>{{$t('I have bottom line')}}</divider>
    </view-box>
  </div>
</template>
<i18n>
All:
  zh-CN: 全部
Out:
  zh-CN: 转出
In:
  zh-CN: 转入
Failed:
  zh-CN: 失败
Token Intro:
  zh-CN: 通证详情
Transfer Record:
  zh-CN: 转账记录
</i18n>
<script>
  const transferLsit = [
    {
      from: '0xabcdecfsdfsdfs2d',
      to: '0xsasdfdfdsdfs2d',
      balance: 400,
      status: 1,
      time:'2018-10-20 13:44:32',
      TxID: '0x3sdfs32df21',
      block: '65321'
    },
    {
      from: '0xsasdfdfdsdfs2d',
      to: '0xabcdecfsdfsdfs2d',
      balance: 400,
      status: 1,
      time:'2018-10-20 13:44:32',
      TxID: '0x3sdfs32df21',
      block: '65321'
    },
    {
      from: '0xsasdfdfdsdfs2d',
      to: '0xabcdecfsdfsdfs2d',
      balance: 400,
      status: 1,
      time:'2018-10-20 13:44:32',
      TxID: '0x3sdfs32df21',
      block: '65321'
    },
    {
      from: '0xabcdecfsdfsdfs2d',
      to: '0xabcdecfsdfsdfs2d',
      balance: 400,
      status: 1,
      time:'2018-10-20 13:44:32',
      TxID: '0x3sdfs32df21',
      block: '65321'
    },
    {
      from: '0xsasdfdfdsdfs2d',
      to: '0xabcdecfsdfsdfs2d',
      balance: 400,
      status: 1,
      time:'2018-10-20 13:44:32',
      TxID: '0x3sdfs32df21',
      block: '65321'
    }
  ];
  import {
    ViewBox,
    XHeader,
    Group,
    Cell,
    Tab,
    TabItem,
    numberComma,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    CellBox,
    Panel,
    Divider,
    InlineLoading
  } from 'vux'
  import common from '@/js/commonUtils.js'

  export default {
    name: 'tokenDetails',
    components: {
      ViewBox,
      XHeader,
      Group,
      Cell,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      CellBox,
      Panel,
      Divider,
      InlineLoading
    },
    data() {
      return {
        tokenImg: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
        tokenName: 'CBT',
        tokenAmount: 0,
        transfers:[],
        trans:[],
        myAddress:'',
        code:'',
        isLoaded:false,
        isTransLoaded:false
      }
    },
    created(){
      this.myAddress = this.$store.state.eosAccountName
      if(!this.myAddress){
        this.myAddress = 'fenghaha'
      }
      this.code = this.$route.params.code
      this.setTokenName()
      this.getBalance()
      this.getTransList()
    },
    computed: {
      amount() {
        let num = this.tokenAmount.toFixed(4);
        return numberComma(num);
      }
    },
    methods:{
      initPage(){
      },
      setTokenName(){
        if(this.code){
          this.tokenName = this.code == 'eosio.token' ? 'EOS' : 'CBT'
        }
      },
      getBalance(){
        this.$http.get('/balance',{
          params:{
            code:this.code,
            scope:this.myAddress
          }
        }).then(res=>{
          // console.log(Boolean(res.data.data))
          if( res.status !== 200  || res.data.code !== 0 ) {
            this.$vux.alert.show({ title: '获取余额失败', content: res.data.msg ||  res.statusText || '未知错误', });
            return;
          }
          if(res.data.data.length > 0){
            let str = res.data.data[0].balance
            let b = common.getNumByBalance(str)
            this.tokenAmount = b
          }

          this.isLoaded = true
        }).catch(res=>{
          // console.log(res)
          this.$vux.alert.show({
            title:this.$t('Get Balance fail'),
            content:res.msg
          })
        })
      },
      getTransList(){
        this.$http.get('/trans',{
          params:{
            name:this.myAddress,
            code:this.code
          }
        }).then(res=>{
          if( res.status !== 200  || res.data.code !== 0 ) {
            this.$vux.alert.show({ title: '获取转账记录失败', content: res.msg ||  res.statusText || '未知错误', });
            return;
          }
          this.trans = res.data.data
          this.isTransLoaded = true
          // console.log(res,res.data.data)
          // console.log(JSON.parse(JSON.stringify(this.transfers)))
        }).catch(res=>{
          console.log('获取转账数据失败：'+ res)
        })
      },
      getTime(time){
        let t = time.split('T')
        let ymd = t[0]
        let hms = t[1].substring(0,8)
        return ymd + ' ' + hms
      },
      getQuantity(str){
        return common.getNumByBalance(str)
      }
    }
  }
</script>
