import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) window.document.title = to.meta.title;
  next();
});
export default router;
