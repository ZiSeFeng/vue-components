<template>
    <button
      @click="handleClick"
      :type="nativeType"
      :disabled="disabled"
      :class="clsStyle">
       <span class="mui-button-icon" v-if="icon || $slots.icon">
         <slot name="icon">
           <svg-icon v-if="icon" class="mui-icon" :icon-class="icon"></svg-icon>
           <!-- <i v-if="icon" class="mui-icon" :class="'mui-icon-'+ icon"></i> -->
         </slot>
       </span>
       <label class="mui-button-text"><slot>默认值</slot></label>
    </button>
</template>

<script>

/*
* mui-button
* @module component/button
* @desc 按钮
* @param {string} [type=default] -显示类型，接受，default， primary， danger
* @param {boolean} [disabled=false] - 禁用
* @param {string} [size=normal] -尺寸，接受normal，small，large
* @param {string} [native-type] - 原生type属性
* @param {string} [icon] -图标，提供more，back，或者自定义图标，（传入不带前缀的图标类名，U最后拼接.mui-icon-xxxx）
* @param {slot} - 显示文本
* @param {slot} [icon] - 显示图标 
*/
export default {
  name: 'mui-button',
  props:{
        size:{
          type:String
        },
        shape: {
          type: String,
          default: ''
        },
        disabled:{
          type: Boolean,
        },
        nativeType: String,
        icon: String,
        type: {
          type: String,
          default: '',
          validator(value) {
            return [
              'default',
              'danger',
              'primary',
              ''
            ].indexOf(value) > -1;
          }
        }
  },
  created() {
    console.log(this.size, '/n', this.html, '11')
  },
  computed: {
    clsStyle() {
      let cls = 'mui-button ';
      cls += `${this.type} ${this.shape} `
      cls += this.size ? this.size : '';
      return cls;
    }
  },
  methods: {
    handleClick(event) {
      if(!this.disabled){
          this.$emit('click', event);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin';
@import '../../../src/styles/mixin';
.mui-button {
  width: 60%;
  height: 40px;
  margin:0 auto;
  background: -webkit-linear-gradient(
    left,
    $btnBegin,
    $btnEnd
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    $btnBegin,
    $btnEnd
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    $btnBegin,
    $btnEnd
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, $btnBegin, $btnEnd); /* 标准的语法 */
  border: 1px solid $btnborder;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-radius: 30px;
  
  cursor: pointer;
  text-align: center;
  line-height: 40px;

  &.red {
    background: #ff0000;
  }
  &.gray {
    background: $btngrayclr;
    border: 1px solid $btngrayclr;
    color: $btnTxt;
  }
  &.light {
    background: #fff;
    color: $btnTxt;
    border: 1px solid $btnlightbor;
  }


  &.large {
    width: 80%;
  }
  &.medium {
    width: 60%;
  }
  &.small {
    width: 40%;
  }
  &.sm {
    width: 90px;
  }

  &.disabled {
    background: $btndisableclr;
    border: 1px solid $btndisableclr;
    color:#ccc;
    cursor: not-allowed;
  }

  &.radius {
    border-radius: 5px;
  }

  &.primary {
    background: $btnprimaryclr;
  }
  &.default {
    background: $btndefaultbor;
    border: 1px solid $btndefaultbor;
  }
}
</style>
