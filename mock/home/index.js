const Mock = require('mockjs');
const server = Mock.mock({
  'list|3-10': [
    {
      'title|+1': '@ctitle(7, 50)'
    }
  ]
});

const game = Mock.mock({
  'list|3-20': [
    {
      'title|+1': '@ctitle(2, 20)',
      img: '@image(180x180)',
      'imgTitle|+1': '@ctitle'
    }
  ]
});

const record = Mock.mock({
  'list|3-20': [
    {
      'title|+1': '@ctitle(2, 20)',
      date: '@date',
      status: '@integer(0, 3)',
      'readed|1': true
    }
  ]
});

module.exports = {
  server,
  game,
  record
};
