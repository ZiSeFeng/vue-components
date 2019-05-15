<template>
  <div class="success">
    <!-- <h1 >提交成功</h1> -->
    <div class="content">
        <div class="icon"><svg-icon  icon-class="commit"></svg-icon></div>
        <p class="hint1">提交成功</p>
        <p class="hint2" >我们将尽快为您处理 , 请留意查看</p>
        <div>
           <button @click="submit()" class="default-btn">返回</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    submit() {
      alert('aaaaaaaaa');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../src/styles/skin.scss';
.success{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    .content{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:80%;
        height: 50%;
        margin:auto;
        overflow: hidden;
        .icon{
           .svg-icon{
              font-size: 200px;
              filter: drop-shadow(#34bf86 2620px 0);
              transform: translateX(-2620px);
           }
        }
        .hint1{
           font-size: 28px;
           font-weight:bold;
           color: #333;
           margin-top: -10px;
        }
        .hint2{
           font-size: 20px;
           color: #999;
           padding:20px 0px 80px;
        }
    }
}



/*按钮样式*/
$btnBegin: rgb(254, 80, 115);
$btnEnd: rgb(233, 71, 75);
$btnborder: rgb(254, 80, 115);
.default-btn {
  width: 60%;
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
