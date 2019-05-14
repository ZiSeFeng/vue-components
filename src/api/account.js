import { get } from '../utils/http.js';

export const getListData = params => {
  return get('/account/problem/list', params);
};
