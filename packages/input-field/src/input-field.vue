<template>
  <div class="input-form">
    <div class="svg-container fl">
      <svg-icon class="svg-user" icon-class="user" />
    </div>
    <div class="line"></div>
    <input class="input" type="text" :placeholder="placeholder" />
    <div class="svg-container fr">
      <svg-icon class="svg-no-eye" icon-class="no-eye" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'inputField',
    props: {
      placeholder: {
        default: '请输入',
        type: String
      }
    },

};
</script>


<style lang="scss" scoped>
@import '../../../src/styles/skin';
@import '../../../src/styles/mixin';
.svg-container {
  width: 54px;
  height: 100%;
  svg {
    margin: 10px 0;
  }
  .svg-user {
    font-size: 38px;
    color: $red;
  }
  .svg-no-eye {
    font-size: 32px;
    margin-top: 16px;
    color: $gray;
  }
}

.input-form {
  width: 100%;
  height: 59px;
  background-color: #fff;
  border-bottom: 1px solid $red;
  .line {
    width: 1PX;
    height: 29px;
    background-color: $red;
    float: left;
    margin: 15px 0;
  }
  .input {
    width: calc(100% - 1px - 54px - 54px - 8PX);
    height: 100%;
    line-height: 58px;
    font-size: $font24;
    font-family: $fontSC;
    color: $gray3;
    padding-left: 8PX;
    border: none;
    @include placeholder {
      color: $inputPlaceholder;
    }
  }
}
</style>
