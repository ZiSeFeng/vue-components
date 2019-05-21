const Mock = require('mockjs');

const list = Mock.mock({
  'list|3-20': [
    {
      'title|+1': '@ctitle(2, 20)',
      date: '@date',
      status: '@integer(0, 3)',
      src:'http://uploads.qyy.com/data/bi/20190305/5c7e21715204d.png'
    }
  ]
});

module.exports = list
