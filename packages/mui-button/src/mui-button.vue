<template>
    <div  class="mui-button" 
          @click="handleClick"
          v-bind:class="{ 
            'large': size=='large',
            'medium': size=='medium',
            'small': size=='small',
            'disabled': disabled,
             }" >
       <slot >默认值</slot>
    </div>
</template>

<script>
    export default {
        name: 'mui-button',
        props:{
             size:{
               type:String,
             },
             html:{
               type:String,
             },
             disabled:{
               type:Boolean,
             }
        },
        data() {
            return {
               
            };
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
      height: 60px;
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
      font-size: 26px;
      color: #fff;
      outline: none;
      border-radius: 30px;
      
      cursor: pointer;
      text-align: center;
      line-height: 60px;
      &.large{
         width: 80%;
      }
      &.medium{
         width: 60%;
      }
      &.small{
         width: 40%;
      }
      &.disabled{
         background: #F5F5F5;
         border: 1px solid #ccc;
         color:#ccc;
         cursor: not-allowed;
      }
  }
</style>





