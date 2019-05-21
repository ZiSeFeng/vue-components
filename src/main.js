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

import VueMui from '../packages';
Vue.use(VueMui);

import { get, post, upload } from './utils/http';
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$upload = upload;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
