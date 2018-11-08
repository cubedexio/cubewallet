<template>
  <div id="withdraw">
    <view-box>
      <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Withdraw') }}</x-header>
      <div class="content">
        <span class="title">{{$t('Token')}}</span>
        <p class="token-options">
          <img class="token-icon" src="@/assets/images/Eos_logo.png" alt="">
          <span class="token-name">₵EOS</span>
        </p>
        <div class="receiver input-box">
          <label>{{$t('Receiver')}}</label>
          <p>
            <b>{{receiver}}</b>
          </p>
        </div>
        <div class="withdraw-amount input-box">
          <div class="property">
            <p class="text-right">{{$t('Balance')}}</p>
            <p class="text-right">
            <span v-if="isBalanceLoaded">
            {{balance}}
            </span>
              <inline-loading v-else></inline-loading>
            </p>
          </div>
          <label>{{$t('Withdraw Amount')}}</label>
          <x-input :placeholder="$t('Please Enter Withdraw Amount')" v-model="transferAmount" class="input-black"
                   name="transferAmount"></x-input>
        </div>
        <br>
        <x-button type='primary' @click.native="doWithdraw">{{ $t('Confirm Transfer') }}</x-button>
      </div>
    </view-box>
  </div>
</template>
<i18n>
Withdraw Amount:
  zh-CN: 提现数量
Please Enter Withdraw Amount:
  zh-CN: 请输入提现数量
The withdrawa amount shall not be greater than the balance:
  zh-CN: 提现金额不能大于余额
Withdraw Success:
  zh-CN: 提现成功
Withdraw Fail:
  zh-CN: 提现失败
Withdrawing...:
  zh-CN: 提现中...
</i18n>
<script>
  import {
    ViewBox,
    XHeader,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Qrcode,
    XButton,
    InlineLoading,
    XInput
  }
    from 'vux'

  import {mapState} from 'vuex'

  export default {
    name:'withdraw',
    components:{
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      Qrcode,
      XButton,
      InlineLoading,
      XInput
    },
    data(){
      return{
        account:'',
        isBalanceLoaded:false,
        transferAmount:null,
        balance:0,
        receiver:'otonionscube'
      }
    },
    mounted(){
      this.account = this.eosAccountName
      if(!this.account){
        this.account = 'fenghaha'
      }
      // console.log(this.account)
      this.getBalance()
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')
    },
    computed:{
      ...mapState(['eosAccountName']),
      ...{
      }
    },
    methods:{
      getBalance(){
        this.$http.get('/balance',{
          params:{
            code:'eosio.token',
            name:this.account
          }
        }).then(res=>{
          if(res.status !== 200 || res.data.code !== 0){
            this.$vux.alert.show({
              title:this.$t('Get Balance Fail'),
              content: res.msg
            })
            return
          }

          if (res.data.data.length > 0) {
            let rows = res.data.data;
            let b = this.$common.getNumByBalance(rows[0].balance)
            this.balance = b
          }
          this.isBalanceLoaded = true
        })
      },
      doWithdraw(){
        //如果账号余额为零则阻止操作
        if (!this.balance) {
          this.$vux.toast.show({
            text: this.$t('Insufficient Balance!'),
            type: 'text',
            width: '16rem',
            position: 'middle'
          })
          return
        }
        //校验金额不为空
        if (!this.transferAmount) {
          this.$vux.toast.show({
            text: this.$t('Please Enter Amount Number'),
            type: 'text',
            width: '16rem',
            position: 'middle'
          })
          return
        }
        //校验金额为数字
        if (!/^\d+(\.\d+)?$/.test(this.transferAmount)) {
          this.$vux.toast.show({
            text: this.$t('Please Enter Amount Number'),
            type: 'text',
            width: '16rem',
            position: 'middle'
          })
          return
        }
        //提现金额不能大于余额
        let b = parseFloat(this.balance)
        let t = parseFloat(this.transferAmount)
        // console.log(b < t,b , t)
        if(b < t){
          this.$vux.toast.show({
            text: this.$t('The withdrawa amount shall not be greater than the balance'),
            type: 'text',
            width: '16rem',
            position: 'middle'
          })
          return
        }

        //转账操作
        this.$vux.loading.show({
          text: this.$t('Withdrawing...')
        })
        let code = 'eosio.token'
        let from = this.account
        let to = this.receiver
        let sym = 'EOS'
        let quant = parseFloat(this.transferAmount) * 10000;
        console.log(code, from, to, quant)
        this.$http.get('/transfer', {
          params: {
            code: code,
            from: from,
            to: to,
            quant: quant,
            sym: sym
          }
        }).then(res => {
          console.log(res)
          if (res.data.code !== 0 || res.status !== 200) {
            this.$vux.alert.show({
              title: this.$t('Withdraw Fail'),
              content: res.data.msg,
              type: 'success',
              width: '16rem',
              position: 'middle',
              onConfirm: this.getBalance(code)
            })
            this.$vux.loading.hide()
            return
          }
          this.$vux.toast.show({
            text: this.$t('Withdraw Success'),
            type: 'success',
            width: '16rem',
            position: 'middle',
            onHide: this.resetInput()
          })
          this.getBalance()
          this.$vux.loading.hide()
        }).catch(res => {
          // console.log("转账失败，失败原因：" + res)
          this.$vux.loading.hide()
          this.$vux.alert.show({
            title:this.$t('Withdraw Fail'),
            content:res.data.msg
          })
        })
      },
      resetInput(){
        this.transferAmount = ''
      }
    }
  }
</script>
