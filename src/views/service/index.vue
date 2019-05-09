<template>
  <div class="service-page">
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :isRightIcon="false"
      class="service-title"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      textValue: '飞鱼客服',
      leftIcon: 'back',
      rightIcon: 'right-arrow',
      titleColor: '#e8474a'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin';

.service-title {
  color: $gray3;
  text-align: center;
}
</style>
