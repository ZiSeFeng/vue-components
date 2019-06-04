import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'lib-flexible';
import './icons'; // icon
import '@/styles/index.scss';
import '@/styles/icons/iconfont.css';

Vue.config.productionTip = false;

import VueMui from '../packages';
Vue.use(VueMui);
// console.log(VueMui, VueMui.muiTip, 'muiTip 12212');
// Vue.use(VueMui.muiTip.directive, { directiveName: 'tip' });

import { get, post, upload } from './utils/http';
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$upload = upload;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
