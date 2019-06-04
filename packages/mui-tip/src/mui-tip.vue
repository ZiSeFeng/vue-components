<template>
  <transition name="mui-tip-fade">
    <div v-show="visible"
      class="mui-tip-container"
      :style="boxStyle"
      :class="boxClass"
      @mouseenter="showTip"
      @mouseleave="hiddenTip(true)">
      <div v-show="placement"
        class="mui-tip-arrows"
        :class="placement"
        :style="arrowBox">
      </div>
      <span v-if="title" class="mui-tip-title">
        {{ title }}
      </span>
      <p v-if="content"
        class="mui-tip-content"
        :style="contentHeight">
        {{ content }}
      </p>
      <component
        v-if="customComponent"
        v-bind="customProps"
        v-on="customListeners"
        :is="customComponent"
        @hidden-tip="hiddenTip"
        @update-tip="updateTip">
      </component>
    </div>
  </transition>
</template>

<script>
import {
  debounce,
  checkScrollable,
  getScrollContainer,
  computeArrowPos,
  computePlacementInfo,
  computeCoordinateBaseMid,
  computeCoordinateBaseEdge
} from './util'
// passive support check
let supportsPassive = false;
document.addEventListener('passive-check', () => {}, {
  get passive () { supportsPassive = { passive: true } }
});//传递 passive 为 true 来明确告诉浏览器，事件处理程序不会调用 preventDefault 来阻止默认滑动行为

