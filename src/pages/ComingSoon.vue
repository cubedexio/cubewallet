<template>
  <div id="coming-soon">
    <view-box>
      <flexbox>
        <flexbox-item>
          <img src="@/assets/images/coming-soon.png" alt="">
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
    name:'coming-soon',
    components:{
      ViewBox,
      Flexbox,
      FlexboxItem
    }
  }
</script>
