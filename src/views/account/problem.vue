<template>
  <div class="accountProblem">
    <!-- <h1 >更多账号问题</h1> -->
    <div class="content">
      <div class="search">
        <mui-searchInput
          v-model="searchValue"
          :placeholder="'搜索'"
          @click="search()"
        ></mui-searchInput>
      </div>
 
      <div class="list">
        <mui-navbar
          v-for="(item, index) in problemList"
          :key="index"
          :titleColor="'#333'"
          :text="item.title"
          :rightIcon="'right-arrow'"
          class="content-card"
        />
         <!--  <mui-cell 
             v-if="problemList.length>0"
             v-for="(item, i) in problemList"
             :title="item.title" 
             icon="back" 
             is-link
             value="描述文字">  
          </mui-cell> -->
          <div v-if="!problemList || problemList.length==0" class="hint">
              没有找到相关问题
          </div>
      </div>
    </div>

    <div class="footer">
      <button @click="submit()" class="default-btn">提交问题</button>
    </div>
  </div>
</template>

<script>
import { getListData } from '@/api/account';
export default {
  data() {
    return {
      searchValue: '',
      problemList:'',
      data: [
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想xv湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '呃呃呃呃呃呃呃呃奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '呃呃呃呃呃呃呃呃奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '呃呃呃呃呃呃呃呃奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
        {
          src: 'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png',
          title: '奇想江湖'
        },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    submit() {
      alert('aaaaaaaaa');
    },
    search() {
      console.log('search查询');
    },
    getList() {
      getListData().then(res => {
        console.log(res, '111sssssssssssssssss1',res.data);
        this.problemList = res.data.list;
        
      });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin.scss';

.accountProblem{
   .mui-cell{
      padding:20px 0px!important;
   }
   .hint{
      color:#c8c9cc;
      font-size: 26px;
      text-align:center;
      margin-top:120px;
   }
}
body {
  height: auto;
}
h4,
div {
  text-align: left;
  padding: 0px;
  margin: 0px;
  font-size: 24px;
}
h4 {
  font-size: 28px;
}
.content {
  width: 94%;
  padding-bottom: 120px;
  margin: 20px auto;
}
.footer {
  position: fixed;
  left: 0%;
  bottom: 0%;
  width: 100%;
  text-align: center;
  padding: 20px 0px;
  background-color: #fff;
}
.search {
  padding: 10px 0px;
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
