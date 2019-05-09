<template>
  <li class="mui-index-section">
    <p class="mui-index-section-index">{{index}}</p>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'mui-index-section',
  props: {
    index: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$parent.sections.push(this)
  },
  beforeDestroy(){
    let index = this.$parent.sections.indexOf(this);
    if (index > -1) {
      this.$parent.sections.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-index-section {
  padding: 0;
  margin: 0;
  .mui-index-section-index {
    margin: 0;
    padding: 10px;
    // background-color: #fafafa;
    color: #333;
    text-align: left;
    font-size: 27px;
    & + ul {
      padding: 0;
    }
  }
}
</style>
