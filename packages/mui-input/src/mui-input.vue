<template>
  <div class="mui-input">
    <div class="svg-container fl" v-if="leftIcon">
      <!-- <svg-icon class="svg-left" :icon-class="leftIcon" /> -->
      <svg-icon class="svg-user" icon-class="user" />
    </div>
    <div class="line"></div>
    <input
      :type="type"
      class="input"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />
    <div class="svg-container fr" v-if="rightIcon">
      <svg-icon class="svg-right" :icon-class="rightIcon" @click="rightClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-input',
  props: {
    placeholder: {
      default: '请输入',
      type: String
    },
    value: null,
    type: {
      type: String,
      default: 'text'
    },
    leftIcon: String,
    rightIcon: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
    },
    rightClick() {
      this.$emit('handleShow');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin';
@import '../../../src/styles/mixin';
.svg-container {
  height: 100%;
  .svg-left {
    font-size: 0.47rem;
    color: $red;
    margin: 0.1rem 0.22rem 0 0.2rem;
  }
  .svg-right {
    font-size: 0.43rem;
    color: $gray;
    margin-top: 0.19rem;
  }
}

.mui-input {
  width: 100%;
  height: 0.8rem;
  background-color: #fff;
  border-bottom: 2PX solid $red;
  .line {
    width: 2PX; /*no*/
    height: 0.47rem;
    background-color: $red;
    float: left;
    margin: 5PX 0;
  }
  .input {
    width: calc(100% - 1px- 0.7rem - 0.7rem - 0.42rem - 0.234rem);/*no*/
    height: 99%;
    line-height: 99%;
    font-size: $font48;
    font-family: $fontSC;
    color: $gray3;
    padding-left: 0.234rem;
    border: none;
    float: left;
    @include placeholder {
      color: $inputPlaceholder;
    }
  }
}
.svg-user {
  font-size: 38px;
  color: $red;
}
</style>
