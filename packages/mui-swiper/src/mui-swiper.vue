<template>
  <div ref="swiper" class="mui-swiper" :style="{height: currentHeight}"
  @touchstart="moveStart"
  @touchmove="moving"
  @touchend="moveEnd">
    <slot></slot>
    <ul ref="container" class="mui-swiper-container" :style="{ width: containerWidth + 'px', height: containerHeight + 'px'}">
      <li class="mui-swiper-item" v-for="(item, index) in swiperlist" :key="index">
        <a :href="item.url" rel="external nofollow">
          <img class="mui-swiper-item-img" :src="item.img" :alt="item.title"/>
          <p class="mui-swiper-item-title">{{ item.title }}</p>
        </a>
      </li>
    </ul>
    <div ref="indicator" class="mui-swiper-indicator">
      <span v-for="(len, i) in length" :key="len" class="mui-swiper-indicator-dot" :class="{'on': i === active }" @click="go(i)"></span>
    </div>
    <slot name="pagination">
      <div ref="pagination" class="mui-swiper-pagination" v-if="!pagination">
        <div class="mui-swiper-prev">
          <i class="iconfont" :class="pagination[0]" :data="active" @click="prev"></i>
        </div>
        <div class="mui-swiper-next">
          <i class="iconfont" :class="pagination[1]" @click="next"></i>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

let each = function (ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    if (callback(ary[i], i) === false) break
  }
}

export default{
  name: 'mui-swiper',
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    },
    swiperList: Array,
    pagination: Array,
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isInit: false,
      isMoving: false,
      containerWidth: 0,
      containerHeight: null,
      duration: 300,
      container: null,
      items: [],
      swiperlist: [],
      length: 0,
      active: 0,
      sensitivity: 60, // 触发切换的阈值
      resistance: 0.3, // 阻力系数
      start: {
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      },
      interval: 10000
    }
  },
  computed: {
    currentHeight () {
      if (typeof this.height === 'number') {
        return this.height + 'px';
      } else {
        return this.height;
      }
    },
  },
  created() {
    this.swiperlist = this.swiperList;
    this.swiperlist.push(this.swiperList[0]);
  },
  mounted() {
    this.init();
  },
  methods: {
    init () {
      // 避免有多个子组件挂载的时候导致的多次初始化
      if (this.isInit) return;
      this.isInit = true;
      this.container = this.$refs.swiper
      this.items = this.container.querySelectorAll('.mui-swiper-item');
      this.length = this.items.length;
      this.updateItemWidth();
      this.setTransform();
      this.setTransition('none');
      if (this.autoplay) this.setInterval();
    },
    updateItemWidth () {
      this.containerWidth = this.container.offsetWidth || document.documentElement.offsetWidth;
      this.containerHeight = this.height - 100;
    },
    setTransform (offset) {
      offset = offset || 0;
      each(this.items, (item, i) => {
        let distance = (i - this.active) * this.containerWidth + offset
        let transform = `translate3d(${distance}px, 0, 0)`
        item.style.webkitTransform = transform
        item.style.transform = transform
      })
    },
    setTransition (duration) {
      duration = duration || this.duration
      duration = typeof duration === 'number' ? (duration + 'ms') : duration
      each(this.items, (item) => {
        item.style.webkitTransition = duration
        item.style.transition = duration
      })
    },
    moveStart (e) {
      this.start.x = e.changedTouches[0].pageX
      this.start.y = e.changedTouches[0].pageY
      this.setTransition('none')
    },
    moving (e) {
      e.preventDefault()
      e.stopPropagation()
      let distanceX = e.changedTouches[0].pageX - this.start.x
      let distanceY = e.changedTouches[0].pageY - this.start.y
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.isMoving = true
        this.move.x = this.start.x + distanceX
        this.move.y = this.start.y + distanceY
        if ((this.active === 0 && distanceX > 0) || (this.active === (this.items.length - 1) && distanceX < 0)) {
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX)
      }
    },
    moveEnd (e) {
      if (this.isMoving) {
        e.preventDefault()
        e.stopPropagation()
        let distance = this.move.x - this.start.x
        if (Math.abs(distance) > this.sensitivity) {
          if (distance < 0) {
            this.next()
          } else {
            this.prev()
          }
        } else {
          this.back()
        }
        this.reset()
        this.isMoving = false
      }
    },
    next () {
      let index = this.active + 1;
      this.go(index);
    },
    prev () {
      let index = this.active - 1;
      this.go(index);
    },
    reset () {
      this.start.x = 0
      this.start.y = 0
      this.move.x = 0
      this.move.y = 0
    },
    back () {
      this.setTransition()
      this.setTransform()
    },
    destroy () {
      this.setTransition('none')
      this.clearTimer()
    },
    go (index) {
      this.active = index;
      if (this.active < 0) {
        this.active = this.isMoving ? 0 : this.items.length - 1;
      } else if (this.active > this.items.length - 1) {
        this.active = this.isMoving ? this.items.length - 1 : 0;
      }
      this.$emit('change', this.active);
      this.setTransition();
      this.setTransform();
    },
    clearInterval(interval) {
      clearInterval(interval);
    },
    setInterval() {
      this.interval = setInterval(() => {
        let index = this.active + 1;
        this.go(index);
      }, this.autoplay)
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-swiper{
  position: relative;
  overflow: hidden;
}
.mui-swiper-indicator {
  position: absolute;
  bottom: 0.2rem;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  z-index: 2;
}
.mui-swiper-indicator-dot {
  width: 25Px;
  height: 25Px;
  border-radius: 50%;
  background-color: #000;
  display: inline-block;
  margin: 0 0.08rem;
  &.on {
    background-color: #ff7000;
  }
}
.mui-swiper-container {
  overflow: hidden;
  // position: relative;
  height: 100%;
  width: 100%;
}
.mui-swiper-item {
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  // float: left;
}
.mui-swiper-item-img {
  width: 100%;
  height: 100%;
}
.mui-swiper-item-title {
  text-align: center;
  font-size: 18px;
  color: #999;
  background-color: rgba(#000, 0.6);
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
.mui-swiper-pagination {
  width: 100vw;
  height: 30Px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);
  z-index: 2;
}
.mui-swiper-prev,
.mui-swiper-next {
  position: absolute;
  z-index: 3;
  i {
    font-size: 0.52rem;
    color: #fff;
    &.disabled {
      cursor: not-allowed;
      color: #999;
    }
  }
}
.mui-swiper-prev {
  left: 35Px;
}
.mui-swiper-next {
  right: 35Px;
}
</style>