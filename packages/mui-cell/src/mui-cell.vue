<template>
  <div class="mui-cell">
    <div class="mui-cell-img">
      <img :src="imgSrc" :alt="imgAlt" />
    </div>
    <div class="mui-cell-title">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mui-cell',
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
.mui-cell {
  width: 100%;
  height: 100%;
  .mui-cell-img {
    margin: 0 auto;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 0.24rem;
    img {
      width: 100%;
      height: auto;
      max-height: 100%;
    }
  }
  .mui-cell-title {
    width: 100%;
    font-size: 0.32rem;
    color: #333;
    margin-top: 0.27rem;
  }
}
</style>
