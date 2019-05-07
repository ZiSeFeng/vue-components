// 导入组件， 组件必须声明 name
import muiNavBar from './src/mui-navbar';

// 为组件提供install安装方法，供按需引入
muiNavBar.install = function(Vue) {
  Vue.component(muiNavBar.name, muiNavBar);
};

// 默认导出组件
export default muiNavBar;
