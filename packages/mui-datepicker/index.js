import muiDatepicker from './src/mui-datepicker';

muiDatepicker.install = function(Vue) {
  Vue.component(muiDatepicker.name, muiDatepicker);
};

export default muiDatepicker;
