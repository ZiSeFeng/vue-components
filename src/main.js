import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'lib-flexible';
import './icons'; // icon
import '@/styles/index.scss';

import vant from 'vant';
import 'vant/lib/index.css';
Vue.use(vant);

Vue.config.productionTip = false;

import VueMui from '../packages/index';
Vue.use(VueMui);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
