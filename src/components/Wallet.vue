<template>
  
  <div>
    <x-header :left-options="{showBack: false}">{{ $t('My Wallet') }}</x-header>

    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>

    <br/>

    <h3>我的资产：</h3>
    <p>8,888,888,888.88</p>
    <br/>

    <divider></divider>
    

        <button-tab>
            <button-tab-item>{{ $t('Transfer') }}</button-tab-item>
            <button-tab-item>{{ $t('Deposit') }}</button-tab-item>
            <button-tab-item>{{ $t('Withdraw') }}</button-tab-item>
        </button-tab>              
      <br/>

      <group title="资产列表" label-width="4.5em" label-margin-right="2em" >
        <cell title="EOS" value="2000.0" is-link link='/transaction'></cell>
        <cell title="EOSDAC" value="0" is-link link='/transaction'></cell>
        <cell title="ADD" value="0" is-link link='/transaction'></cell>
    </group>

LoggedIn: {{ $store.state.loggedIn }}
    
  </div>
</template>

<i18n>
Transfer:
  zh-CN: 转账
Deposit:
  zh-CN: 充值
Withdraw:
  zh-CN: 提现
My Wallet:
    zh-CN: 我的钱包
</i18n>

<script>
import { Group, Cell } from 'vux'
import { Tabbar, TabbarItem , XHeader, ButtonTab, ButtonTabItem, Divider} from 'vux'


export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem,
    XHeader,
    ButtonTab, 
    ButtonTabItem,
    Divider
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
