<template>
  <div class="detail-wrap">
    <div class="cont">
      <ul>
        <li class="clearfix" v-for="(val, key, i) in keyMap" :key="i">
          <span class="key fl">{{ val }}</span>
          <span
            class="val fr"
            v-if="key == 'status'"
            :style="{ color: data['status'] == 1 ? '#4ec94b' : '' }"
            >{{
              data['status'] == 1
                ? '处理中'
                : data['status'] == 2
                ? '已回复'
                : '已解决'
            }}</span
          >
          <img-box
            :data="data[key]"
            class="fl"
            v-else-if="key == 'images'"
          ></img-box>
          <span class="val fr" v-else>{{ data[key] }}</span>
        </li>
      </ul>
    </div>
    <div class="reply clearfix" v-if="data.reply && data.reply.length">
      <div class="item" v-for="(item, index) in data.reply" :key="index">
        <h4>{{ item.type == 1 ? '客服回复' : nickName + ' 追加提问' }}</h4>
        <time>{{ formats(item.time) }}</time>
        <p>{{ item.content }}</p>
        <img-box
          :data="item['images']"
          class=""
          v-if="item['images'].length"
        ></img-box>
      </div>
      <a class="add-question fr" @click="goQuestion()">追加提问</a>
    </div>
    <rate :num="data.rate" :status="data.is_rate" v-if="data['status'] == 3"></rate>
  </div>
</template>

