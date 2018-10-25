<template>
  <transition name="slide">
  <div id="transfer">
    <view-box>
      <x-header id="header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Transfer') }}</x-header>
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
        <x-input :placeholder="$t('Please Enter Account')" v-model="receiver" class="input-black" name="receiver"></x-input>
      </div>
      <div class="transfer-amount input-box">
        <div class="property">
          <p class="text-right">{{$t('Property')}}</p>
          <p class="text-right">{{propertyNum}}</p>
        </div>
        <label>{{$t('Transfer Amount')}}</label>
        <x-input :placeholder="$t('Please Enter Amount')" v-model="transferAmount" class="input-black" name="transferAmount"></x-input>
      </div>
      <div class="remark input-box">
        <label>{{$t('Remark')}}</label>
        <x-input :placeholder="$t('Please Enter Remark')" v-model="remark" class="input-black" name="remark"></x-input>
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
Property:
  zh-CN: 余额
Remark:
  zh-CN: 备注
Please Enter Account:
  zh-CN: 请输入账户名称
Please Enter Amount:
  zh-CN: 请输入转账数量
Please Enter Remark:
  zh-CN: 请输入备注
Confirm Transfer:
  zh-CN: 确认转账
Transfer Success:
  zh-CN: 转账成功
</i18n>
<script>
  const menuList = [
    {
      token_name: 'Eos',
      token_img: 'http://www.bizhuren.com/d/file/201806/43afce7dfb6ab33f14c52d963631b15c.png',
      amount: 300.2565
    },
    {
      token_name: 'Cbt',
      token_img: 'http://www.cubecart.io/img/cubecart_logo.2392cac3.png',
      amount:12003.004
    }
  ];
  import {
    ViewBox,
    XHeader,
    Group,
    Popup,
    XInput,
    XButton,
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
      numberComma
    },
    data() {
      return {
        selected: 'Eos',
        selectedImg: 'http://www.bizhuren.com/d/file/201806/43afce7dfb6ab33f14c52d963631b15c.png',
        property: 3000.45678,
        menus: menuList,
        showMenu: false,
        receiver:'',
        transferAmount:'',
        remark:''
      }
    },
    computed: {
      propertyNum() {
        let num = this.property.toFixed(4);
        return numberComma(num);
      }
    },
    methods: {
      switchMenu(item) {
        let token = item.token_name;
        let img = item.token_img;
        this.selected = token;
        this.selectedImg = img;
        this.showMenu = false;
      },
      resetInput(){
        this.receiver = '';
        this.transferAmount = '';
        this.remark = '';
      },
      doTransfer(){
        //校验收款账号不为空
        if(!this.receiver){
          this.$vux.toast.show({
            text:this.$t('Please Enter Account'),
            type:'text',
            width:'16rem',
            position:'middle'
          })
          return
        }
        //校验金额不为空
        if(!this.transferAmount){
          this.$vux.toast.show({
            text:this.$t('Please Enter Amount'),
            type:'text',
            width:'16rem',
            position:'middle'
          })
          return
        }
        //校验金额为数字
        if(!/^\d+(\.\d+)?$/.test(this.transferAmount)){
          this.$vux.toast.show({
            text:this.$t('Please Enter Amount'),
            type:'text',
            width:'16rem',
            position:'middle'
          })
          return
        }
        //校验备注不为空
        if(!this.remark){
          this.$vux.toast.show({
            text:this.$t('Please Enter Remark'),
            type:'text',
            width:'16rem',
            position:'middle'
          })
          return
        }

        //转账操作

        this.$vux.toast.show({
          text:this.$t('Transfer Success'),
          type:'success',
          width:'16rem',
          position:'middle',
          onHide:this.resetInput()
        })
      }
    }
  }
</script>
