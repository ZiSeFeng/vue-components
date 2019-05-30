<template>
  <transition class="mui-dialog-fade">
    <div class="mui-dialog-wrapper" v-show="visible" :style="{'z-index': zIndex}">
      <div class="mui-dialog-mask" v-if="modals" @click.self="hide">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mui-dialog',
  props: {
    visible: Boolean,
    modals: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [String, Number],
      default: 1000
    }
  },
  methods: {
    hide() {
      this.$emit('update:visible', false);
    }
  },
}
</script>

<style lang="scss" scoped>
.mui-dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.mui-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000, 0.5);
}
.mui-dialog-enter-active {
  animation: dialog-fade-in 0.3s;
}
.mui-dialog-leave-ative {
  animation: dialog-fade-out 0.3s
}
@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0
  }
}
</style>

