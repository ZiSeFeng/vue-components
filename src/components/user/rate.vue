<template>
  <div class="rate-wrap" @touchmove.stop>
    <div class="edit-rate-item clearfix">
      <h3>服务评价</h3>
      <div class="game-rate fl">
        <span :class="setRateClass(key)" @click="setRate(key)" class="star"  v-for="(val,key,i) in rate_name_list" :key="i"></span>
      </div>
      <p class="rate-msg fr">{{rate_name}}</p>
    </div>
    <p class="heart" v-if="isRate">感谢您的评价</p>
    <a class="submit" v-else @click="submit">提交评价</a>
  </div>
</template>
<script>
export default {
  props: ['num', 'status'],
  data () {
    return {
      isRate: false,
      rate: 0,
      beauty_name: '',
      rate_name: '',
      rate_name_list: {
        2: '不好玩',
        4: '还不错',
        6: '有点意思',
        8: '真好玩',
        10: '强烈推荐'
      }
    }
  },
  methods: {
    submit() {
      this.isRate = true;
    },
    setRate(val,type) {
      if (this.isRate) return;
      this.rate = val;
      this.rate_name = this.rate_name_list[val];
    },
    setRateClass(val) {
      let name = '';
      if (Number(val) == this.rate) {
        name = 'active clickActive'
      } else if (Number(val) < this.rate) {
        name = 'active'
      } else {
        name = ''
      }
      return name;
    },
    getData() {
      this.isRate = this.status == 1 ? true : false;
      this.rate = this.num;
    }
  },
  mounted() {
    this.getData()
  },
  watch: { 
  }
}
</script>
<style lang="scss" scoped>
.rate-wrap {
  background: #fff;
  padding: 20px 30px;
  color: #333;
  h3 {
    margin: 0 0 20px;
    font-size: 26px;
  }
  .star {
    width: 38px;
    height: 38px;
    margin: 0 34px 0 0;
    display: inline-block;
    background: url('../../assets/images/star2.png') center no-repeat;
    background-size: 100% auto;
    &:last-child {
      margin: 0;
    }
  }
  .active {
    background: url('../../assets/images/star1.png') center no-repeat;
    background-size: auto 100%;
  }
  @keyframes rateMove {
    0% {
      transform:scale(1)
    }
    50% {
      transform:scale(1.2)
    }
    100% {
      transform:scale(1)
    }
  }
  .clickActive {
    animation: rateMove 0.8s ease;
  }
  .rate-msg {
    font-size: 24px;
    margin: 0;
    line-height: 38px;
  }
  .submit {
    display: block;
    margin: 50px auto 20px;
    width: 375px;
    height: 66px;
    line-height: 66px;
    font-size: 26px;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(90deg, 
      #ff5074 0%, 
      #e8474a 100%), 
    linear-gradient(
      #e9484d, 
      #e9484d);
    background-blend-mode: normal,normal;
    box-shadow: 0px 5px 10px 0px rgba(232, 71, 74, 0.2);
    border-radius: 33px;
  }
  .heart {
    width: 150px;
    margin: 20px auto 10px;
    padding-top: 80px;
    text-align: center;
    background: url('../../assets/images/heart.png') top center no-repeat;
    background-size: 66px auto;
    font-size: 24px;
    color: #999;
  }
}
</style>

