// 导入组件，组件必须声明 name
import muiInput from './src/mui-input';

// 为组件提供 install 安装方法，供按需引入
muiInput.install = function(Vue) {
  Vue.component(muiInput.name, muiInput);
};

// 默认导出组件
export default muiInput;
