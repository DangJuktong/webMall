<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :class="{'header-transition': isHeaderTransition}" ref="header"/>
    </header>
    <me-scroll :data="recommends"
               pullDown
               pullUp
               @pull-down="pullToRefresh"
               @pull-up="pullToLoadMore"
               @scroll-end="scrollEnd"
               @scroll="scroll"
               @pul-down-transition-end="pullDownTransitionEnd"
               ref="scroll">
      <home-slider ref="slider"/>
      <home-nav/>
      <home-recommend @loaded="getRecommends" ref="recommend"/>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import MeBacktop from 'base/backtop';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'Home',
    components: {
      MeBacktop,
      HomeRecommend,
      HomeNav,
      MeScroll,
      HomeHeader,
      HomeSlider
    },
    data() {
      return {
        recommends: [],
        // 返回顶部组件可见标志
        isBacktopVisible: false,
        // 顶部导航栏是否变颜色
        isHeaderTransition: false
      };
    },
    methods: {
      updateScroll() {
      },
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      // 下拉刷新
      pullToRefresh(end) {
        this.$refs.slider.update().then(end);
        // setTimeout(() => {
        //   console.log('下拉刷新');
        //   end();
        // }, 1000);
      },
      // 上拉加载更多
      pullToLoadMore(end) {
        this.$refs.recommend.update().then(end).catch(err => {
          // 没有更多数据的情况
          if (err) {
            console.log(err);
            // 禁止继续加载更多数据
            // 替换上拉时的loading，改为没有更多数据了
          }
          end();
        });
        // setTimeout(() => {
        //   console.log('上拉');
        //   end();
        // }, 1000);
      },
      // 滚动条滑动
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },
      // 滚动条滑动惯性结束
      scrollEnd(translate, scroll, pulling) {
        // 先判断是否在加载，避免加载中显示导航栏
        if (!pulling) {
          this.changeHeaderStatus(translate);
        }
        this.isBacktopVisible = translate < 0 && -translate > scroll.height;
      },
      // 下拉刷新恢复后显示导航栏
      pullDownTransitionEnd() {
        this.$refs.header.show();
      },
      // 回到顶部
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      // 改变顶部导航栏可见状态和样式状态标志
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }
        this.$refs.header.show();
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
