<template>
  <div :class="['mui-spinner-fading-circle circle-color-' + _uid]" :style="{
    'width': spinnerSize,
    'height': spinnerSize
  }">
    <div v-for="(n, i) in 12" :class="['is-circle' + (n + 1)]" class="mui-spinner-fading-circle-circle" :key="i"></div>
  </div>
</template>

<script>
import common from './common';

export default {
  name: 'fading-circle',
  mixins: [common],
  created() {
    if (this.$isServer) return;
    this.styleNode = document.createElement('style');
    const css = `.circle-color-${this._uid} > div::before {background-color: ${this.spinnerColor}; }`;

    this.styleNode.type = 'text/css';
    this.styleNode.rel = 'stylesheet';
    this.styleNode.title = 'fading circle style';
    document.getElementsByTagName('head')[0].appendChild(this.styleNode);
    this.styleNode.appendChild(document.createTextNode(css));
  },
  destroyed() {
    if (this.styleNode) {
      this.styleNode.parentNode.removeChild(this.styleNode);
    }
  }
}
</script>

<style lang="scss">
.mui-spinner-fading-circle {
  position: relative;
}
.mui-spinner-fading-circle {
  size: 100%;
  position: absolute 0 * 0;
}
// @for $i from 2 to 12 {
//   .mui-spinner-fading-circle-circle.is-circle-#{$i} {
//     transform: rotate(calc(360deg / 12 * ($i - 1)));
//     &::before {
//       animation-delay: calc(-1.2s + 1.2s / 12 * ($i - 1));
//     }
//   }
// }
.mui-spinner-fading-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  size: 15%;
  border-radius: 100%;
  animation: mui-fading-circle 1.2s infinite ease-in-out both;
}
@keyframes mint-fading-circle {
  0%, 39%, 100% { opacity: 0 }
  40% { opacity: 1 }
}
</style>
