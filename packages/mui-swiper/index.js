import muiSwiper from './src/mui-swiper';

muiSwiper.install = function(Vue) {
  Vue.component(muiSwiper.name, muiSwiper);
};

export default muiSwiper;
