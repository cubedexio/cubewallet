<template>

    <flexbox id="eosindex-app" orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item" >

                <img id="logo-img" src="@/assets/images/cbt_logo.png"/>

        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">
                <label id="hint-label">
                    创建<br/>/<br/>导入EOS帐号
                </label>
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">

          <x-button type='primary' link="/createwallet">创建EOS帐号</x-button>
          <br>
          <x-button link="/importwallet">导入EOS帐号</x-button>

        </flexbox-item>
    </flexbox>




</template>
<i18n>
Login:
    zh-CN: 登录
Register:
    zh-CN: 注册

</i18n>

<script>
import { Group, XButton, XInput, Cell, Tabbar, TabbarItem, Flexbox, FlexboxItem } from 'vux'



export default {

  components: {
    Group,
    XInput,
    XButton,
    Cell,
    Tabbar,
    TabbarItem,
    Flexbox,
    FlexboxItem
  },
  data () {
    return{
      show:true
    }
  },
  mounted(){
    setTimeout(()=>{
      this.show = false;
    },2000)
  }
}
</script>

<style scoped>

#eosindex-app {
    width: 100%;
    height: 100%;
<<<<<<< HEAD
    background: url("../../assets/images/sign_in_up.jpg")  no-repeat ;
    background-size: cover;
=======
    background: url("../../assets/images/sign_in_up.jpg") center 0 no-repeat ;
    background-size: auto 100%;
>>>>>>> 29d3b11... Bug fix/create wallet UI
}

.flex-item {
    display: flex;
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
