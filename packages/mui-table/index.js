import muiTable from './src/mui-table';

muiTable.install = function(Vue) {
  Vue.component(muiTable.name, muiTable);
};

export default muiTable;
