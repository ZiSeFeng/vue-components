// import Cookies from 'js-cookie';

const state = {
  isLoading: false
};

const mutations = {
  SHOW_LOADING: state => {
    state.isLoading = true;
  },
  HIDE_LOADING: state => {
    state.isLoading = false;
  }
};

const actions = {
  showLoading({ commit }) {
    commit('SHOW_LOADING');
  },
  hideLoading({ commit }) {
    commit('HIDE_LOADING');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
