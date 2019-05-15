import muiNotification from './src/mui-notification';

muiNotification.install = function(Vue) {
  Vue.component(muiNotification.name, muiNotification);
};

export default muiNotification;
