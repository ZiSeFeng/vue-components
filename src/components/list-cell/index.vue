<template>
  <div>
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      class="list-record"
    />
    <div class="content clearfix">
      <ul class="list-cell">
        <li v-for="(item, index) in recordList" :key="index">
          <span class="list-cell-left fl">{{ item.date }}</span>
          <span class="list-cell-medium fl">{{ item.title }}</span>
          <span class="list-cell-right fl">
            <i class="list-cell-read" v-show="!item.readed"></i>
            {{ statusText[item.status] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getListData } from '@/api/home';

export default {
  props: {
    recordList: Array
  },
  data() {
    return {
      titleColor: '#333',
      textValue: '服务记录',
      leftIcon: 'green-record',
      rightIcon: 'ellipsis',
      statusText: {
        0: '处理中',
        1: '已回复',
        2: '已解决',
        3: '未解决'
      }
    };
  },
  // created() {
  //   console.log(this.recordList, 'this recordList')
  // },
  // methods: {
  //   getServerList() {
  //     getListData().then(res => {
  //       this.gameList = res.data.game.list;
  //       console.log(this.gameList, 'gameList')
  //     });
  //   }
  // }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin.scss';
.content {
  width: 100%;
  padding-bottom: 0.2rem;
  .list-cell {
    width: 100%;
    height: auto;
    padding:10PX 0.33rem 0 0.24rem;/*no*/
    li {
      width: 100%;
      font-family: $fontSC;
      color: $gray3;
      font-size: 0.34rem;
      float: left;
      text-align: left;
      height: 0.48rem;
      line-height: 0.48rem;
      margin-bottom: 10PX;
    }
    .list-cell-left {
      width: 260PX;
    }
    .list-cell-right {
      width: 170PX;
      text-align: right;
      color: $green;
    }
    .list-cell-medium {
      width: calc(100% - 260PX - 170PX - 10PX);/*no*/
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .list-cell-read {
      width: 0.20rem;
      height: 0.20rem;
      border-radius: 50%;
      background-color: $red;
      display: inline-block;
    }
  }
}
</style>
