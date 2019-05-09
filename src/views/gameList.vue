<template>
    <div class="gameList">
        <!-- <h1 >游戏列表</h1> -->
        <div class="content">
            <MediaList  num="3" v-for="(item,i) in data"  :medialURl="item.src" :medialName="item.title">
            </MediaList>
        </div>
       
        <div class="footer">
        	  <button @click="submit()" class="default-btn" disabled="disabled">提交问题</button>
        </div>

        
    </div>
</template>

<script>
import MediaList from '@/components/MediaList'
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
    },
    components: {
      MediaList
    },
};
</script>

<style lang="scss" scoped>

  body{
   	height: auto;
  }
  h4, div{
	  text-align: left;
	  padding:0px;
    margin:0px;
		font-size: 24px;
	}
	h4{
		font-size: 28px;
	}
	.content{
    width:94%;
		padding-bottom: 120px;
    margin:20px auto;
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
  
</style>

<!-- 此页面要求图片必须一样的格式 -->

