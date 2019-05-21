<template>
  <div class="load-img">
    <span class="loading-icon" v-if="loading"></span>
    <img :src="url" alt="" v-if="!loading && ifSucceed">
    <span class="load-error" v-if="!loading && !ifSucceed">
      <small>图片加载失败</small>
    </span>
  </div>
</template>
<script>
export default {
  props: ['imgUrl', 'index', 'nowIndex'],
  data() {
    return {
      url: '',
      loading: true,
      ifSucceed: true
    };
  },
  mounted() {
    if (this.index == this.nowIndex) {
      this.loadingImg();
    }
  },
  methods: {
    loadingImg() {
      let newImg = new Image()
      newImg.src = this.imgUrl;
      newImg.onerror = () => {    // 图片加载错误时的替换图片
        this.loading = false;
        this.ifSucceed = false;
      }
      newImg.onload = () => { // 图片加载成功后把地址给原来的img
        this.url = newImg.src;
        this.loading = false;
      }
    },
  },
  watch: {
    nowIndex() {
      if (this.index == this.nowIndex) {
        this.loadingImg();
      }
    }
  }
}
</script>
<style soped>
.load-img {
  width: 100%;
  text-align: center;
  display: inline-block;
  position: relative;
}

.load-img .loading-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('../../assets/images/loading.gif') center no-repeat;
  background-size: 100% auto;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -15px;
  margin-left: -15px;
}

.load-img .load-error {
  display: inline-block;
  width: 100px;
  height: 110px;
  padding-top: 94px;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
  background: url('../../assets/images/img.png') top no-repeat;
  background-size: 100% auto;
  font-size: 20px;
}

.load-img img {
  width: 100%;
  display: block;
}
</style>