<template>
  <div class="rate-wrap" @touchmove.stop>
    <div class="edit-rate-item clearfix">
      <h3>服务评价</h3>
      <div class="game-rate fl">
        <span :class="setRateClass(key)" @click="setRate(key)" class="star"  v-for="(val,key,i) in rate_name_list" :key="i"></span>
      </div>
      <p class="rate-msg fr">{{rate_name}}</p>
      <div class="satisfaction" v-if="rate <= 6 && rate >0 && !isRate">
        <h4>满意度补充调查：</h4>
        <p @click="satisfaction = 1"><span :class="satisfaction == 1 ? 'active':''"></span>结果满意，服务不满意</p>
        <p @click="satisfaction = 2"><span :class="satisfaction == 2 ? 'active':''"></span>结果不满意，服务满意</p>
        <p @click="satisfaction = 3"><span :class="satisfaction == 3 ? 'active':''"></span>结果不满意，服务不满意</p>
      </div>
    </div>
    <p class="heart" v-if="isRate">感谢您的评价</p>
    <a class="user-submit-btn submit" v-else @click="submit">提交评价</a>
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
        2: '非常不满意',
        4: '不满意',
        6: '一般',
        8: '满意',
        10: '非常满意'
      },
      satisfaction: 0
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
    status() {
      this.getData()
    }
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
  .satisfaction {
    width: 100%;
    clear: both;
    h4 {
      padding: 16px 0 10px;
      font-size: 20px;
    }
    p {
      height: 34px;
      line-height: 36px;
    }
    span {
      float: left;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #999;
      margin:7px 8px 0 0; 
    }
    .active {
      background: url('../../assets/images/check.png') center no-repeat;
      background-size: 20px auto;
      border: 1px solid #E74550;
    }
  }
}
</style>

