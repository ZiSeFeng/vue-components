// server.js
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();

app.use(cors());
/* 用户信息 */
const userInfoData = require('./user/info.js');
router.get('/dev-api/user/info', function(ctx) {
  let res = {
    code: 0,
    msg: '成功',
    data: {}
  };
  res.data = userInfoData;
  // todo...
  ctx.body = res;
});

/*home 服务记录*/
const serverList = require('./home/index.js');
router.get('/dev-api/home/list', function(ctx) {
  let res = {
    code: 0,
    msg: '成功'
  };
  res.data = serverList;
  ctx.body = res;
});

/*accountProblem 更多账号问题*/
const accountProblemList = require('./account/index.js');
router.get('/dev-api/account/problem/list', function(ctx) {
  let res = {
    code: 0,
    msg: '成功'
  };
  res.data = accountProblemList;
  ctx.body = res;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('server is running at http://localhost:3000/');
