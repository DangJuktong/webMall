<template>
  <me-scroll :scrollbar="false">
    <ul class="tab">
      <li class="tab-item" v-for="(item, index) in items" :key="index"
      @click="switchTab(item.id)" :class="{'tab-item-active': item.id === curId}">{{item.name}}</li>
    </ul>
  </me-scroll>
</template>

<script>
  import MeScroll from 'base/scroll';
  import {categoryNames} from './config';

  export default {
    name: 'CategoryTab',
    components: {
      MeScroll
    },
    data() {
      return {
        // 当前选中类别的ID
        curId: ''
      };
    },
    created() {
      this.init();
      this.switchTab(this.items[0].id);
    },
    methods: {
      // 初始化种类列表
      init() {
        this.items = categoryNames;
      },
      switchTab(id) {
        if (this.curId === id) {
          return;
        }
        this.curId = id;
        // 把点击的类别ID传出去
        this.$emit('switch-tab', id);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $tab-item-height: 46px;
  .tab{
    width: 100%;
    &-item{
      height: $tab-item-height;
      background-color: #fff;
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      color: #080808;
      font-size: $font-size-l;
      font-weight: bold;
      text-align: center;
      line-height: $tab-item-height;
      @include ellipsis();
      &:last-child{
        border-bottom: none;
      }
    }
    &-item-active{
      background: none;
      border-right: none;
      color: #f23030;
    }
  }
</style>
