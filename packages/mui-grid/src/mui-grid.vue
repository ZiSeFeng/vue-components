<template>
    <div ref="mgWidth" class="mui-grid"><slot></slot></div>
</template>

<script>
    export default {
        name: 'mui-grid',
        props: ['grid'],//num值用来设置组件栅格布局
        data() {
            return {
                
            };
        },
        mounted:function(){
            this.$refs.mgWidth.style.setProperty("width","calc((100%) / "+this.grid+")");
            this.$refs.mgWidth.style.setProperty("width","-webkit-calc((100%) / "+this.grid+")");
            this.$refs.mgWidth.style.setProperty("width","-webkit-calc((100%) / "+this.grid+")");
        },
    };
</script>


<style lang="scss" scoped>
   .mui-grid{
      display: inline-block;
      box-sizing:border-box;
      margin-right: -6px;
   }
</style>





