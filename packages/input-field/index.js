// 导入组件，组件必须声明 name
import inputField from './src/input-field';

// 为组件提供 install 安装方法，供按需引入
inputField.install = function(Vue) {
  Vue.component(inputField.name, inputField);
};

// 默认导出组件
export default inputField;
