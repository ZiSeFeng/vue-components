<template>
  <div class="mui-progress">
    <slot name="start"></slot>
    <div class="mui-progress-content">
      <div class="mui-progress-runway" :style="{hegiht: barHeight + 'px'}"></div>
      <div class="mui-progress-progress" :style="{width: value + '%', height: barHeight + 'px'}"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<script>
/*
* @value (进度条的值) 
* @barHeight (定义线宽)

例子
<mt-progress></mt-progress>
<mt-progress :value="20"></mt-progress>
<mt-progress :value="40">
  <div slot="start">0%</div>
  <div slot="end">100%</div>
</mt-progress>
 <mt-progress :value="60" :bar-height="5"></mt-progress>
<mt-progress :value="value" v-if="progressVisible" transition="progress-fade">
      <div slot="end">{{ value }}%</div>
    </mt-progress>
*/

export default {
  name: 'mui-progress',
  props: {
    value: Number,
    barHeight: {
      type: Number,
      default: 3
    }
  }
}
</script>


<style lang="scss" scoped>
.mui-progress,
.mui-progress > * {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.mui-progress {
  position: relative;
  height: 30Px;
  line-height: 30Px;
}
.mui-progress-content {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.mui-progress-progress,
.mui-progress-runway {
  position: absolute;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
}
.mui-progress-runway {
  left: 0;
  right: 0;
  background-color: #ebebeb;
  height: 3Px;
}
.mui-progress-progress {
  display: block;
  background-color: #26aaff;
  width: 0;
}
</style>