export default {
  name: 'mui-tip',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 显示的内容
    content: {
      type: String,
      default: ''
    },
    // 工具函数调用时附加到自定义组件 props 上面的
    customProps: {
      type: Object,
      default () {
        return {}
      }
    },
    // 对应 <component> 组件 is 属性
    customComponent: {
      type: [String, Function, Object],
      default: ''
    },
    // 用于监听自定义组件 emit 的事件
    customListeners: Object,
    // tip 绑定的目标元素
    target: null,
    // tip 的容器，默认插入 body 中
    container: null,
    // 用于限制 tip 展示的方向，优先级按顺序
    placements: {
      type: Array,
      default () {
        return ['top', 'right', 'bottom', 'left']
      }
    },
    // tip 窗口多久后自动消失，为 <=0 不消失
    duration: {
      type: Number,
      default: 300
    },
     // 是否为 tip 添加 transfrom 过渡
    transition: Boolean,
    // 提示用的小箭头大小
    arrowsSize: {
      type: Number,
      default: 8
    },
    // 组件的宽度
    width: {
      type: [String, Number],
      default: 'auto'
    },
    // 内容的高度
    height: {
      type: [String, Number],
      default: 'auto'
    },
    // tip 的 z-index
    zIndex: {
      type: Number,
      default: 999
    },
    // 主题 light dark 默认为 light
    theme: {
      type: String,
      default: 'light'
    },
    // 自定义 class 的类名
    customClass: {
      type: String,
      default: ''
    }
  },
  data () {
    this.containerNode = null
    this.targetParentNode = null
    this.visibleTimer = null
    return {
      // tip 的展示方向（小箭头的方向）
      placement: '',
      visible: false,
      arrowsPos: {}
    }
  },
  created() {
    console.log('mui-tip.vue 1111')
  },
  computed: {
    arrowBox () {
      return Object.assign({
        borderWidth: `${this.arrowsSize}px`
      }, this.arrowsPos)
    },
    boxStyle () {
      const width = this.width
      return {
        width: typeof width === 'string' ? width : `${width}px`,
        zIndex: this.zIndex
      }
    },
    boxClass () {
      const { customClass, theme, transition } = this
      const tsClass = transition ? 'transition-transfrom' : ''
      return [customClass, theme, tsClass]
    },
    contentHeight () {
      const height = this.height
      return {
        height: typeof height === 'string' ? height : `${height}px`
      }
    }
  },
  methods: {
    showTip () {
      clearTimeout(this.visibleTimer)
      this.visible = true
    },
    // 隐藏 tip
    hiddenTip (immedia) {
      if (immedia) {
        this.visible = false
      } else {
        this.setVisible(false)
      }
    },
    // 更新 tip 位置
    updateTip () {
      this.setContainerNode()
      this.showTip()
      this.asynSetCoordinate()
    },
    // 设置 tip 的容器
    setContainerNode () {
      const {
        $el,
        target,
        container,
        targetParentNode,
        containerNode: oldNode
      } = this
      // 目标元素的父级节点相同则不需要重新计算容器
      if (!target || target.parentNode === targetParentNode) return
      this.targetParentNode = target.parentNode
      const newNode = container || getScrollContainer(target)
      if (newNode === oldNode) return
      if ($el.parentNode !== newNode) {
        newNode.appendChild($el)
      }
      const position = window.getComputedStyle(newNode, null).position
      if (!position || position === 'static') {
        newNode.style.position = 'relative'
      }
      if (oldNode) {
        oldNode.removeEventListener('scroll', this.scrollHandler, supportsPassive)
      }
      if (checkScrollable(newNode)) {
        newNode.addEventListener('scroll', this.scrollHandler, supportsPassive)
      }
      this.containerNode = newNode
    },
    setCoordinate () {
      const { $el, target, containerNode, placements, arrowsSize } = this
      if (!$el || !target || !containerNode) return
      const placementInfo = computePlacementInfo(target, containerNode, $el, placements, arrowsSize)
      const coordinate = placementInfo.mod === 'mid'
        ? computeCoordinateBaseMid(placementInfo, arrowsSize)
        : computeCoordinateBaseEdge(placementInfo, arrowsSize)
      this.setArrowsPos(coordinate)
      this.placement = coordinate.placement
      const x = coordinate.x + containerNode.scrollLeft
      const y = coordinate.y + containerNode.scrollTop
      this.$el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    asynSetCoordinate () {
      this.$nextTick(this.setCoordinate)
    },
    // 设置小三角形的位置
    setArrowsPos ({ placement, arrowsOffset }) {
      this.arrowsPos = computeArrowPos(placement, arrowsOffset, this.arrowsSize)
    },
    // 设置 tip 经过 duration ms 后的状态
    setVisible (v) {
      clearTimeout(this.visibleTimer)
      this.visibleTimer = setTimeout(() => {
        this.visible = v
        this.visibleTimer = null
      }, this.duration)
    },
    // 参考元素父级容器发生滚动时的处理
    scrollHandler: debounce(function () {
      this.setCoordinate()
    }, 200),
    clearScrollEvent () {
      if (this.containerNode) {
        this.containerNode.removeEventListener('scroll', this.scrollHandler, supportsPassive)
      }
    },
    removeParentNode () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    destroy () {
      this.clearScrollEvent()
      this.removeParentNode()
      this.$destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-tip-container {
  $light-bdc: #d9d9d9;
  $light-bgc: #fff;
  $light-ftc: #000;
  $dark-bdc: #1f2d3d;
  $dark-bgc: #1f2d3d;
  $dark-ftc: #fff;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  box-sizing: border-box;
  width: 200px;
  padding: 6px 8px;
  margin: 0;
  color: $light-ftc;
  font-size: 12px;
  background: $light-bgc;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .1);
  border: 1px solid $light-bdc;
  border-radius: 4px;
  transform: translate3d(0, 0, 0);
  transition: opacity .3s;
  will-change: opacity, transform;

  .mui-tip-title,
  .mui-tip-content {
    padding: 0;
    margin: 0;
  }

  .mui-tip-title {
    font-size: 14px;
    font-weight: 400;
  }

  .mui-tip-content {
    overflow-y: auto;
    line-height: 2;
    text-align: left;
    word-wrap: break-word;
    background-color: inherit;
  }

  .mui-tip-arrows {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    border-color: transparent;
    border-style: inherit;
    border-width: 10px;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: inherit;
      border-width: inherit;
      transform: translate(-50%, -50%);
    }

    &[class^='top-'],
    &[class*=' top-'] {
      border-top-color: inherit;
      transform: translate(-50%, 0);

      &::after {
        top: -2px;
        border-top-color: $light-bgc;
      }
    }

    &[class^='bottom-'],
    &[class*=' bottom-'] {
      border-bottom-color: inherit;
      transform: translate(-50%, -100%);

      &::after {
        top: 2px;
        border-bottom-color: $light-bgc;
      }
    }

    &[class^='left-'],
    &[class*=' left-'] {
      border-left-color: inherit;
      transform: translate(0, -50%);

      &::after {
        left: -2px;
        border-left-color: $light-bgc;
      }
    }

    &[class^='right-'],
    &[class*=' right-'] {
      border-right-color: inherit;
      transform: translate(-100%, -50%);

      &::after {
        left: 2px;
        border-right-color: $light-bgc;
      }
    }
  }

  &.dark {
    color: $dark-ftc;
    background: $dark-bgc;
    border-color: $dark-bdc;

    [class^='top-'],
    [class*=' top-'] {
      &::after {
        border-top-color: $dark-bdc;
      }
    }

    [class^='bottom-'],
    [class*=' bottom-'] {
      &::after {
        border-bottom-color: $dark-bdc;
      }
    }

    [class^='left-'],
    [class*=' left-'] {
      &::after {
        border-left-color: $dark-bdc;
      }
    }

    [class^='right-'],
    [class*=' right-'] {
      &::after {
        border-right-color: $dark-bdc;
      }
    }
  }

  &.transition-transfrom {
    transition: opacity .3s, transform .5s cubic-bezier(.4, 0, .2, 1);
  }

  &.mui-tip-fade-enter,
  &.mui-tip-fade-leave-active {
    opacity: 0;
  }
}

</style>
