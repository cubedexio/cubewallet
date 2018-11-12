<template>
  <transition name="slide">
    <div id="transfer">
      <view-box>
        <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Transfer') }}</x-header>
        <group :title="$t('Token')" class="options-trigger">
          <div class="token-options" @click="showMenu = !showMenu">
            <i class="token-icon">
              <img :src="selectedImg" alt="">
            </i>
            <span class="token-name">{{selected}}</span>
            <span class="options-arrow"></span>
          </div>
        </group>
        <div class="receiver input-box">
          <label>{{$t('Receiver')}}</label>
          <x-input :placeholder="$t('Please Enter Account')" v-model="receiver" class="input-black"
                   name="receiver"></x-input>
        </div>
        <div class="transfer-amount input-box">
          <div class="property">
            <p class="text-right">{{$t('Balance')}}</p>
            <p class="text-right">
            <span v-if="isBalanceLoaded">
            {{balanceNum}}
            </span>
              <inline-loading v-else></inline-loading>
            </p>
          </div>
          <label>{{$t('Transfer Amount')}}</label>
          <x-input :placeholder="$t('Please Enter Amount Number')" v-model="transferAmount" class="input-black"
                   name="transferAmount"></x-input>
        </div>
        <div class="remark input-box">
          <label>{{$t('Remark')}}</label>
          <x-input :placeholder="$t('Please Enter Remark')" v-model="remark" class="input-black"
                   name="remark"></x-input>
        </div>
        <x-button type='primary' @click.native="doTransfer">{{ $t('Confirm Transfer') }}</x-button>
        <div class="show-popup">
          <popup v-model="showMenu">
            <div class="menu-item" v-for="item in menus" @click="switchMenu(item)">
              <i class="item-icon"><img :src="item.token_img" alt=""></i>
              <span class="item-name">
              {{item.token_name}}
            </span>
            </div>
          </popup>
        </div>

      </view-box>
    </div>
  </transition>
</template>
<i18n>
Transfer:
  zh-CN: 转账
Token:
  zh-CN: 通证
Receiver:
  zh-CN: 收款人
Transfer Amount:
  zh-CN: 转账数量
Balance:
  zh-CN: 余额
Remark:
  zh-CN: 备注
Please Enter Account:
  zh-CN: 请输入账户名称
Please Enter Amount Number:
  zh-CN: 请输入金额数字
Please Enter Remark:
  zh-CN: 请输入备注
Confirm Transfer:
  zh-CN: 确认转账
Transfer Success:
  zh-CN: 转账成功
Transfer Fail:
  zh-CN: 转账失败
Insufficient Balance!:
  zh-CN: 余额不足
Get Balance Fail:
  zh-CN: 获取余额失败
</i18n>
<script>
  const menuList = [
    {
      token_code: 'eosio.token',
      token_name: '₵EOS',
      token_img: './static/imgs/eos.png',
      amount: 300.2565
    },
    {
      token_code: 'cbtban1',
      token_name: 'CBT',
      token_img: './static/imgs/cbt.png',
      amount: 12003.004
    }
  ];
  import {
    ViewBox,
    XHeader,
    Group,
    Popup,
    XInput,
    XButton,
    InlineLoading,
    numberComma
  } from 'vux'
  import CubeInput from '@/components/CubeInput'

  export default {
    name: 'transfer',
    components: {
      ViewBox,
      XHeader,
      Group,
      Popup,
      CubeInput,
      XInput,
      XButton,
      InlineLoading,
      numberComma
    },
    data() {
      return {
        code: 'eosio.token',
        selected: '₵EOS',
        selectedImg: './static/imgs/eos.png',
        account: '',
        balance: 0,
        menus: menuList,
        showMenu: false,
        receiver: '',
        transferAmount: '',
        remark: '',
        isBalanceLoaded: false
      }
    },
    mounted() {
      this.account = this.$store.state.eosAccountName
      // if (!this.account) {
      //   this.account = 'fenghaha'
      // }
      this.getTokenBalance(this.code)
      this.$common.fixStatusBarByHeader('c-header')
    },
    computed: {
      balanceNum() {
        let num = this.balance.toFixed(4)
        return numberComma(num)
      }
    },
    methods: {
      switchMenu(item) {
        this.isBalanceLoaded = false
        let code = item.token_code
        let token = item.token_name
        let img = item.token_img
        this.getTokenBalance(code)
        this.code = code
        this.selected = token
        this.selectedImg = img
        this.showMenu = false
      },
      getTokenBalance(code) {
        let userName = this.account
        let that = this
        this.$http.get('/balance', {
          params: {
            code: code,
            name: userName
          }
        }).then(res => {
          if (res.status !== 200 || res.data.code !== 0) {
            this.$vux.alert.show({title: this.$t('Get Balance Fail'), content: res.data.msg || res.statusText || '未知错误',});
            return;
          }
          // console.log(res)
          if (res.data.data.length > 0) {
            let rows = res.data.data;
            let b = that.getBalanceNum(rows[0].balance)
            that.balance = b
          }else{
            this.balance = 0
          }
          this.isBalanceLoaded = true

        }).catch(res => {
          console.log('获取余额失败：', res)
        })
      },
      getBalanceNum(str) {
        console.log(str)
        if (str) {
          let n = str.split(' ')
          return parseFloat(n[0])
        } else {
          return 0
        }
      },
      resetInput() {
        this.receiver = ''
        this.transferAmount = ''
        this.remark = ''
      },
      doTransfer() {
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
        //校验收款账号不为空
        if (!this.receiver) {
          this.$vux.toast.show({
            text: this.$t('Please Enter Account'),
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
        //转账金额不能大于余额
        let b = parseFloat(this.balance)
        let a = parseFloat(this.transferAmount)
        if(b < a){
          this.$vux.toast.show({
            text: this.$t('The Transfer amount shall not be greater than the balance'),
            type: 'text',
            width: '16rem',
            position: 'middle'
          })
          return
        }
        //校验备注不为空
        // if(!this.remark){
        //   this.$vux.toast.show({
        //     text:this.$t('Please Enter Remark'),
        //     type:'text',
        //     width:'16rem',
        //     position:'middle'
        //   })
        //   return
        // }

        //转账操作
        this.$vux.loading.show({
          text: '转账中'
        })
        let code = this.code
        let from = this.account
        let to = this.receiver
        let sym = this.selected
        if(sym == '₵EOS'){
          sym = 'EOS'
        }
        // let to = 'user'
        let quant = parseFloat(this.transferAmount).toFixed(4) * 10000
        // console.log(code, from, to, quant)
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
              title: this.$t('Transfer Fail'),
              content: res.data.msg,
              type: 'success',
              width: '16rem',
              position: 'middle',
              onConfirm: this.getTokenBalance(code)
            })
            this.$vux.loading.hide()
            return
          }
          this.getTokenBalance(code)
          this.$vux.toast.show({
            text: this.$t('Transfer Success'),
            type: 'success',
            width: '16rem',
            position: 'middle',
            onHide: this.resetInput()
          })
          this.$vux.loading.hide()
        }).catch(res => {
          console.log("转账失败，失败原因：" + res)
        })
      }
    }
  }
</script>
