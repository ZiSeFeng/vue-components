<template>
    <div ref="mgList" class="media-list">
        <div class="img">
            <img :src="medialURl"/>
        </div>
        <p>{{medialName}}</p>
    </div>
</template>

<script>
    export default {
        name: 'MediaList',
        props: ['num','medialURl','medialName'],//num值用来设置组件栅格布局
        data() {
            return {
                
            };
        },
        
        mounted:function(){
            this.$refs.mgList.style.setProperty("width","calc((100%) / "+this.num+")");
            this.$refs.mgList.style.setProperty("width","-webkit-calc((100%) / "+this.num+")");
            this.$refs.mgList.style.setProperty("width","-webkit-calc((100%) / "+this.num+")");
        },
    };
</script>


<style lang="scss" scoped>
  .media-list{
      display: inline-block;
      box-sizing:border-box;
      margin-right: -6px;
      vertical-align:top;
      padding-top:50px;
     .img{
         width:60%;
         margin:0px auto;
         img{
           width:100%;
           border-radius: 15px;
           border:1px solid red;
           box-shadow:0px 15px 12px rgb(220,220,220); 
        }
      } 
      &>p{
         text-align: center;
         width:100%;
         font-size:20px;
         padding:0px 3px;
         margin:12px 0px;
      }
  }
  
</style>