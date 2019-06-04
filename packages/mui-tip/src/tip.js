import Vue from 'vue';
import muiTip from './mui-tip';

const muiTipContainer = Vue.extend(muiTip);

const props = muiTip.props;
const defaultOptions = {};
Object.keys(props).forEach(key => {
  const prop = props[key];
  const dv = prop.default;
  if (prop && prop.default != null) {
    defaultOptions[key] = typeof dv === 'function' ? dv() : dv;
  }
});

let muiTipInstance = null;

export default function tip(options) {
  options = options || {};
  // 如果已经存在 tip 的实例,直接更新属性值
  if (muiTipInstance && muiTipInstance.$el.parentNode) {
    Object.assign(muiTipInstance, defaultOptions, options);
    if (muiTipInstance.target) {
      muiTipInstance.updateTip();
    } else {
      muiTipInstance.hiddenTip();
    }
    return muiTipInstance;
  }
  // 否则创建一个 tip 实例
  muiTipInstance = new muiTipContainer({
    propsData: options
  }).$mount();
  muiTipInstance.updateTip();
  return muiTipInstance;
}
