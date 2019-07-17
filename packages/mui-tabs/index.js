import muiTabs from './src/mui-tabs';

muiTabs.install = function(Vue) {
  Vue.component(muiTabs.name, muiTabs);
};

export default muiTabs;
