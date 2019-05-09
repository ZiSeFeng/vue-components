<template>
  <div class="home-page">
    <div class="home-title">飞鱼客服</div>
    <div class="home-header">
      <div class="home-area">
        <mui-navbar
          :titleColor="titleColor"
          :text="textValue"
          :leftIcon="leftIcon"
          :rightIcon="rightIcon"
          :isLeftIcon="false"
          class="home-nav clearfix"
        />
        <list-cell :recordList="recordList" v-if="$store.state.login.isLogin" />
      </div>
    </div>
    <!-- header over -->
    <div class="home-content">
      <card-list class="home-area" :serverList="serverList" />
    </div>
    <!-- server list -->
    <div class="home-content">
      <card-cell class="home-area" :gameList="gameList" />
    </div>
    <!-- game list -->
    <button class="btn-submit">提交问题</button>
  </div>
</template>

<script>
import cardList from '@/components/card-list/index';
import cardCell from '@/components/card-cell/index';
import listCell from '@/components/list-cell/index';
import { getUserInfo } from '@/api/user';
import { getListData } from '@/api/home';
const LEFT_ICON = require('@/assets/images/logo.png');

export default {
  data() {
    return {
      textValue: '您还未登录',
      leftIcon: LEFT_ICON,
      rightIcon: 'right-arrow',
      titleColor: '#e8474a',
      gameList: [],
      recordList: [],
      serverList: []
    };
  },
  components: {
    cardList,
    cardCell,
    listCell
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const self = this;
      getUserInfo().then(res => {
        self.$store.dispatch('login/login');
        const isLogin = self.$store.state.login.isLogin;
        this.titleColor = isLogin ? '#333' : '#e8474a';
        this.textValue = isLogin ? res.data.username : '您还未登录';
        this.getList();
      });
    },
    getList() {
      getListData().then(res => {
        console.log(res, '1111');
        this.gameList = res.data.game.list;
        this.serverList = res.data.server.list;
        this.recordList = res.data.record.list;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin';
@import '../../styles/mixin';

.home-page {
  background-color: $grayf9;
  min-height: 100vh;
}
.home-title {
  height: 60px;
  line-height: 60px;
  color: $black;
  font-family: $fontSC;
  font-size: 0.43rem;
  text-align: center;
  background-color: $white;
}
.home-header {
  width: 100%;
  height: auto;
  background: url('../../assets/images/header-bg.png') no-repeat center top;
  background-size: 100% auto;
  padding: 0 0.43rem 0.37rem;
  .home-area {
    background-color: $white;
    width: 100%;
    min-height: 1.93rem;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.24rem;
    position: relative;
    top: 0.37rem;
  }
  .home-nav {
    height: 1.93rem;
    padding-top: 0.12rem;
  }
}
.home-content {
  height: auto;
  background-color: $white;
  box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.12rem;
  margin: 0.31rem 0.43rem 0;
  .home-area {
    padding-top: 0.34rem;
  }
}

.btn-submit {
  margin: 0.6rem auto;
  width: calc(100% - 3.82rem);
  height: 1.06rem;
  line-height: 1.06rem;
  background-image: linear-gradient(90deg, #ff5074 0%, #e8474a 100%),
    linear-gradient(#e9484d, #e9484d);
  box-shadow: 0 0.08rem 0.16rem 0 rgba(232, 71, 74, 0.2);
  border-radius: 0.53rem;
  color: $white;
  font-family: $fontSC;
  font-size: 0.43rem;
}
</style>
