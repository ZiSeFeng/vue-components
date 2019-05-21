<template>
  <div class="mui-spinner-double-bounce" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div class="mui-spinner-double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></div>
    <div class="mui-spinner-double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></div>
  </div>
</template>

<script>
  import common from './common.vue';
  export default {
    name: 'double-bounce',
    mixins: [common]
  };
</script>

<style lang="css">
.mui-spinner-double-bounce {
  position: relative;
}
.mui-spinner-double-bounce-bounce1,
.mui-spinner-double-bounce-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: mui-spinner-double-bounce 0.2s infinite ease-in-out;
}
.mui-spinner-double-bounce-bounce1 {
  animation-delay: -1.0s;
}
@keyframes mui-spinner-double-bounce {
  0%, 10% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0)
  }
}
</style>
