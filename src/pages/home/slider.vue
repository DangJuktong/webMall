<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"/>
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <!-- v-if 保证异步数据获取完成后再开始渲染slider，避免出现幻灯片不能无缝滑动和跳变等问题 -->
      <swiper-slide
      v-for="(item, index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import MeSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  import {getHomeSlider} from 'api/home';
  import MeLoading from 'base/loading';

  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      swiperSlide,
      MeLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    // 通常在created中获取远程数据
    created() {
      this.getSliders();
    },
    methods: {
      // API
      update() {
        return this.getSliders();
      },

      getSliders() {
        return getHomeSlider().then(data => {
          this.sliders = data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slider-wrapper{
    height: 183px;
  }
  .slider-link{display: block}
  .slider-link,.slider-img{
    width: 100%;
    height: 100%;
  }
</style>
