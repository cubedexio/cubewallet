<template>
  
    <flexbox id="index-app" orient="vertical" justify="space-around">
        <flexbox-item :span="1/4" class="flex-item" >
            
                <img id="logo-img" src="@/assets/images/cbt_logo.png"/>
            
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">
                <label id="hint-label">
                    创建<br/>/<br/>登陆帐号
                </label>
        </flexbox-item>
        <flexbox-item :span="1/4" class="flex-item">      

                <x-button type='primary' link="/register">创建帐号</x-button>
                <x-button link="/login">登陆帐号</x-button>

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

#index-app {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/sign_in_up.jpg")  no-repeat ;
    background-size: 100%;
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
