<template>
  <div id="wallet" class=" head-bg-pic">
    <view-box>

      <x-header id="c-header" class="header-content" :left-options="{showBack: false}">{{ $t('My Wallet') }}</x-header>
      <section class="head-box-lg">
        <div class="profile-pic">
          <img src="@/assets/images/default_avatar.png" alt="">
          <span class="user-name">{{account}}</span>
          <!--<div class="plus">-->
          <!--<i class="icon-plus"></i>-->
          <!--</div>-->
        </div>
        <div class="my-property">
        <span class="property-head" @click="SETSEENPROPERTY">
          {{ $t('MyProperty') }}(₵)：
          <i class="icon-eye" v-if="seenProperty"></i>
          <i class="icon-eye-off" v-else></i>
        </span>
          <p class="property-text" v-if="seenProperty">

            <span v-if="isLoaded">{{propertyComma}}</span>
            <inline-loading v-else></inline-loading>
            CBT
          </p>
          <p class="property-text" v-else>**** CBT</p>
        </div>
        <flexbox class="operation" :gutter="0">
          <flexbox-item :span="3" class="text-center">
            <div class="transfer">
              <x-button class="operation-btn" plain link="/transfer">
                <img src="../assets/images/transfer.png" alt="">
                <span>{{$t('Transfer')}}</span>
              </x-button>
            </div>
          </flexbox-item>
          <flexbox-item :span="3" class="text-center">
            <x-button plain class="operation-btn" link="/transaction">
              <img src="../assets/images/exchange.png" alt="">
              <span>{{$t('Transaction')}}</span>
            </x-button>
          </flexbox-item>
          <flexbox-item :span="3" class="text-center">
          <x-button plain class="operation-btn" link="/deposit">
            <img src="../assets/images/deposit.png" alt="">
            <span>{{$t('Deposit')}}</span>
          </x-button>
        </flexbox-item>
          <flexbox-item :span="3" class="text-center">
            <x-button plain class="operation-btn" link="/withdraw">
              <img src="../assets/images/withdraw.png" alt="">
              <span>{{$t('Withdraw')}}</span>
            </x-button>
          </flexbox-item>
        </flexbox>
      </section>
      <group class="property-list">
        <transition name="fade">
          <div>
            <cell-box class="property-item" :border-intent="false" :link="'/tokendetails/'+properyList[0].tokenCode">
              <flexbox>
                <flexbox-item :span="2">
                  <img src="static/imgs/eos.png" alt="">
                </flexbox-item>
                <flexbox-item :span="5" class="text-left">
                  <span class="token-name">₵EOS</span>
                </flexbox-item>
                <flexbox-item :span="5" class="text-right property-num">
                  <p class="amount" v-if="seenProperty">
                    {{properyList[0].balance}}
                  </p>
                  <p class="amount" v-else>
                    ****
                  </p>
                  <span class="money" v-if="seenProperty">
                  ₵{{(properyList[0].balance * exchangeRate).toFixed(4)}}
                  </span>
                  <span class="money" v-else>
                    ****
                  </span>
                </flexbox-item>
              </flexbox>
            </cell-box>
            <cell-box class="property-item" :border-intent="false" :link="'/tokendetails/'+properyList[1].tokenCode">
              <flexbox>
                <flexbox-item :span="2">
                  <img src="static/imgs/cbt.png" alt="">
                </flexbox-item>
                <flexbox-item :span="5" class="text-left">
                  <span class="token-name">CBT</span>
                </flexbox-item>
                <flexbox-item :span="5" class="text-right property-num">
                  <p v-if="seenProperty" class="amount">
                    {{properyList[1].balance}}
                  </p>
                  <p v-else class="amount">
                    ****
                  </p>
                  <span class="money" v-if="seenProperty">
                    ₵{{properyList[1].balance}}
                  </span>
                  <span class="money" v-else>
                    ****
                  </span>
                </flexbox-item>
              </flexbox>
            </cell-box>
          </div>
          <!--<div v-else class="loading">-->
            <!--<inline-loading></inline-loading>-->
          <!--</div>-->
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
  zh-CN: 充值
Transaction:
  zh-CN: 兑换
My Wallet:
  zh-CN: 资产
I have bottom line:
  zh-CN: 我是有底线的
Withdraw:
  zh-CN: 提现
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

  import {mapState,mapMutations} from 'vuex'


  const propertyArr = [
    {
      imgSrc: 'https://static2.digifinex.com/Public/Uploads/2018-06-19/5b28e2ec09d6b.png',
      tokenName: 'EOS',
      tokenCode: 'eosio.token'
    },
    {
      imgSrc: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
      tokenName: 'CBT',
      tokenCode: 'cbtban1'
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
            tokenCode: 'eosio.token',
            balance: 0
          },
          {
            tokenName: 'CBT',
            tokenCode: 'cbtban1',
            balance: 0
          }
        ],
        account: '',
        balance: 0,
        exchangeRate: 1,
        profilePic: './static/imgs/man_avatar.png',
        eyeOn: true,
        msg: 'Hello World!',
        isLoaded: false
      }
    },
    created() {
      this.account = this.$store.state.eosAccountName
      // if (!this.account) {
      //   this.account = 'fenghaha'
      // }
    },
    mounted() {
      this.getExchangeRate()
      this.initBalance()
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')
    },
    computed: {
      ...mapState(['seenProperty']),
      ...{
        propertyComma() {
          let num = this.properyList[1].balance;
          return numberComma(num)
        }
      }
    },
    methods: {
      ...mapMutations(['SETSEENPROPERTY']),
      ...{
        initBalance() {
          // this.$http.all([this.getBalance(this.properyList[0].tokenCode),this.getBalance(this.properyList[1].tokenCode)]).then(
          //   this.$http.spread((eosRes,cbtRes)=>{
          //     console.log(eosRes,cbtRes)
          //   })
          // )
          let balanceArr = this.properyList
          for (let i = 0; i < balanceArr.length; i++) {
            let code = balanceArr[i].tokenCode.toString()
            this.$http.get('/balance', {
              params: {
                code: code,
                name: this.account
              }
            }).then(res => {
              this.failAlert(res)
              if (res.data.data.length > 0) {
                let b = res.data.data[0].balance
                let n = common.getNumByBalance(b)
                console.log(n)
                this.properyList[i].balance = n
              }
            }).catch(err => {
              console.log(`获取${code}余额失败：` + err)
            })
            setTimeout(() => {
              this.isLoaded = true
            }, 500)
          }
        },
        failAlert(res) {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$vux.alert.show({title: '获取余额失败', content: res.data.msg || res.statusText || '未知错误',});
            return;
          }
        },
        getBalance(code) {
          return this.$http.get('/balance', {
            params: {
              code: code,
              name: this.account
            }
          })
        },
        getExchangeRate() {
          this.$http.get('/get_price').then(res => {
            this.failAlert(res)
            if (res.data.data) {
              let price = res.data.data.price
              this.exchangeRate = this.$common.exchangeRate(price)
            }
          }).catch(err => {
            console.log('获取兑换数失败：' + err)
          })
        }
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .slide-in-enter-active {
    transition: all .3s ease;
  }

  .slide-in-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-in-enter, .slide-in-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translatey(10px);
    opacity: 0;
  }
</style>
