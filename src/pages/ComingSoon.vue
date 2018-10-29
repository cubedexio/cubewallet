<template>
  <div id="coming-soon">
    <view-box>
      <flexbox class="">
        <flexbox-item>
          <img src="../assets/images/coming-soon.png" alt="">
        </flexbox-item>
      </flexbox>
    </view-box>
  </div>
</template>
<script>
  import {
    ViewBox,
    Flexbox,
    FlexboxItem
  } from 'vux'

  export default {
    name:'comingSoon',
    components:{
      ViewBox,
      Flexbox,
      FlexboxItem
    }
  }
</script>
