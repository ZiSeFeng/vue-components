<template>
  <div class="serve-wrap">
    <ul class="serve-list" v-if="!empty">
      <li
        v-for="(item, index) in serveList"
        class="clearfix"
        v-bind:key="index"
        @click="goDetail(item)"
      >
        <span class="title">{{ item.title }}</span>
        <span class="time fl">{{ formats(item.time) }}</span>
        <span class="status fr" v-if="item.status == 1" style="color:#4ec94b"
          >处理中</span
        >
        <span class="status fr" v-if="item.status == 2">已回复</span>
        <span class="status fr" v-if="item.status == 3">已解决</span>
        <span class="dot fr" v-if="item.red"></span>
      </li>
    </ul>
    <div class="empty" v-else>
      <p>仅保存半个月内的服务记录</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      nickName: 'zyt',
      empty: false,
      serveList: [
        //服务记录
        {
          id: 1,
          time: 1557049332,
          title: '魔界塔充值异常问题',
          status: 1,
          red: false
        }, //处理中
        {
          id: 2,
          time: 1557049332,
          title: '账号被封问题',
          status: 2,
          red: true
        }, //已回复
        {
          id: 3,
          time: 1557049332,
          title: '魔界塔登录异常，充值掉线，游戏卡顿，关卡错误问题',
          status: 3,
          red: true
        } //已解决
      ]
    };
  },
  methods: {
    formats(val) {
      let time = moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
      return time;
    },
    goDetail(val) {
      this.$router.push({ path: `/user/detail/${val.id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../styles/skin';
@import '../../styles/mixin';
* {
  margin: 0;
  padding: 0;
}
.serve-wrap {
  height: 100%;
  width: 100%;
  color: #333333;
  text-align: left;
}
.serve-list {
  display: block;
  width: 100%;
  padding-left: 25px;
  li {
    display: block;
    height: 120px;
    border-bottom: 1px solid $borderGray;
    padding: 0 25px 0 0;
  }
  .title {
    display: block;
    width: calc(100% - 110px);
    font-size: 26px;
    height: 65px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 25px;
  }
  .time {
    display: block;
    font-size: 18px;
    color: #cfcfcf;
    width: calc(100% - 130px);
    padding-top: 12px;
  }
  .status {
    color: #666666;
    font-size: 24px;
    margin-top: -22px;
  }
  .dot {
    width: 14px;
    height: 14px;
    background: #e95a63;
    border-radius: 50%;
    margin-top: -12px;
    margin-right: 10px;
  }
}
.empty {
  padding-top: 300px;
  p {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    padding-top: 220px;
    text-align: center;
    font-size: 24px;
    color: #999999;
    background: url('../../assets/images/empty2.png') top center no-repeat;
    background-size: 100% auto;
  }
}
</style>
