<template>
  <div class="mui-grid">
    <div class="mui-grid-img">
      <img :src="imgSrc" :alt="imgAlt" />
    </div>
    <div class="mui-grid-title">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-grid',
  props: {
    titleColor: {
      tyle: String,
      default: '#333'
    },
    imgSrc: String,
    title: String,
    imgAlt: String
  },
  data() {
    return {
    
    };
  }
  // created() {
  //   console.log(this.imgSrc,this, 'imgSrc')
  // },
};
</script>

<style lang="scss" scoped>
.mui-grid {
  width: 100%;
  height: 100%;
  .mui-grid-img {
    margin: 0 auto;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 0.24rem;
    img {
      width: 100%;
      height: auto;
      max-height: 100%;
      border-radius: 0.24rem;
    }
  }
  .mui-grid-title {
    width: 100%;
    font-size: 0.34rem;
    color: #333;
    margin-top: 0.27rem;
  }
}
</style>
