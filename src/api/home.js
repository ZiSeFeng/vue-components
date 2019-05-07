import { get } from '../utils/http.js';

export const getListData = params => {
  return get('/home/list', params);
};
