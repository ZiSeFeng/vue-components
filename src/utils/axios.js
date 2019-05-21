import axios from 'axios';
import { getToken } from '../utils/token';
import qs from 'qs';
// import store from '../store';
// import router from '../router';

// 服务器code信息
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// };

// 请求列表
const requestList = [];
// 取消列表
const CancelToken = axios.CancelToken;
let sources = {};
// let cancel, promiseArr = {};

axios.create({
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8'
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'multipart/form-data'
  },
  //解决跨域
  withCredentials: true
});

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

axios.interceptors.request.use(
  config => {
    // const request = JSON.stringify(config.url) + JSON.stringify(config.data);
    const request =
      config.method === 'post'
        ? JSON.stringify(config.url) + qs.stringify({ ...config.data })
        : JSON.stringify(config.url) + qs.stringify({ ...config.params });

    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel;
    });

    // if (requestList.includes(request)) {
    //   sources[request]('取消重复请求');
    // } else {
    //   requestList.push(request);
    //   store.dispatch('login/login', { isLogin: true });
    // }
    // if (promiseArr[config.url]) {
    //   promiseArr[config.url]('canceled the operation by -^ 波比小金刚 ^-');
    //   promiseArr[config.url] = cancel
    // } else {
    //   promiseArr[config.url] = cancel
    // }

    // const token = store.getters.userInfo.token
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const request =
      response.config.method === 'post'
        ? JSON.stringify(response.config.url) +
          qs.stringify({ ...response.config.data })
        : JSON.stringify(response.config.url) +
          qs.stringify({ ...response.config.params });
    requestList.splice(requestList.findIndex(item => item === request), 1);
    // if (requestList.length === 0) {
    //   store.dispatch('login/login', { isLogin: false });
    // }
    // if (response.data.code === 900401) {
    //   window.ELEMENT.Message.error('认证失效，请重新登录！', 1000);
    //   router.push('/login');
    // }
    return response;
  },
  error => {
    // if (axios.isCancel(error)) {
    //   requestList.length = 0;
    //   store.dispatch('login/login', { isLogin: false });
    //   throw new axios.Cancel('cancel request');
    // } else {
    //   window.ELEMENT.Message.error('网络请求失败', 1000);
    // }
    // if (err && err.response) {
    //   message.error(codeMessage[err.response.status] || `连接服务器失败${err.response.status}`);

    // TODO 统一处理各种异常，比如 401 需要跳转到登录页面。
    // switch(err.response.status){
    //   case 400:
    //     break;
    //   case 401:
    //     break;
    //   default:

    //   // }
    // }
    return Promise.reject(error);
  }
);

export default axios;
