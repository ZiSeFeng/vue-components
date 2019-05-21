<template>
  <div class="mui-nav" @click="hanldeClick">
    <div class="fl svg-container svg-image mui-nav-left" v-if="leftIcon" ref="leftIconImg">
      <svg-icon class="svg-left" :icon-class="leftIcon" v-if="isLeftIcon" ></svg-icon>
      <img class="svg-left" :src="leftIcon" v-if="!isLeftIcon" />
    </div>
    <div class="fl title" :style="{ color: titleColor, 'margin-left': currentLeft + 'px'}">
      <span>{{ text }}</span>
    </div>
    <div class="fr svg-container mui-nav-right" v-if="rightIcon">
      <svg-icon class="svg-right" :icon-class="rightIcon" v-if="isRightIcon" ></svg-icon>
      <img class="svg-right" :src="rightIcon" v-if="!isRightIcon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-navbar',
  props: {
    text: String,
    leftIcon: String,
    rightIcon: String,
    titleColor: String,
    isLeftIcon: {
      type: Boolean,
      default: true
    },
    isRightIcon: {
      type: Boolean,
      default: true
    },
    leftWidth: Number
  },
  data() {
    return {
      currentLeft: this.leftWidth,
    }
  },
  created() {},
  mounted() {
    if (this.currentLeft) {
      this.currentLeft = -(this.$refs.leftIconImg.getBoundingClientRect().width+this.$refs.leftIconImg.getBoundingClientRect().left+this.$refs.leftIconImg.getBoundingClientRect().right) / 2;
    }
  },
  methods: {
    hanldeClick(){
      this.$emit('hanldeClick');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin';
@import '../../../src/styles/mixin';

.svg-container {
  .svg-right {
    font-size: 0.34rem;
    color: $grayc;
  }
}
.mui-nav {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  display: -o-flex;
  align-items: center;
  -webkit-align-items: center;
  .mui-nav-left {
    margin-left: 16PX;
    margin-right: 16PX;
  }
  .mui-nav-right {
    margin-right: 8PX;
  }
  .svg-image {
    background-color: $white;
  }
  .title {
    font-family: $fontSC;
    font-size: 0.48rem;
    width: 96%;
    text-align: left;
  }
}
</style>
