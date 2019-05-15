import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/views/home/index');
const Login = () => import('@/views/login/index');

const ProblemDetails = () => import('@/views/problemDetails/index');
const AccountProblem = () => import('@/views/account/problem');
const GameList = () => import('@/views/game/list');
const GameProblem = () => import('@/views/game/problem');

const User = () => import('@/views/user/user');
const Record = () => import('@/views/user/record');
const Detail = () => import('@/views/user/detail');
const Question = () => import('@/views/user/question');

const Service = () => import('@/views/service/index');
const IndexList = () => import('@/views/indexList/index');
const Success = () => import('@/views/success');

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
      path: '/gameProblem',
      name: 'gameProblem',
      component: GameProblem
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
      path: '/user/question/:id',
      name: '问题内容',
      component: Question
    },
    {
      path: '/indexlist',
      name: 'indexList',
      component: IndexList
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    }
  ]
});
