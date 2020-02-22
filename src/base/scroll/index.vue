<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"/>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"/>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {PULL_DOWN_HEIGHT,
          PULL_DOWN_TEXT_INIT,
          PULL_DOWN_TEXT_START,
          PULL_DOWN_TEXT_ING,
          PULL_DOWN_TEXT_END,
          PULL_UP_HEIGHT,
          PULL_UP_TEXT_INIT,
          PULL_UP_TEXT_START,
          PULL_UP_TEXT_ING,
          PULL_UP_TEXT_END} from './config';

  export default {
    name: 'MeScroll',
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      data() {
        this.update();
      }
    },
    created() {
      this.init();
    },
    methods: {
      update() {
        // Vue的DOM更新是异步的，数据更新完DOM不一定渲染完毕，关于数据更新操作DOM的代码都要放在nextTick里面才能保证不出错
        this.$nextTick(() => {
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },
      scrollToTop(speed, runCallbacks) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      },

      // 内部调用
      init() {
        this.pulling = false;
        this.swiperOption = {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true, // 滚动自由模式
          setWrapperSize: true, // 设置Wrapper高度
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true // 是否自动隐藏
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd
          }
        };
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
      },
      scroll() {
        const swiper = this.$refs.swiper.swiper;
        this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);
        // 如果正在下拉，就直接返回，避免重复调用
        if (this.pulling) {
          return;
        }
        if (swiper.translate > 0) {
          // 下拉
          if (!this.pullDown) {
            return;
          }
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) {
          // 上拉
          if (!this.pullUp) {
            return;
          }
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      scrollEnd() {
        this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper, this.pulling);
      },
      touchEnd() {
        const swiper = this.$refs.swiper.swiper;
        // 如果正在下拉，就直接返回，避免重复调用
        if (this.pulling) {
          return;
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // 下拉过100
          if (!this.pullDown) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false;// 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);// 回到100的位置
          swiper.params.virtualTranslate = true;// 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          // 触发下拉事件，并传出下拉事件结束后的操作
          this.$emit('pull-down', this.pullDownEnd);
        } else if (swiper.isEnd) {
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
          if (isPullUp) {
            // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false;// 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true;// 定住不给回弹
            this.$refs.pullDownLoading.setText(PULL_UP_TEXT_ING);
            // 触发上拉事件，并传出上拉事件结束后的操作
            this.$emit('pull-up', this.pullUpEnd);
          }
        }
      },
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.pulling = false;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
        // 回弹后恢复顶部导航栏
        setTimeout(() => {
          this.$emit('pul-down-transition-end');
        }, swiper.params.speed);
      },
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 100%;
    width: 100%;
  }
  .swiper-slide {
    height: auto;
  }
  .mine-scroll-pull-down ,.mine-scroll-pull-up{
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down{
    bottom: 100%;
    height: 80px;
  }
  .mine-scroll-pull-up{
    top: 100%;
    height: 30px;
  }
</style>
