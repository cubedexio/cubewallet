<template>
  
  <div>
    <x-header :left-options="{showBack: false}">我的钱包</x-header>
      <button-tab>
        <button-tab-item>{{ $t('Transfer') }}</button-tab-item>
        <button-tab-item selected>{{ $t('Deposit') }}</button-tab-item>
        <button-tab-item>{{ $t('Withdraw') }}</button-tab-item>
      </button-tab>

      <br>
      <divider>{{ $t('Use v-model to set selected item') }}</divider>
      <br>

    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
  
    
  </div>
</template>

<i18n>
Transfer:
  zh-CN: 转账
Deposit:
  zh-CN: 充值
Withdraw:
  zh-CN: 提现
</i18n>

<script>
import { Group, Cell } from 'vux'
import { Tabbar, TabbarItem , XHeader, ButtonTab, ButtonTabItem} from 'vux'


export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem,
    XHeader,
    ButtonTab, 
    ButtonTabItem
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
