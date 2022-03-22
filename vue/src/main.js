import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/global.scss';
import '@/icons'; // icon
import Alert from '@/plugin/alert.js';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(Alert);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
