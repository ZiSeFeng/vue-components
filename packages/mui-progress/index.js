import muiProgress from './src/mui-progress';

muiProgress.install = function (Vue) {
  Vue.component(muiProgress.name, muiProgress);
};

export default muiProgress;
