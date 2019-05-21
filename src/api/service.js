import { upload, get } from '../utils/http.js';

export const getUploadData = params => {
  return upload('/service/upload', params, function(res) {
    // console.log(res, '进度条1');
  });
};

export const uploadImg = params => {
  return upload('/service/upload/img', params, function(res) {
    // console.log(res, '进度条2');
  });
};

export const getListData = params => {
  return get('/server/change/list', params, function(res) {
    // console.log(res, 'server list');
  });
};
