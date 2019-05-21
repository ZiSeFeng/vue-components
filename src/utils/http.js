// import Vue from 'vue';
import axios from './axios';
// import 'mint-ui/lib/style.css';
// import { Toast } from 'vant';
// Vue.component(Toast);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装fetch方法
 * @param url
 * @param data
 * @returns {Promise}
 */ export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装upload请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function upload(url, data, cb) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: processEvent => {
          cb(processEvent);
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 模拟数据
 * 封装mock请求
 * @param data
 * @returns {Promise}
 */
export function mock(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
}

/**
 * 测试接口
 * 名称：exam
 * 参数：paramObj/null
 * 方式：fetch/post/patch/put
 */

/**
 * 下面是获取数据的接口
 */

export const server = {
  exam: function(paramObj) {
    return post('/api.php?ac=v2_djList', paramObj);
  }
};
