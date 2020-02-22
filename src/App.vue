<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <!-- 防止页面跳转时重复渲染 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="g-footer-container">
      <c-tabbar/>
    </div>
  </div>
</template>

<script>
  import CTabbar from 'components/tabbar';
  export default {
    name: 'App',
    components: {
      CTabbar
    }
  };
</script>
