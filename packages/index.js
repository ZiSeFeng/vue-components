// 导入颜色选择器组件
import colorPicker from './color-picker';
import muiInput from './mui-input'; //输入框
import muiNavBar from './mui-navbar'; // 导航栏 两侧带有图标或者是图片
import muiGrid from './mui-grid';
import muiIndexList from './mui-index-list'; // 索引列表
import muiIndexSection from './mui-index-section';
import muiCell from './mui-cell';
import muiSearchInput from './mui-searchInput';
import muiCellGrid from './mui-cell-grid';
import muiUpload from './mui-upload';
import muiIndicator from './mui-indicator';
import muiSpinner from './mui-spinner';
import Indicator from './indicator';
import muiNotification from './mui-notification';
import muiButton from './mui-button';
import muiProgress from './mui-progress';
import muiDialog from './mui-dialog';
import muiMessageBox from './mui-message-box';
import muiDatepicker from './mui-datepicker';
import muiSwiper from './mui-swiper';
import muiTip from './mui-tip';
import muiCheckbox from './mui-checkbox';
import muiCheckboxGroup from './mui-checkbox-group';
import muiRadio from './mui-radio';
import muiRadioGroup from './mui-radio-group';
import muiSelect from './mui-select';
import muiOption from './mui-option';
import muiInputNumber from './mui-input-number';
import muiTabs from './mui-tabs';
import muiPane from './mui-pane';
import muiDropdown from './mui-dropdown';

// 存储组件列表
const components = [
  colorPicker,
  muiInput,
  muiNavBar,
  muiGrid,
  muiIndexList,
  muiIndexSection,
  muiCell,
  muiSearchInput,
  muiCellGrid,
  muiUpload,
  // muiIndicator,
  muiSpinner,
  muiNotification,
  muiButton,
  muiProgress,
  muiDialog,
  muiDatepicker,
  muiSwiper,
  muiCheckbox,
  muiCheckboxGroup,
  muiRadio,
  muiRadioGroup,
  muiSelect,
  muiOption,
  muiInputNumber,
  muiTabs,
  muiPane,
  muiDropdown
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));

  Vue.prototype.$muiIndicator = muiIndicator;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
  Vue.$mydialog = Vue.prototype.$mydialog = muiDialog;
  Vue.$alert = Vue.prototype.$alert = muiMessageBox.alert;
  Vue.$confirm = Vue.prototype.$confirm = muiMessageBox.confirm;
  Vue.$prompt = Vue.prototype.$prompt = muiMessageBox.prompt;
  Vue.$close = Vue.prototype.$close = muiMessageBox.close;
  Vue.$tip = Vue.prototype.$tip = muiTip.tip;
  Vue.use(muiTip.directive, { directiveName: 'tip' });
  // Vue.use(muiTip.directive);
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  colorPicker,
  muiInput,
  muiNavBar,
  muiCell,
  muiGrid,
  muiSearchInput,
  muiIndexList,
  muiIndexSection,
  muiCellGrid,
  muiUpload,
  muiIndicator,
  muiSpinner,
  muiNotification,
  muiButton,
  muiProgress,
  muiDialog,
  muiDatepicker,
  muiSwiper,
  muiTip,
  muiCheckbox,
  muiCheckboxGroup,
  muiRadio,
  muiRadioGroup,
  muiSelect,
  muiOption,
  muiInputNumber,
  muiTabs,
  muiPane,
  muiDropdown
};
