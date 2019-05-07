<template>
  <div class="img-box clearfix">
    <div v-for="(item, index) in data" class="item fl" v-bind:key="index" ><img :src="item"></div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.img-box {
  width: 100%;
  background: #F9F9F9;
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

