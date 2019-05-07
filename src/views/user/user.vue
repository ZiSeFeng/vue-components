<template>
  <div class="user-wrap">
    <div class="clearfix user-box">
      <svg-icon :iconClass="'logo'" class="icon-logo fl"></svg-icon>
      <h2>{{ nickName }}</h2>
    </div>
    <div class="sever">
      <div class="box-header clearfix">
        <i class="iconfont icon-record fl">
          <svg-icon :iconClass="'record'"></svg-icon>
        </i>
        <h3 class="fl">服务记录</h3>
        <i class="iconfont icon-more fr" v-if="!empty" @click="goRecord()">
          <svg-icon :iconClass="'more'"></svg-icon>
        </i>
      </div>
      <div class="num"  v-if="!empty">
        <div class="item br">
          <p>3<i>条</i></p>
          <span>服务总数</span>
        </div>
        <div class="item">
          <p>2<i>条</i></p>
          <span>处理中</span>
        </div>
      </div>
      <div class="empty" v-if="empty"></div>
      <ul class="sever-list"  v-if="!empty">
        <li v-for="(item, index) in serveList" class="clearfix" v-bind:key="index">
          <span class="time">{{ item.time }}</span>
          <span class="title">{{ item.title }}</span>
          <span class="status fr" v-if="item.status == 1" style="color:#4ec94b">处理中</span>
          <span class="status fr" v-if="item.status == 2">已回复</span>
          <span class="status fr" v-if="item.status == 3">已解决</span>
          <span class="dot fr" v-if="item.red"></span>
        </li>
      </ul>
    </div>
    <a class="btn-exit" bindtap="bindLoginTap">退出登录</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickName: 'zyt',
      empty: false,
      serveList: [ //服务记录
        {id:1, time: '12-19', title:'魔界塔充值异常问题',status: 1, red: false}, //处理中
        {id:2, time: '04-29', title:'账号被封问题',status: 2, red: true}, //已回复
        // {id:3, time: '04-16', title:'魔界塔登录异常，充值掉线，游戏卡顿，关卡错误问题',status: 3, red: false}, //已解决
      ]
    };
  },
  methods: {
    goRecord() {
      this.$router.push({ path: `user/record` })
    }  
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin';
@import '../../styles/mixin';
*{
  margin: 0;
  padding: 0;
}
.user-wrap {
  height: 100%;
  background-color: #F9F9F9;
  text-align:left;
}
.user-box {
  width: 100%;
  padding: 40px 44px;
  display: block;
  box-sizing: border-box;
  h2 {
    font-size: 30px;
    line-height: 80px;
    height: 80px;
    padding-left: 14px;
    color: #333333;
    display: block;
    font-weight: bold;
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.icon-logo {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
}

.box-header {
  padding: 20px 0 20px;
  .icon-record {
    height: 36px;
    width: 42px;
    line-height: 36px;
    text-align: center;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    background: #31C896;
    background: -webkit-linear-gradient(left, #31C896, #3FDEBC);
    .svg-icon {
      width: 34px;
      height: 36px;
      line-height: 36px;
      padding: 6px;
    }
  }
  h3 {
    font-size: 30px;
    padding-left: 10px;
    line-height: 36px;
    font-weight: bold;
  }
  .icon-more {
    width: 60px;
    height: 36px;
    overflow: hidden;
    margin-right: 20px;
    .svg-icon {
      width: 62px;
      height: 62px;
      margin-top: -12px;
    }
  }
}

.sever {
  width: calc(100% - 50px);
  margin: 0 auto;
  color: #333333;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.05);
}

.empty {
  height: 360px;
  width: 100%;
  background: url('http://192.168.13.74/web/gamePic/wechat/empty.png') center no-repeat;
  background-size: 270px auto;
}

.sever-list {
  width: 100%;
  padding: 0 20px;
  font-size: 24px;
  box-sizing: border-box;
  display: block;
  li {
    display: block;
    height: 76px;
    line-height: 76px;
    border-top: 1Px solid $borderGray;
  }
  span {
    display: inline-block;
  }
  .time {
    width: 70px;
    vertical-align: top;
  }
  .title {
    width: calc(100% - 180px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dot {
    width: 14px;
    height: 14px;
    background: #E95A63;
    border-radius: 50%;
    margin-top: 32px;
    margin-right: 10px;
  }
   .status {
    color: #666666;
  }
}

.num {
  display: flex;
  padding: 20px 20px 40px;
  .item {
    width: 50%;
    text-align: center;
    p {
      font-size: 60px;
      font-weight: bold;
      color: $gray3;
    }
    i {
      font-size: 24px;
      font-style: normal;
    }
    span {
      margin-top: 10px;
      color: #999999;
      font-size: 22px;
      display: inline-block;
    }
  }
  .br {
    border-right: 1Px solid $borderGray;
  }
}

.btn-exit {
  width: calc(100% - 50px);
  margin: 30px auto;
  display: block;
  height: 70px;
  line-height: 70px;
  border-radius: 36px;
  text-align: center;
  font-size: 28px;
  color: $red;
  border: 0;
  box-shadow: 0 0 20px rgba(0,0,0, 0.05);
  background: #fff;
  letter-spacing: 1Px;
}
</style>

