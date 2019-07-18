import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Index = () => import('@/views/index');
const Button = () => import('@/views/button/index');
const Dialog = () => import('@/views/dialog/index');
const MessageBox = () => import('@/views/messageBox/index');
const Datepicker = () => import('@/views/datepicker/index');
const Swiper = () => import('@/views/swiper/index');
const Upload = () => import('@/views/upload/index');
const Tip = () => import('@/views/tip/index');
const Checkbox = () => import('@/views/checkbox/index');
const InputNumber = () => import('@/views/input-number/index');
const Tabs = () => import('@/views/tabs/index');
const Dropdown = () => import('@/views/dropdown/index');
const Table = () => import('@/views/table/index');

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/button',
      name: '按钮',
      component: Button
    },
    {
      path: '/dialog',
      name: '弹窗',
      component: Dialog
    },
    {
      path: '/messageBox',
      name: '提示框',
      component: MessageBox
    },
    {
      path: '/datepicker',
      name: '日期插件',
      component: Datepicker
    },
    {
      path: '/swiper',
      name: '轮播图',
      component: Swiper
    },
    {
      path: '/upload',
      name: '上传组件',
      component: Upload
    },
    {
      path: '/tip',
      name: '提示tip',
      component: Tip
    },
    {
      path: '/checkbox',
      name: '多选框Checkbox',
      component: Checkbox
    },
    {
      path: '/inputnumber',
      name: '计数器',
      component: InputNumber
    },
    {
      path: '/tabs',
      name: '标签页',
      component: Tabs
    },
    {
      path: '/dropdown',
      name: '下拉菜单',
      component: Dropdown
    },
    {
      path: '/table',
      name: '可排序的表格',
      component: Table
    }
  ]
});
