<template>
  <div>
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      :isLeftIcon="false"
    />
    <div class="content clearfix">
      <mui-cell-grid
        v-for="(item, index) in gameList"
        :key="index"
        :titleColor="'#333'"
        :imgSrc="item.img"
        :title="item.title"
        :imgAlt="item.imgTitle"
      />
    </div>
  </div>
</template>

<script>
const LEFT_IMG = require('@/assets/images/red-game.png');

export default {
  props: {
    gameList: Array
  },
  data() {
    return {
      titleColor: '#333',
      textValue: '游戏',
      leftIcon: LEFT_IMG,
      rightIcon: 'ellipsis'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin.scss';
.content {
  width: 100%;
  padding-bottom: 0.2rem;
}
</style>
