<template>
     <div class="mui-searchInput" >
        <div class="searchicon" @click="handleIconClick"><svg-icon icon-class="search"></svg-icon></div>
        <div class="input"  >
           <input 
              type="text" 
              class="input" 
              name="" 
              :value="value" 
              ref="Input"
              @input="handleInput" 
              :placeholder="placeholder"
              :disabled="disabled"
            />
        </div>
        <!-- <div class="cancel" @click="handleCancel()" v-if="handleShow">取消</div> -->
        <div class="cancel" @click="handleCancel()" v-if="handleShow"><svg-icon icon-class="delete" ></svg-icon></div>
     </div>
</template>

<script>
    export default {
        name: 'mui-searchInput',
        props: {
            placeholder: {
              default: '请输入',
              type: String
            },
            value: null,
            disabled: Boolean,
        },

        data() {
            return {
                handleShow:true,
            };
        },
        mounted() {
          if(!this.$refs["Input"].value){
              this.handleShow = false;
          }else{
              this.handleShow = true;
          }
        },
        methods: {
          handleInput(event) {
            const value = event.target.value;
            if(!value){
                this.handleShow = false;
            }else{
                this.handleShow = true;
            }
            this.$emit('input', value);
          },
          handleIconClick(event) {
            this.$emit('click', event);
          },
          handleCancel(event) {
            this.handleShow = false;
            this.$refs["Input"].value = '';
            this.$emit('input', this.$refs["Input"].value );
          }
        }
       
    };
</script>


<style lang="scss" scoped>
  //搜索框样式
  @import '../../../src/styles/skin';
  .mui-searchInput{
       position: relative;
       color:#333;
       .searchicon{
            position: absolute;
            left:10px;
            top:10px;
            z-index: 2;
            cursor: pointer;
            .svg-icon{
               filter: drop-shadow($black 80px 0);
               transform: translateX(-80px);
            }
       }
       .input{
           width:100%;
           display: inline-block;
           input{
                position: relative;
                z-index: 1;
                display: inline-block;
                padding: 4px 7px;
                width: 100%;
                height: 48px;
                font-size: 18px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.65);
                background-color:$inputBackgroud;
                background-image: none;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                padding-left:40px;
                // caret-color: #82daf1d4;
           }
       }
       .cancel{
          position: absolute;
          right:10px;
          top:10px;
          z-index: 2;
          cursor: pointer;
          .svg-icon{
              color:$grayc;
          }
       }
  }
  
</style>