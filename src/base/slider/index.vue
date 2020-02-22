<template>
    <swiper :options="swiperOption" :key="keyId">
      <slot></slot>
      <!-- 分页器  swiper自身带的插槽-->
      <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  import {swiper} from 'vue-awesome-swiper';

  export default {
    name: 'MeSlider',
    components: {
      swiper
    },
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      },
      data: {
        // 数组不是基本类型，要用函数的方式返回
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        keyId: Math.random()
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.swiperOption = {
          watchOverflow: true, // 只有1个slide时swiper会失效
          direction: this.direction,
          autoplay: this.interval ? {
            delay: this.interval,
            disableOnInteraction: false // 交互是否停止轮播
          } : false,
          slidesPerView: 1, // 容器同时显示的slides数量
          loop: this.data.length === 1 ? false : this.loop, // 一张图片时关闭无缝滑动
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        };
      }
    },
    watch: {
      data(newData) {
        // 边界条件判断
        if (newData.length === 0) {
          return;
        }
        this.swiperOption.loop = this.data.length === 1 ? false : this.loop;
        this.keyId = Math.random();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
