<template>
  <div>
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      :isLeftIcon="false"
    />
    <div class="content">
      <mui-navbar
        v-for="(item, index) in serverList"
        :key="index"
        :titleColor="'#333'"
        :text="item.title"
        :rightIcon="'right-arrow'"
        class="content-card"
      />
    </div>
  </div>
</template>

<script>
const LEFT_IMG = require('@/assets/images/blue-use.png');

export default {
  props: {
    serverList: Array
  },
  data() {
    return {
      titleColor: '#333',
      textValue: '账号',
      leftIcon: LEFT_IMG,
      rightIcon: 'ellipsis'
    };
  }
};
</script>