<script>
import moment from 'moment';
import imgBox from '@/components/user/imgBox';
import rate from '@/components/user/rate';
export default {
  components: {
    imgBox,
    rate
  },
  data() {
    return {
      nickName: 'zyt',
      empty: false,
      keyMap: {
        product_name: '产品名称',
        question_type: '问题类型',
        name: '角色名',
        system: '设备系统',
        about_time: '相关时间',
        pay_type: '充值方式',
        pay_num: '充值金额',
        content: '问题内容',
        images: '截图',
        status: '处理状态',
        create_time: '创建时间'
      },
      dataList: [
        {
          id: 1,
          product_name: '魔界塔',
          question_type: '充值异常问题',
          name: 'verander',
          system: 'IOS',
          about_time: 1557049332,
          pay_type: '支付宝',
          pay_num: '10000',
          content:
            '充值完了之后，在游戏里面余额还是一样没有变化，重新登录了也没有刷新，充值无法到账。',
          images: [
            'http://uploads.qyy.com/data/bi/20190305/5c7e1fe1de4ea.png',
            'http://192.168.13.74/web/gamePic/recommend2.jpg',
            'http://192.168.13.74/web/gamePic/3cb37eca20fc1d1d02d5b649dc250a2a.jpg',
            'http://192.168.13.74/web/gamePic/img4.jpg',
            'http://192.168.13.74/web/gamePic/logo-j.png'
          ],
          status: 1,
          create_time: 1557049332
        },
        {
          id: 2,
          product_name: '灵妖记',
          question_type: '充值异常问题',
          name: 'separate',
          system: 'Android',
          about_time: 1557049332,
          pay_type: '微信支付',
          pay_num: '2000',
          content:
            '充值完了之后，在游戏里面余额还是一样没有变化，重新登录了也没有刷新，充值无法到账。',
          images: [
            'http://uploads.qyy.com/data/bi/20190305/5c7e1fe1de4ea.png',
            'http://192.168.13.74/web/gamePic/recommend2.jpg',
            'http://192.168.13.74/web/gamePic/3cb37eca20fc1d1d02d5b649dc250a2a.jpg',
            'http://192.168.13.74/web/gamePic/img4.jpg',
            'http://192.168.13.74/web/gamePic/logo-j.png'
          ],
          status: 2,
          create_time: 1557049332,
          reply: [
            {
              type: 1,
              time: 1557069332,
              content:
                '尊敬的用户您好，由于充值系统升级，导致充值后余额未及时增加，该问题已解决，请重新登录游戏后查看，感谢您的支持！',
              images: []
            },
            {
              type: 2,
              time: 1557079332,
              content: '重新登录后，还是没有看到！',
              images: [
                'http://uploads.qyy.com/data/bi/20190305/5c7e1fe1de4ea.png',
                'http://192.168.13.74/web/gamePic/recommend2.jpg',
                'http://192.168.13.74/web/gamePic/3cb37eca20fc1d1d02d5b649dc250a2a.jpg',
                'http://192.168.13.74/web/gamePic/img4.jpg'
              ]
            },
            {
              type: 1,
              time: 1557082332,
              content:
                '尊敬的用户您好，由于充值系统升级故障，已退回你的充值金额，请重新进行充值，很抱歉造成您的不便！',
              images: []
            }
          ],
          is_rate: 0,
          rate: 0
        },
        {
          id: 3,
          product_name: '保卫萝卜',
          question_type: '登录异常',
          name: 'separate',
          system: 'Android',
          about_time: 1557049332,
          pay_type: '微信支付',
          pay_num: '2000',
          content:
            '充值完了之后，在游戏里面余额还是一样没有变化，重新登录了也没有刷新，充值无法到账。',
          images: [
            'http://uploads.qyy.com/data/bi/20190305/5c7e1fe1de4ea.png',
            'http://192.168.13.74/web/gamePic/recommend2.jpg',
            'http://192.168.13.74/web/gamePic/3cb37eca20fc1d1d02d5b649dc250a2a.jpg',
            'http://192.168.13.74/web/gamePic/img4.jpg',
            'http://192.168.13.74/web/gamePic/logo-j.png'
          ],
          status: 3,
          create_time: 1557049332,
          reply: [
            {
              type: 1,
              time: 1557069332,
              content:
                '尊敬的用户您好，由于充值系统升级，导致充值后余额未及时增加，该问题已解决，请重新登录游戏后查看，感谢您的支持！',
              images: []
            },
            {
              type: 2,
              time: 1557079332,
              content: '重新登录后，还是没有看到！',
              images: [
                'http://uploads.qyy.com/data/bi/20190305/5c7e1fe1de4ea.png',
                'http://192.168.13.74/web/gamePic/recommend2.jpg',
                'http://192.168.13.74/web/gamePic/3cb37eca20fc1d1d02d5b649dc250a2a.jpg',
                'http://192.168.13.74/web/gamePic/img4.jpg'
              ]
            },
            {
              type: 1,
              time: 1557082332,
              content:
                '尊敬的用户您好，由于充值系统升级故障，已退回你的充值金额，请重新进行充值，很抱歉造成您的不便！',
              images: []
            }
          ],
          is_rate: 1,
          rate: 5
        }
      ],
      data: ''
    };
  },
  methods: {
    formats(val) {
      let time = moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
      return time;
    },
    getData() {
      let id = this.$route.params.id;
      let val = this.dataList.find(v => v.id == id);
      val['about_time'] = moment(val['about_time'] * 1000).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      val['create_time'] = moment(val['create_time'] * 1000).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      this.data = val;
      console.log(this.data);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
@import '../../styles/index';
.detail-wrap {
  min-height: 100%;
  width: 100%;
  color: $gray3;
  text-align: left;
  background: #f9f9f9;
  padding-top: 16px;
  .cont {
    background: url('../../assets/images/detail-bg.png') bottom center no-repeat;
    background-size: 100% 100%;
    padding: 10px 30px 30px;
    li {
      min-height: 60px;
      font-size: 24px;
      padding: 12px 0;
      line-height: 36px;
    }
    .bt {
      border-top: 1px solid $borderGray;
    }
    .key {
      color: #999999;
    }
    .val {
      max-width: calc(100% - 140px);
    }
  }
  .reply {
    background: #fff;
    margin: 20px 0;
    padding: 0px 30px 24px;
    .item {
      border-top: 1px solid $borderGray;
      padding: 20px 0 20px;
      h4 {
        font-size: 24px;
        line-height: 30px;
        margin: 0;
      }
      time {
        font-size: 20px;
        color: #999999;
        margin: 10px 0 16px;
        display: block;
      }
      p {
        font-size: 24px;
        line-height: 36px;
        margin: 0;
      }
      &:first-child {
        border-top: 0;
      }
    }
  }
  .add-question {
    width: 133px;
    height: 32px;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    background-image: linear-gradient(90deg, #ff5074 0%, #e8474a 100%),
      linear-gradient(#e9484d, #e9484d);
    background-blend-mode: normal, normal;
    box-shadow: 0px 5px 10px 0px rgba(232, 71, 74, 0.2);
    border-radius: 16px;
  }
}
</style>
