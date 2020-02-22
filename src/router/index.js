import Vue from 'vue';
import Router from 'vue-router';
// import Home from 'pages/home';
// import Category from 'pages/category';
// import Cart from 'pages/cart';
// import Personal from 'pages/personal';
// import Search from 'pages/search';
// import Product from 'pages/product';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/home',
    // 页面懒加载， 只有在访问的时候才引入代码
    component: () => import('pages/home'),
    //  二级路由写法
    children: [
      {
        name: 'home-product',
        // 二级路由的路径不用/开头
        // 二级路由要在父级页面加上router-view  router-view是路由跳转的组件
        path: 'product/:id',
        component: () => import('pages/product')
      }
    ]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search')
  },
  {
    // 访问其他路由自动跳转到首页
    path: '*', // 任意路由
    redirect: '/home'
  }
];

export default new Router({
  routes
});
