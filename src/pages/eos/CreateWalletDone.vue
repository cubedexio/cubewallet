<template>

    <div id="createwalletdone-app">
    <x-header :left-options="{backText:''}" class="header-content head-bg-md">支付</x-header>
    <flexbox class="done-flex"  orient="vertical" justify="space-around">
        <flexbox-item :span="2/6" class="flex-item">
          <br>
          <br>
          <p class="done-tips text-center">创建帐号完成，请务必保存好您的私钥</p>
          <div class="prvkey">

            <input type='text' v-model='$route.query.prvkey' />
          </div>
          <span class="warn">
            请确保已将私钥认真抄写再纸上，妥善保管好。电子方式只建议保存在密码保管箱，切勿截图或保存在网络工具里，非常危险
          </span>
        </flexbox-item>
        <flexbox-item :span="4/6" class="flex-item">

                <x-button type='default' @click.native="done">确认</x-button>

        </flexbox-item>
    </flexbox>



    </div>
</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册

</i18n>

<script>
import { Group, XHeader, XButton, XInput, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem } from 'vux'
import moment from 'moment'


import { eosEndpoint, alipayAppId } from '@/config'
import { resolve } from 'path';
import { rejects } from 'assert';

export default {

  components: {
    Group,
    XInput,
    XHeader,
    XButton,
    Cell,
    Tabbar,
    TabbarItem,
    Flexbox,
    FlexboxItem
  },
  data () {
    return{
      eosname: ''
    }
  },
  mounted(){
      console.log($api)
      console.log('moment')
      console.log(moment)
      console.log('moment')
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')
  },
    methods: {
        moment: function () {
            return moment();
        },
        done() {
            this.$router.replace('/home')
        }
    }
}
</script>

<style lang="less" scoped>

#createwalletdone-app {
    width: 100%;
    height: 100%;
    background: white ;
}

/*.flex-item {*/
    /*display: flex;*/
    /*width: 75%;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*flex: 1;*/
    /*align-items: center;*/

    /*text-align: center;*/
    /*background-clip: padding-box;*/
/*}*/
.done-flex{
  height: 100%;
}
.done-tips{
  font-size: .875rem;
}
.warn{
  display: block;
  margin:1rem 3rem;
  text-align: left;
  color: red;
  font-size: .75rem;
}
.prvkey{
  display: block;
  width: 12rem;
  margin: 1rem auto;
  padding: 3rem;
  background: #f3f5f7;
}
label#hint-label {
    color: #fff;
    font-size: 1.2em;
}



</style>
