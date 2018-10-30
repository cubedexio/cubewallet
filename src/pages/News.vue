<template>

  <div v-if="isComingSoon">
    <coming-soon></coming-soon>
  </div>
  <div v-else>
    <div id="news" class="head-bg-pic">
      <view-box>

        <x-header class="header-content " :left-options="{showBack: false}">{{ $t('News') }}</x-header>
        <section class="head-bg-lg">
          <swiper class="swiper"  loop height="180px" dots-position="center" dots-class="dots-class" :list="swiperList" ></swiper>
        </section>
        <div class="tab-content">
          <sticky>
            <tab :line-with="1" custom-bar-width="60px" v-model="i" active-color="#651FFF">
              <tab-item selected @on-item-click="switchTab">{{ $t('New') }}</tab-item>
              <tab-item @on-item-click="switchTab">{{ $t('Hot') }}</tab-item>
              <tab-item @on-item-click="switchTab" >{{ $t('Financing') }}</tab-item>
            </tab>
          </sticky>
          <group class="cate-group">
            <swiper class="cate-swiper" v-model="i" :show-dots="false" height="28rem">
              <swiper-item v-for="(list,index) in newsList" :key="index">
                <cell-box v-for="item in list" :key="item.id" class="news-item">
                  <div class="news-item-left">
                    <img :src="item.cover" alt="" class="news-cover">
                    <p>{{item.rate}}</p>
                  </div>
                  <div class="news-item-right">
                    <p class="news-title">{{item.title}}</p>
                    <p class="news-details">{{item.details}}</p>
                    <p class="news-time text-right">{{item.time}}</p>
                  </div>
                </cell-box>
              </swiper-item>
            </swiper>
          </group>
        </div>
      </view-box>
    </div>
  </div>
</template>

<i18n>
News:
  zh-CN: 资讯
New:
  zh-CN: 最新
Hot:
  zh-CN: 热门
Financing:
  zh-CN: 理财
</i18n>
<script>
  import {
    ViewBox,
    XHeader,
    Sticky,
    Swiper,
    SwiperItem,
    Group,
    CellBox,
    Tab,
    TabItem
  } from 'vux'
  import ComingSoon from '@/pages/ComingSoon'
  // import ComingSoon from "./ComingSoon";

  const newsCate = ['最新','热门','理财'];
  const news = [
    [
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'最新Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'3',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'最新Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'5',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'最新Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'4',
        time:'2018-9-12 12:00:33'
      }
    ],
    [
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'热门Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'3',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'热门Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'5',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'热门Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'4',
        time:'2018-9-12 12:00:33'
      }
    ],
    [
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'理财新闻',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'3',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'理财新闻',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'5',
        time:'2018-9-12 12:00:33'
      },
      {
        cover:'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title:'热门Something happen',
        details:'Something happenSomething happenSomething happenSomething happen',
        rate:'4',
        time:'2018-9-12 12:00:33'
      }
    ]
  ];
  const baseList = [
    {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  },
    {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  },
    {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }
  ]
  export default {
    name:'news',
    data(){
      return{
        swiperList:baseList,
        category:newsCate,
        newsList:news,
        i:0,
        isComingSoon:true
      }
    },
    components:{
      ComingSoon,
      ViewBox,
      XHeader,
      Sticky,
      Swiper,
      SwiperItem,
      Group,
      CellBox,
      Tab,
      TabItem,
      ComingSoon
    },
    methods:{
      switchTab (index){
        this.i=index
      }
    }
  }
</script>
