<template>
  <div class="mine-navbar">
    <!-- $slots内存放的是被插入插槽的插槽名称 -->
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="mine-navbar-title" v-if="title">
      <!-- flex居中和溢出显示省略号在同一个元素上会产生冲突 可以将本文内容放到一个span标签中避免 -->
      <span class="mine-navbar-text" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'MeNavbar',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.$slots);
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .mine-navbar{
    @include flex-between();
    position: relative;
    height: 50px;
    background-color: #fff;
    &-left{
      margin-left: 10px;
      ~.mine-navbar-right{
        position: static;
      }
    }
    &-center{
      /* flex为1表示剩下所有的空间都给center */
      flex: 1;
      margin: 0 10px;
      ~.mine-navbar-right{
        position: static;
      }
    }
    &-right{
      position: absolute;
      right: 0;
      @include flex-center();
      margin-right: 10px;
    }
    &-title{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();
      text-align: center;
    }
    &-text{
      width: 100%;
      line-height: 1.5;
      font-size: 18px;
      @include ellipsis();
    }
  }
</style>
