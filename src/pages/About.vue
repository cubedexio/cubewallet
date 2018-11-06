<template>
  <div id="about">
    <view-box>
      <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('About Us') }}</x-header>
      <flexbox class="about-flex" orient="vertical">
        <flexbox-item :span="2/5" class="flex-item">
          <br>
          <p class="text-center">
            <img class="logo" src="@/assets/images/cbt_logo.png" alt="">
          </p>
          <p class="text-center"><b>Cube Wallet</b></p>
          <p class="text-center version">V0.0.1</p>
        </flexbox-item>
        <flexbox-item :span="3/5">
          <group>
            <cell>
              <span slot="title">Website</span>
              <span slot><a>www.cubecart.io</a></span>
            </cell>
            <cell>
              <span slot="title">Email</span>
              <span slot><a href="mailto:service@cubedex.io">service@cubedex.io</a></span>
            </cell>
            <cell value="@cubedex">
              <span slot="title">Twitter</span>
            </cell>
            <cell value="@cubedex">
              <span slot="title">Facebook</span>
            </cell>
            <cell value="@cubedexAnnouncement">
              <span slot="title">Telegram</span>
            </cell>
          </group>
        </flexbox-item>
      </flexbox>
    </view-box>
  </div>
</template>
<i18n>
  About Us:
  zh-CN: 关于我们
</i18n>
<script>
  import {
    ViewBox,
    XHeader,
    Flexbox,
    FlexboxItem,
    Group,
    Cell
  }
    from 'vux'

  export default {
    components: {
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      Group,
      Cell
    },
    mounted(){
      this.$common.fixStatusBarByHeader('c-header')
    }
  }
</script>
