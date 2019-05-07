// import Cookies from 'js-cookie';

const state = {
  isLogin: false
};

const mutations = {
  LOGIN: state => {
    state.isLogin = true;
  },
  LOGOUT: state => {
    state.isLogin = false;
  }
};

const actions = {
  login({ commit }, state) {
    commit('LOGIN', state);
  },
  logout({ commit }) {
    commit('LOGOUT');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
