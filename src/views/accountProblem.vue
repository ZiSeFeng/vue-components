<template>
    <div class="accountProblem">
        <!-- <h1 >更多账号问题</h1> -->
        <div class="content">
           <div class="search-input">
              <div class="search"><svg-icon icon-class="search"></svg-icon></div>
              <div class="input"><input type="text" class="input" name="" value="" placeholder="搜索"></div>
              <div class="cancel">取消</div>
           </div>
           <div class="list" >
               <div>dddddd</div>
               <div></div>
               
           </div>
        </div>

        <div class="footer">
        	<button @click="submit()" class="default-btn">提交问题</button>
        </div>

        
    </div>
</template>

<script>
export default {
     data() {
        return {
            data:[
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'呃呃呃呃呃呃呃呃奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
                {'src':"http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png",'title':'奇想江湖'},
            ]
        };
    },
    methods: {
        submit() {
            alert("aaaaaaaaa")
        }
    }
};
</script>

<style lang="scss" scoped>
     body{
     	height: auto;
     }
	 h4, div{
		text-align: left;
		padding: 0px 20px;
		font-size: 24px;
	}
	h4{
		font-size: 28px;
	}
	.content{
		/*padding-bottom: 120px;*/
	}
	.footer{
		position: fixed;
	    left: 0%;
	    bottom: 0%;
	    width: 100%;
	    text-align: center;
	    padding: 20px 0px;
	    background-color: #fff;
	}

	/*按钮样式*/
   $btnBegin:rgb(254,80,115);
   $btnEnd:rgb(233,71,75);
   $btnborder:rgb(254,80,115);;
  .default-btn{
       width:60%;
       height:46px;
       background: -webkit-linear-gradient(left, $btnBegin , $btnEnd); /* Safari 5.1 - 6.0 */
       background: -o-linear-gradient(right, $btnBegin, $btnEnd); /* Opera 11.1 - 12.0 */
       background: -moz-linear-gradient(right, $btnBegin, $btnEnd); /* Firefox 3.6 - 15 */
       background: linear-gradient(to right, $btnBegin , $btnEnd); /* 标准的语法 */
       border:1px solid $btnborder;
       font-size: 18px;
       color:#fff;
       outline: none;
       border-radius: 23px;
       cursor: pointer;
  }
  

  //搜索框样式
  $inputBackgroud:rgb(249,249,249);
  .search-input{
       position: relative;
       color:#333;
       .search{
            position: absolute;
            left:0px;
            top:0px;
            z-index: 2;
       }
       .input{
           width:80%;
           display: inline-block;
           input{
                position: relative;
                z-index: 1;
                display: inline-block;
                padding: 4px 7px;
                width: 100%;
                height: 34px;
                font-size: 18px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.65);
                background-color:$inputBackgroud;
                background-image: none;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
          }
       }
       .cancel{
          display: inline-block;
          font-size:22px;  
       }
  }
   
</style>

