<template>
  
    <div id="createwalletdone-app">
    <x-header>支付</x-header>
    <flexbox  orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item">



            <group>
                创建帐号完成，请务必保存好您的私钥

                <input type='text' v-model='$route.query.prvkey' />

                
            </group>
            <group>
                
                
            </group>
            
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">      

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

<style scoped>

#createwallet-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg")  no-repeat ;
    background-size: cover;
}

.flex-item {
    display: flex;
    width: 75%;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;

    text-align: center;
    background-clip: padding-box;
}


label#hint-label {
    color: #fff;
    font-size: 1.2em;
}



</style>
