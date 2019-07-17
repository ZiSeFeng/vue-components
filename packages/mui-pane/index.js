import muiPane from './src/mui-pane';

muiPane.install = function(Vue) {
  Vue.component(muiPane.name, muiPane);
};

export default muiPane;
