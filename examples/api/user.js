import { get } from '../utils/http.js';

export const getUserInfo = params => {
  return get('/user/info', params);
};
