// babel-polyfill转换ES6代码的api
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// fastclick用于解决移动端300ms延迟
import fastclick from 'fastclick';
// 图片懒加载插件
import VueLazyload from 'vue-lazyload';

import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';

fastclick.attach(document.body);

// 懒加载全局使用
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
