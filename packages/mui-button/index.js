import muiButton from './src/mui-button';
muiButton.install = function(Vue) {
  Vue.component(muiButton.name, muiButton);
};

export default muiButton;
