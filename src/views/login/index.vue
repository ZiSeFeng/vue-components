<template>
  <div class="login-page">
    <div class="logo">
      <img src="@/assets/images/login-logo.png" alt="飞鱼通行证logo" />
    </div>
    <div class="login-form">
      <mui-input
        :placeholder="userPlaceholder"
        v-model="username"
        :leftIcon="'user'"
      />
      <mui-input
        :type="pwdType"
        :placeholder="passPlaceholder"
        :leftIcon="'pass'"
        :rightIcon="rightIcon"
        v-model="password"
        class="login-pass"
        @handleShow="handleShow"
      />
    </div>
    <button @click="handleSubmit" class="login-submit">立即登录</button>
    <div class="login-btn">
      <span class="login-register fl">立即注册</span>
      <span class="login-forget fr">忘记密码</span>
    </div>
    <div class="login-account">
      <div class="line fl"></div>
      <span class="title">使用合作账号登录</span>
      <div class="line fr"></div>
      <div class="icon">
        <svg-icon icon-class="weixin"></svg-icon>
        <svg-icon icon-class="qq"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPlaceholder: '请输入通行证账号',
      passPlaceholder: '请输入密码',
      username: '',
      password: '',
      pwdType: 'password',
      rightIcon: 'no-eye'
    };
  },
  created() {},
  methods: {
    handleSubmit() {
      console.log(this.username, '2222');
    },
    handleShow() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.rightIcon = this.rightIcon === 'no-eye' ? 'eye' : 'no-eye';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin';
@import '../../styles/mixin';

.login-page {
  margin: 0 0.97rem;
}
.logo {
  width: 4.81rem;
  height: 0.95rem;
  padding: 2.86rem 0 2.36rem;
  margin: 0 auto;
  img {
    width: 100%;
    height: auto;
  }
}
.login-pass {
  margin-top: 0.93rem;
}
.login-submit {
  width: 100%;
  height: 1.07rem;
  background-image: linear-gradient(90deg, #ff5074 0%, #e8474a 100%),
    linear-gradient(#e8474a, #e8474a);
  background-blend-mode: normal, normal;
  box-shadow: 0rem 0.08rem 0.16rem 0rem rgba(232, 71, 74, 0.2);
  border-radius: 0.53rem;
  color: $white;
  font-size: 0.43rem;
  font-family: $fontSC;
  margin: 1.45rem auto 0.67rem;
}
.login-btn {
  width: 100%;
  height: 0.32rem;
  font-family: $fontSC;
  line-height: 0.14rem;
  font-size: 0.34rem;
  margin-bottom: 3.17rem;
  .login-forget {
    color: $grayae;
  }
  .login-register {
    color: $red;
  }
}
.login-account {
  .title {
    font-size: 0.32rem;
    font-family: $fontSC;
    line-height: 0.14rem;
    color: $grayae;
  }
  .line {
    height: 2PX;
    width: calc((100% - 2.67rem - 1.24rem) / 2);
    background-color: #f3f3f3;
    margin-top: 26PX;
  }
  svg {
    width: 0.97rem;
    height: 0.97rem;
    border-radius: 50%;
    margin-top: 0.69rem;
    &:last-child {
      margin-left: 1.8rem;
    }
  }
}
</style>
