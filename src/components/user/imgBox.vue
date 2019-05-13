<template>
  <div class="img-box">
    <div class="clearfix">
      <div v-for="(item, index) in data" class="item fl" v-bind:key="index" @click="imgViewFun(index)"><img :src="item"></div>
    </div>
    <transition name="load">
      <large-image :imgs="imagesView" :imgView="imgView" v-if="imgViewShow"></large-image>
    </transition>
  </div>
</template>
<script>
import LargeImage from '@/components/user/largeImage'
export default {
  components: {
    LargeImage
  },
  props: ['data'],
  data() {
    return {
      imgViewShow: false,
      imagesView: {},
    };
  },
  mounted() {
  },
  computed: {
    },
  methods: {
    imgView () {
      this.imgViewShow = false
    },
    imgViewFun (key) {
      this.imgViewShow = true
      this.imagesView.images = this.data
      this.imagesView.key = key
    },
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.img-box {
  width: 100%;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 18px 1%;
  margin-top: 6px;
  .item {
    width: 19%;
    padding-top: 19%;
    overflow: hidden;
    position: relative;
    margin: 0.5%;
    border-radius: 12px;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }
}
</style>
