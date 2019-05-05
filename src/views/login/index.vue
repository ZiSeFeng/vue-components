<template>
  <div>
    <div class="logo">
      <img src="@/assets/images/login-logo.png" alt="飞鱼通行证logo" />
    </div>
    <div class="login-form">
      <mui-input :placeholder="userPlaceholder"></mui-input>
      <mui-input></mui-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPlaceholder: '请输入通行证账号'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin';
@import '../../styles/mixin';

.logo {
  width: 299px;
  height: 60px;
  margin: 152px auto 195px;
  img {
    width: 100%;
    height: auto;
  }
}
.login-form {
  margin: 0 60px;
}
</style>
