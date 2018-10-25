<template>
  <transition name="slide">
  <div id="token-details" class="head-bg-pic">
    <view-box>
      <x-header class="header-content" :left-options="{backText:''}"><i class="token-icon"><img :src="tokenImg" alt=""></i>
      </x-header>
      <section class="head-box-lg text-center">
        <span>{{tokenName}}</span>
        <p class="token-amount"><b>{{tokenAmount}}</b></p>
      </section>
      <group class="token-intro">
        <cell is-link link="/tokenintro">
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
        <div slot="body" v-for="item in transfers" class="record-item" :key="item.id">
          <flexbox slot="title">
            <flexbox-item :span="2" class="text-center">
              <i class="icon-out item-icon" v-if="item.from == myAddress"></i>
              <i class="icon-in item-icon" v-else></i>
            </flexbox-item>
            <flexbox-item :span="6">
              <div class="record-intro">
                <p v-if="item.from == myAddress">{{item.to}}</p>
                <p v-else>{{item.from}}</p>
                <span class="record-time">
                  {{item.time}}
                </span>
              </div>
            </flexbox-item>
            <flexbox-item class="balance-box" :span="4">
              <span :class="{ 'record-balance':true, 'balance-out': item.from == myAddress, 'balance-in': item.from !== myAddress}">
                {{(item.balance).toFixed(4)}}
              </span>
            </flexbox-item>
          </flexbox>
        </div>
      </panel>
      <divider>{{$t('I have bottom line')}}</divider>
    </view-box>
  </div>
  </transition>
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
    Divider
  } from 'vux'

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
      Divider
    },
    data() {
      return {
        tokenImg: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
        tokenName: 'CBT',
        tokenAmount: '3256.135',
        transfers:transferLsit,
        myAddress:'0xabcdecfsdfsdfs2d'
      }
    },
    computed: {
      amount() {
        let num = this.tokenAmount.toFixed(4);
        return numberComma(num);
      }
    }
  }
</script>
