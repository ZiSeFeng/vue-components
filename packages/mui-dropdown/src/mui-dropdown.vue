<template>
  <div class="mui-dropdown" v-clickoutside.esc="handleClose">
    <button class="mui-dropdown-btn" @click="isShow = !isShow">点击显示下拉菜单</button>
    <div class="mui-dropdown-menu" v-show="isShow">
      <p>下拉框的内容，点击外面区域可以关闭</p>
    </div>
  </div>
</template>

<script>
import clickoutside from './clickoutside';

export default {
  name: 'mui-dropdown',
  data() {
    return {
      isShow: false,
    }
  },
  directives: {
    clickoutside
  },
  methods: {
    handleClose() {
      this.isShow = false;
    }
  },
}
</script>


<style lang="scss" scoped>
@import './index';
</style>
