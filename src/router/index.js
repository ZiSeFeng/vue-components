import Vue from 'vue';
import Router from 'vue-router';

// const Home = () => import('@/views/Home');
const About = () => import('@/views/About');
const Login = () => import('@/views/login/index');
const Home = () => import('@/views/home/index');
const Service = () => import('@/views/service/index');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    }
  ]
});
