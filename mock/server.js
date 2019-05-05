// server.js
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();

app.use(cors());
const userInfoData = require('../mock/user/info.js');

router.get('/dev-api/user/info', function(ctx) {
  let res = {
    errno: 0,
    data: {}
  };
  res.data = userInfoData;
  // todo...
  ctx.body = res;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('server is running at http://localhost:3000/');
