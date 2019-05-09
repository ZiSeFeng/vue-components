<template>
    <div ref="mgWidth" class="grid">{{gridValue}}</div>
</template>

<script>
    export default {
        name: 'Grid',
        props: ['grid','gridValue'],//num值用来设置组件栅格布局
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
   .grid{
      display: inline-block;
      box-sizing:border-box;
      margin-right: -6px;
   }
</style>

