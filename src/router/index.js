import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/article'
    // name: '',
    // component: () => import(/* webpackChunkName: "about" */ '../views/article/index.vue')
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import(/* webpackChunkName: "about" */ '../views/comment/index.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/article/index.vue')
  }
];

const router = new VueRouter({
  // mode: 'hash',
  // base: '',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) window.document.title = to.meta.title;
  next();
});
export default router;
