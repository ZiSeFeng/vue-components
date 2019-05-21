import muiUpload from './src/mui-upload';

muiUpload.install = function(Vue) {
  Vue.component(muiUpload.name, muiUpload);
};

export default muiUpload;
