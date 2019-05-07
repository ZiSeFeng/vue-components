import muiCell from './src/mui-cell';

muiCell.install = function(Vue) {
  Vue.component(muiCell.name, muiCell);
};

export default muiCell;
