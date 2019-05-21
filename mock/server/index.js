const Mock = require('mockjs');
const server = [
  {
    label: '选择产品',
    data: '英雄就是我',
    value: 'product'
  },
  {
    label: '问题类型',
    data: '充值异常问题',
    value: 'problem'
  },
  {
    label: '角色名',
    data: 'lenboor',
    value: 'role'
  },
  {
    label: '设备系统',
    data: 'iOS',
    value: 'device'
  },
  {
    label: '相关事件',
    data: '2018-12-18',
    value: 'date'
  },
  {
    label: '充值方式',
    data: '商城充值，活动充值',
    value: 'recharge'
  },
  {
    label: '充值金额',
    data: '1000',
    value: 'amount'
  },
  {
    label: '问题内容',
    data: '充值完了之后，在游戏里面余额',
    value: 'problem-content'
  }
];

const img = Mock.mock({
  'list|0-6': [
    {
      url: '@image'
    }
  ]
});

module.exports = {
  server,
  img
};
