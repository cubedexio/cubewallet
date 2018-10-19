<template>
  
  <div>
    <x-header >{{ $t('Deposit') }}</x-header>


    <br/>

    <divider></divider>

        <button-tab>
            <button-tab-item selected>{{ $t('Buy') }}</button-tab-item>
            <button-tab-item >{{ $t('Sell') }}</button-tab-item>            
        </button-tab>              
      <br/>


      <group title="MSSC">
          <x-input type='text' v-model='amount'></x-input>
      </group>


      <group title="EOS">
          <x-input disabled type='text'  v-model="amount * 0.5" />
      </group>      


        <div class="rate-hint">
            当前兑换比率：1 MMSC = {{ exchangeRate }} EOS
        </div>

        <br/>

        <x-button type='primary' >{{ $t('Confirm Tansaction') }}</x-button>

  </div>
</template>

<i18n>

Deposit:
  zh-CN: 充值
Buy:
  zh-CN: 买入
Sell:
  zh-CN: 卖出
Confirm Tansaction:
    zh-CN: 确认兑换
</i18n>

<script>
import { Group, Cell } from 'vux'
import { Tabbar, TabbarItem , XHeader, ButtonTab, ButtonTabItem, Divider, XInput, XNumber, XButton } from 'vux'


export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem,
    XHeader,
    ButtonTab, 
    ButtonTabItem,
    Divider,
    XInput,
    XNumber,
    XButton
  },
  data () {
    return {
      exchangeRate: 0.5,
      amount: 0
    }
  },
  computed: {
      amountOut() {
          return this.amount * this.exchangeRate
      }
  }
}
</script>

<style scoped>
.rate-hint {
    text-align: center;
}
</style>
