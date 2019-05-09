import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/views/home/index');
const Login = () => import('@/views/login/index');

const ProblemDetails = () => import('@/views/problemDetails');
const AccountProblem = () => import('@/views/accountProblem');
const GameList = () => import('@/views/gameList');
const GameProList = () => import('@/views/gameProList');

const User = () => import('@/views/user/user');
const Record = () => import('@/views/user/record');
const Detail = () => import('@/views/user/detail');
const Service = () => import('@/views/service/index');
const IndexList = () => import('@/views/indexList/index');

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/problemDetails',
      name: 'problemDetails',
      component: ProblemDetails
    },
    {
      path: '/accountProblem',
      name: 'accountProblem',
      component: AccountProblem
    },
    {
      path: '/gameList',
      name: 'gameList',
      component: GameList
    },
    {
      path: '/gameProList',
      name: 'gameProList',
      component: GameProList
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
    {
      path: '/user',
      name: '个人中心',
      component: User
    },
    {
      path: '/user/record',
      name: '服务记录',
      component: Record
    },
    {
      path: '/user/detail/:id',
      name: '服务详情',
      component: Detail
    },
    {
      path: '/indexlist',
      name: 'indexList',
      component: IndexList
    }
  ]
});
