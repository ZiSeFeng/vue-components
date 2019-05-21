<template>
  <div class="mui-index-list">
    <ul class="mui-index-list-content" ref="content" :style="{ 'height': currentHeight + 'px', 'margin-right': navWidth + 'px'}">
      <slot></slot>
    </ul>
    <div class="mui-index-list-nav" @touchstart="handleTouchStart" ref="nav">
      <ul class="mui-index-list-navlist">
        <li class="mui-index-list-navitem" v-for="(section, index) in sections" :key="index" :index="index + 1">{{ section.index }}</li>
      </ul>
       <div class="mui-index-list-indicator" v-if="showIndicator" v-show="moving" :style="{'top' : currentTop + 'px'}" >
        <div class="mui-index-list-indicator-text">{{ currentIndicator }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';
export default {
  name: 'mui-index-list',
  props: {
    height: Number,
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sections: [],
      navWidth: '100vh',
      indicatorTime: null,
      moving: false,
      firstSection: null,
      currentIndicator: '',
      currentHeight: this.height,
      navOffsetX: 0,
      currentTop: 0,
    };
  },
  watch: {
    sections() {
      this.init();
    },
    height(val) {
      if (val) {
        this.currentHeight = val;
      }
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        // this.navWidth = this.$refs.content.clientWidth;
        this.navWidth = this.navWidth != '' ? this.navWidth : this.$refs.nav.clientWidth;
      });
      let listItems = this.$refs.content.getElementsByTagName('li');
      if (listItems.length > 0) {
        this.firstSection = listItems[0];
      }
    },
    handleTouchStart(e) {
      if (e.target.tagName !== 'LI') {
        return;
      }
      this.navOffsetX = e.changedTouches[0].clientX;
      // this.currentTop = e.changedTouches[0].clientY;
      this.scrollList(e.changedTouches[0].clientY);
      if (this.indicatorTime) {
        clearTimeout(this.indicatorTime);
      }
      this.moving = true;
      window.addEventListener('touchmove', this.handleTouchMove);
      window.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchMove(e) {
      e.preventDefault();
      this.scrollList(e.changedTouches[0].clientY);
    },
    handleTouchEnd() {
      this.indicatorTime = setTimeout(() => {
        this.moving = false;
        this.currentIndicator = '';
      }, 5000);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    },
    scrollList(y) {
      let currentItem = document.elementFromPoint(this.navOffsetX, y);
      const index = currentItem.getAttribute('index');
      this.currentTop = 60 * index ;
      // console.log(this.currentTop, this.currentIndicator, 'currentTop')
      // if (!currentItem || !currentItem.classList.contains('mui-index-list-navlist')) {
      //   return;
      // }
      this.currentIndicator = currentItem.innerText;
      let targets = this.sections.filter(section => section.index === currentItem.innerText);
      let targetDOM;
      if (targets.length > 0) {
        targetDOM = targets[0].$el;
        this.$refs.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
      }
      console.log(this.currentTop, this.currentIndicator, 'currentTop')
    }
  },
  mounted() {
    if (!this.currentHeight) {
      window.scrollTo(0, 0);
      requestAnimationFrame(()=>{
        this.currentHeight = document.documentElement.clientHeight - this.$refs.content.getBoundingClientRect().top;
      });
    }
    this.init();
  }
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin';

.mui-index-list {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.mui-index-list-content {
  margin: 0;
  padding: 0;
  overflow: auto;
}
.mui-index-list-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  // left: 0;
  right: 0;
  margin: 0;
  // background-color: #fff;
  text-align: center;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40px;
}
.mui-index-list-navlist {
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
.mui-index-list-navitem {
  padding: 2Px 0;
  font-size: 20px;
  user-select: none;
  -webkit-touch-callout: none;
  font-family: $fontSC;
  color: $gray6;
  text-align: center;
}
.mui-index-list-indicator {
  position: absolute;
  top: 50%;
  left: -72%;
  transform: translate(-50%, 72%);
  text-align: center;
  line-height: 50px;
  // background-color: #f0f0f0;
  color: #333;
  font-size: 36px;
  // box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
  font-family: PingFang-SC-Bold;
  width: 1.28rem;
  height: 1.13rem;
  line-height: 0.98rem;
  background: url('../../../src/assets/images/indictor.png') no-repeat;
  background-size: 100% auto;
}
</style>
