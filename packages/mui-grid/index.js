import muiGrid from './src/mui-grid';

muiGrid.install = function(Vue) {
  Vue.component(muiGrid.name, muiGrid);
};

export default muiGrid;
