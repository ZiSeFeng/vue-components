import muiOption from './src/mui-option';

muiOption.install = function(Vue) {
  Vue.component(muiOption.name, muiOption);
};

export default muiOption;
