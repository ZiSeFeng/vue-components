import axios from 'axios';
import { getToken } from '../utils/token';
// import store from '../store';
// import router from '../router';

// 请求列表
const requestList = [];
// 取消列表
const CancelToken = axios.CancelToken;
let sources = {};

axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

axios.interceptors.request.use(
  config => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data);

    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel;
    });

    if (requestList.includes(request)) {
      sources[request]('取消重复请求');
    }
    // else {
    //     requestList.push(request)
    //     store.dispatch('changeGlobalState', { loading: true })
    // }

    // const token = store.getters.userInfo.token
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    const request =
      JSON.stringify(response.config.url) +
      JSON.stringify(response.config.data);
    requestList.splice(requestList.findIndex(item => item === request), 1);
    // if (requestList.length === 0) {
    //     store.dispatch('changeGlobalState', { loading: false })
    // }
    // if (response.data.code === 900401) {
    //     window.ELEMENT.Message.error('认证失效，请重新登录！', 1000)
    //     router.push('/login')
    // }
    return response;
  },
  function(error) {
    // if (axios.isCancel(error)) {
    //     requestList.length = 0
    //     store.dispatch('changeGlobalState', { loading: false })
    //     throw new axios.Cancel('cancel request')
    // } else {
    //     window.ELEMENT.Message.error('网络请求失败', 1000)
    // }
    return Promise.reject(error);
  }
);

export default axios;
