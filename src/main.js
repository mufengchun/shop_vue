import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
import './assets/javascript';
import './assets/css/index.css';

import Axios from './apis/axios';
window.$axios = Axios;
// Axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page=0');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
