export default {
  bind: function(el, binding) {
    function documentHandler(e) {
      let escSwitch = binding.modifiers && binding.modifiers.esc;
      //判断点击的区域是否是指令所在的元素内部，如果是，就跳出函数，不往下执行。
      if (el.contains(e.target)) {
        return false;
      }
      //判断当前的指令v-clickoutside有没有写表达式
      if (binding.expression) {
        //binding.value()就是用来执行当前上下文methods中指定的函数的
        binding.value(e);
      }
    }
    //用于在unbind钩子函数中移除对document的click事件监听。
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind: function(el) {
    document.removeEventListener('click', el.__vueClickOutside__);
    //如果不移除，当组件或元素销毁时，它仍存在于内存中
    delete el.__vueClickOutside__;
  }
};
