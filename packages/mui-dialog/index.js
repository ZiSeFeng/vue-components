import muiDialog from './src/mui-dialog';

muiDialog.install = function(Vue) {
  Vue.component(muiDialog.name, muiDialog);
};

export default muiDialog;
