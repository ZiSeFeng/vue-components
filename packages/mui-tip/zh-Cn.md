## mui-tip

### 开始使用
```
import { muiTip } from 'vue-mui';

// 注册指令使用
Vue.use(muiTip.directive);
// 工具函数调用
Vue.prototype.,$tip = muiTip.tip;
```

### 指令使用
推荐使用注册指定来使用，默认的指定名称为v-tip,如果想用其他名称可以在Vue.use中进行配置
> Vue.use(muiTip.directive, { directive: `'tip'`});

**例子**
```
<span v-tip.top.dark.click="getTip">指定绑定一个对象</span>

methods(){
  getTip() {
    return {
      title: 'v-tip标题',
      content: 'v-tip内容'.
      theme: 'dark',
      container: document.body,
      customProps: { mas: '自定义渲染' },
      customComponent: Vue.extend({
        props: ['msg'],
        render(h) => {
          return('span', this.msg)
        }
      }),
      placements: ['top', 'bottom'],
      duration: 400,
      transition: true
    }
  }
}
```

### 工具函数
直接使用this.$tip惊醒冒泡
> Vue.prototype.$tip = muiTip.tip

```
this.$tip({
  target: this.$el, // tip 的参考元素
  width: 400,
  content: '周一vue的directive',
  // customProps 传递 customComponent 组件的需要的 props
  customProps: {
    msg: '自定义渲染内容',
    handler () {
      console.log('click')
    }
  }
})
```
### mui-tip Attribute
| 参数 | 说明 | 类型 | 默认值 |
| - | :-: | - | -:
| title | 标题 | - | string |
| content | 内容 | - | string |
| theme | 主题（light、dark） | string | light |
| customComponent | 自定义组件渲染content | [String, Function, Object] | - |
| customProps | customComponent的传递props值 | Object | - |
| customListeners | 用监听customComponent自定义组件内容emit的事件。注意：这里使用了vue 2.4 新加v-on新语法，小于2.4的版本vue不支持此特性，若有需要处理自定义组件的事件可以通过customProps传入处理函数实现 | Object | - |
| customClass | 组件自定义class的类型 | string | - |
| target | 绑定目标元素 | null | - |
| container | 父级容器 | null | - |
| placement | array用于设置tip显示的优先级 | ['top', 'right', 'bottom', 'left'] | - |
| duration | 气泡自动消失时间 | number | 400 |
| arrowsSize | 气泡的小箭头大小 | number | 8 |
| width | 组件的宽度 | [String, Number] | 300px |
| height | 内容的高度 | [String, Number] | | auto |
| zIndex | tip的z-index | number | 999 | 
| transition | 是否为组件添加transform过渡 | boolean | - |

### 组件方法
```
<componentt :is="customComponent" v-bind="customProps" v-on="customListeners"></component>
```
| 参数 | 说明 | 类型 | 默认值 | 
| :-: | - | - | -: |
| showTip | 显示tip | function | - |
| hiddenTip | 隐藏tip | function | - |
| updateTip | 显示更新tip位置 | - |
| destory | 销毁tip实例，一般不需要调用 | - | - |
注意： 组件内部有监听customComponent自定义组件emit的hidden-tip事件和update-tip事件，对应触发hiddenTip与updateTip方法