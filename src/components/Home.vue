<template>
  <div>


    <router-view></router-view>
    <tabbar>    
        <tabbar-item icon-class="info-circle" link="/wallet">
           <x-icon type="ios-home" size="24" slot="icon"></x-icon>
          <label slot="label">钱包</label>
        </tabbar-item>
        <tabbar-item link="/user">
          <x-icon type="ios-person" size="28" class="icon-red" slot="icon"></x-icon>          
          <label slot="label">个人</label>
        </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Group, Cell,  Tabbar, TabbarItem  } from 'vux'



export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
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
