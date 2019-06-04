<template>
  <div class="home-page">
    <div class="home-btn">
      <router-link to="/button">按钮button</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/dialog">弹窗dialog</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/messagebox">提示框alert、confirm、prompt</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/swiper">轮播图swiper</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/upload">上传upload</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/tab">标签页tab</router-link>
    </div>
    <div class="home-btn">
      <router-link to="/tip">提示tip</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-btn {
  width: 90%;
  height: 1rem;
  line-height: 1rem;
  background-color: #e8474a;
  border-radius: 10Px;
  margin-bottom: 5Px;
  color: #fff;
  font-size: 0.34rem;
}
</style>
