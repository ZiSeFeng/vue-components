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
      <mui-button :size="'medium'" @click="submit()" >提交问题</mui-button>
    </div>
    
    <mui-notification :visible='visible' :msg="msg" @on-close="sure()"></mui-notification>
  </div>
</template>

<script>
import { getListData } from '@/api/account';
export default {
  data() {
    return {
      searchValue: '',
      problemList:'',
      visible:false,
      msg:'ddddddd奇想江湖奇想江湖奇想江dddcvcxv',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    submit() {
      this.visible = true;
    },
    search() {
      console.log('search查询');
    },
    sure() {
      this.visible = false;
    },
    
    getList() {
      getListData().then(res => {
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
   .mui-nav {
      padding:20px 0px!important;
      border-bottom: 1px solid #f2f3f5;
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
  padding: 10px 0px;
  background-color: #fff;
}
.search {
  padding: 10px 0px;
}


</style>
