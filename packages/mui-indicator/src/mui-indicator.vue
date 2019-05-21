<template>
  <transition name="mui-indicator">
    <div class="mui-indicator" v-show="visible">
      <div class="mui-indicator-wrapper" :style="{ 'padding': 'text' ? '30px' : '25px'}">
        <mui-spinner class="mui-indicator-spin" :type="convertedSpinnerType" :size="64"></mui-spinner>
        <span class="mui-indicator-text" v-show="text">{{ text }}</span>
      </div>
      <div class="mui-inditor-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script type="text/babel">
// import Spinner from '../../mui-spinner/index';
// if (process.env.NODE_ENV === 'component') {
//   require('mint-ui/packages/spinner/style.css');
// }

export default {
  name: 'mui-indicator',
  data() {
    return {
      visible: false
    }
  },
  // components: {
  //   Spinner
  // },
  computed: {
    convertedSpinnerType() {
      switch(this.spinnerType) {
        case 'double-bounce':
          return 1;
        case 'triple-bounce':
          return 2;
        case 'fading-circle':
          return 3;
        default:
          return 0;
      }
    }
  },
  props: {
    text: String,
    spinnerType: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style>
.mui-indicator {
  transition: opacity 0.2s linear;
  -webkit-transition:opacity 0.2s linear;
}
.mui-indicator-wrapper {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius:  5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: content-box;
  text-align: center;
}
.mui-indicator-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
}
.mui-indicator-spin {
  display: inline-block;
  text-align: center;
}
.mui-indicator-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 0.1rem;
  font-size: 0.34rem;
}
.mui-indicator-enter,
.mui-indicator-leave-active {
  opacity: 0;
}
</style>