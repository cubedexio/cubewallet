<template>
  <div id="profile">
    <view-box>
      <x-header class="header-content head-bg-md" :left-options="{showBack: false}">
        {{$t('Setting')}}
      </x-header>
      <card class="profile-card">
        <div slot="content">
          <div class="profile-pic">
            <img :src="profilePic" alt="">
          </div>
          <p class="account text-center">{{account}}</p>
        </div>
      </card>
      <card class="profile-card">
        <div slot="content">
          <cell class="setting-cell" :border-intent="false" :title="$t('Change Password')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Export Private Key')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Switch Account')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Language')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Switch BP')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Security Test')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('About Us')" is-link></cell>
          <cell class="setting-cell" :border-intent="false" :title="$t('Contact Us')" is-link></cell>
          <x-button class="terms">{{$t('Terms')}}</x-button>
        </div>
      </card>

    </view-box>
  </div>
</template>

<i18n>

Setting:
  zh-CN: 设置
Change Password:
  zh-CN: 修改密码
Export Private Key:
  zh-CN: 导出私钥
Switch Account:
  zh-CN: 切换账户
Language:
  zh-CN: 多语言
Switch BP:
  zh-CN: 节点设置
Security Test:
  zh-CN: 安全检测
About Us:
  zh-CN: 关于我们
Contact Us:
  zh-CN: 联系客服
Terms:
  zh-CN: 服务条款
</i18n>
<script>
  import {
    ViewBox,
    XHeader,
    Card,
    Group,
    Cell,
    XButton
  } from 'vux'

  export default {
    name:'profile',
    components:{
      ViewBox,
      XHeader,
      Card,
      Group,
      Cell,
      XButton
    },
    data(){
      return{
        account:'abc123',
        profilePic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540209275264&di=8dcc9aaaff4b30b1a3dba1097a6baae3&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-15%2F004214903.jpg',
      }
    },
    methods:{

    }
  }
</script>
