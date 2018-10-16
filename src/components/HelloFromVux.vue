<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>

    <tabbar>

        <tabbar-item icon-class="info-circle">
           <x-icon type="ios-home" size="24" slot="icon"></x-icon>
          <label slot="label">钱包</label>
        </tabbar-item>
        <tabbar-item>
          <x-icon type="ios-person" size="28" class="icon-red" slot="icon"></x-icon>
          
          <label slot="label">我</label>
        </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { Tabbar, TabbarItem } from 'vux'


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
