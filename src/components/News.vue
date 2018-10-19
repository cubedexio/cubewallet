<template>
  <div id="news" class="head-bg-pic">
    <x-header class="header-content " :left-options="{showBack: false}">{{ $t('News') }}</x-header>
    <section class="head-bg-lg">
      <swiper class="swiper" auto loop height="160px" :list="swiperList" :index="demo06_index"></swiper>
    </section>
  </div>
</template>

<i18n>
News:
  zh-CN: 资讯
</i18n>
<script>
  import {
    XHeader,
    Swiper
  } from 'vux'

  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]
  export default {
    name:'news',
    data(){
      return{
        swiperList:baseList
      }
    },
    components:{
      XHeader,
      Swiper
    }
  }
</script>
