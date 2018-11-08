<template>
  <div id="deposit">
    <view-box>
      <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Deposit') }}</x-header>
      <div class="content">
        <br>
        <h3 class="text-center">{{$t('Exchange ₵EOS With Your EOS')}}</h3>
        <br>
        <flexbox>
          <flexbox-item :span="8">
            {{$t('Usable Balance')}}
          </flexbox-item>
          <flexbox-item class="text-right" :span="4">
            {{balance}}
          </flexbox-item>
        </flexbox>
        <x-input :placeholder="$t('Please Enter Deposit Amount')" v-model="transferAmount" class="input-black"
                 name="transferAmount"></x-input>
        <br>
        <x-button type="primary" @click.native="confirm">{{$t('Confirm')}}</x-button>
      </div>
      <!--<div class="content">-->
        <!--<br>-->
        <!--<flexbox :gutter="0" class="">-->
          <!--<flexbox-item :span="8">-->
            <!--<span>{{$t('Deposit Eos')}}</span>-->
          <!--</flexbox-item>-->
          <!--<flexbox-item :span="4">-->
            <!--<span class="eos-icon" slot>-->
              <!--<img src="@/assets/images/Eos_logo.png" alt="">-->
            <!--</span>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
        <!--<div class="account-box">-->
          <!--<br>-->
          <!--<p class="text-center">-->
            <!--<qrcode class="qrcode" :value="account"></qrcode>-->
          <!--</p>-->
          <!--<br>-->
          <!--<flexbox :gutter="0" class="account">-->
            <!--<flexbox-item :span="7">-->
              <!--<span>{{$t('Deposit Account')}}</span>-->
              <!--<b>{{account}}</b>-->
              <!--<x-button type="primary" @click.native="doCody(account)">{{$t('Copy')}}</x-button>-->
            <!--</flexbox-item>-->
            <!--<flexbox-item :span="1"></flexbox-item>-->
            <!--<flexbox-item :span="4">-->
              <!--<span>memo</span>-->
              <!--<b>{{memo}}</b>-->
              <!--<x-button type="primary" @click.native="doCody(memo)">{{$t('Copy')}}</x-button>-->
            <!--</flexbox-item>-->
          <!--</flexbox>-->
        <!--</div>-->
      <!--</div>-->
    </view-box>
  </div>
</template>
<i18n>
Copy:
  zh-CN: 复制
Deposit Eos:
  zh-CN: 充值EOS
Deposit Account:
  zh-CN: 充值地址
Copy Success:
  zh-CN: 复制成功
Copy Fail:
  zh-CN: 复制失败
Exchange ₵EOS With Your EOS:
  zh-CN: 用你的EOS兑换等值的₵EOS
Usable Balance:
  zh-CN: 可用余额
Please Enter Deposit Amount:
  zh-CN: 请输入充值数量
Are you sure to exchange?:
  zh-CN: 你确定要充值吗？
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
    XInput
  }
  from 'vux'
  import CubeInput from '@/components/CubeInput'

  export default {
    name:'deposit',
    components:{
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      Qrcode,
      XButton,
      XInput
    },
    data(){
      return{
        account:'abc',
        memo:'321321',
        balance:0,
        transferAmount:''
      }
    },
    mounted(){
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')
    },
    methods:{
      // doCody(text){
      //   this.$copyText(text).then(success=>{
      //     this.$vux.toast.show({
      //       text:this.$t('Copy Success'),
      //       type:'text',
      //       width:'16rem',
      //       position:'middle'
      //     })
      //     console.log(success)
      //   },fail=>{
      //     this.$vux.toast.show({
      //       text:this.$t('Copy Fail'),
      //       type:'text',
      //       width:'16rem',
      //       position:'middle'
      //     })
      //     console.log(fail)
      //   })
      // }
      confirm(){
        let that = this
        this.$vux.confirm.show({
          title:this.$t('Deposit'),
          content:this.$t('Are you sure to exchange?'),
          onCancel(){},
          onConfirm(){
            that.doDeposit()
          }
        })
      },
      doDeposit(){
        //充值操作
      }
    }
  }
</script>
