<template>
     <div class="mui-notification" v-if="visible" ref="notification">
        <div class="notification">
            <p>{{msg}}</p>
            <div class="btn">
              <button @click="handleClick" class="default-btn">确定</button>
            </div>
        </div>
     </div>
</template>

<script>
    export default {
        name: 'mui-notification',
        props: {
            visible: {
              default: false,
              type: Boolean,
            },
            msg: {
              type: String,
            },
        },

        data() {
            return {
                
            };
        },
        mounted() {

        },
        beforeMount () {
          //如果已经存在，则阻止出现第二次
          let node = document.querySelector('.mui-notification')
          if (node && node.parentNode) {
            node.parentNode.removeChild(node)
          }
        },
        methods: {
          handleClick(event) {
             this.$emit("on-close", this.visible);
          },
        }
       
    };
</script>


<style lang="scss" scoped>
  @import '../../../src/styles/skin';
  @import '../../../src/styles/mixin';
  .mui-notification{
      position:fixed;
      left:0px;
      top:0px;
      background:rgba(0, 0, 0, 0.4);
      width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
      height:100%;
      display:block; 
      z-index:200;  
      .notification{
          position: fixed;
          top: 50%;
          left: 50%;
          background-color: #fff;
          width:70%;
          border-radius: 20px;
          text-align: center;
          -webkit-transform: translateX(-50%) translateY(-50%);
          -moz-transform: translateX(-50%) translateY(-50%);
          -ms-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
          p{
              font-size: 28px;
              line-height: 1.8;
              max-height: 430px;
              overflow-y: auto;
              overflow-x:hidden;
              margin: 40px 10px;
              padding:0px 40px;
              word-break:break-all;
              color: #333;
          }
          .btn{
             margin:0px 0px 40px;
          }
      } 
  }
  

  /*按钮样式*/
$btnBegin: rgb(254, 80, 115);
$btnEnd: rgb(233, 71, 75);
$btnborder: rgb(254, 80, 115);
.default-btn {
  width: 70%;
  height: 46px;
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
  border-radius: 23px;
  cursor: pointer;
}
</style>