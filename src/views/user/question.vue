<template>
  <div class="quesiton-wrap">
    <div class="cont">
      <textarea v-model="content" class="edit-textarea" id="textarea" ref="textarea" placeholder="请输入问题内容"></textarea>
      <div class="img">
        <div class="item"></div>
      </div>
      <a class="user-submit-btn" @click="submit()">确定</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      content: '',
    };
  },
  methods: {
    formats(val) {
      let time = moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
      return time;
    },
    submit(val) {
      let id = this.$route.params.id;
      this.$router.push({ path: `/user/detail/${id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.quesiton-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 30px;
  textarea {
    width: 567px;
    height: 360px;
    background-color: #f9f9f9;
    border-radius: 15px;
    border: 0;
    padding: 20px;
    color: #333;
    font-size: 24px;
  }
  .img {
    width: 100%;
    font-size: 0;
    text-align: left;
    margin-top: 20px;
    .item {
      background: #F0F0F0;
      width: 24%;
      padding-top: 24%;
      display: inline-block;
    }
  }
}
</style>
