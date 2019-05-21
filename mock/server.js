// server.js
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const fs = require('fs');
const KoaBody = require('koa-body');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(cors());

function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

function getUploadDirName() {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}

function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

function getUploadFileName(ext) {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}

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
    code: 1000,
    msg: '成功'
  };
  res.data = serverList;
  ctx.body = res;
});

/*飞鱼客服*/
const serverChange = require('./server/index.js');
router.get('/dev-api/server/change/list', function(ctx) {
  let res = {
    code: 1000,
    msg: '成功'
  };
  res.data = serverChange;
  ctx.body = res;
});

/*图片上传*/
router.post('/dev-api/service/upload', async ctx => {
  const files = ctx.request.files; //获取上传文件
  for (const key in files) {
    const file = files[key];
    const NE = file.name.split('.');
    const reader = fs.createReadStream(file.path); //创建可读流
    const ext = NE.pop(); //获取上传文件扩展名
    const name = NE[0];
    const upStream = fs.createWriteStream(
      `upload/${name + new Date().getTime()}.${ext}`
    ); //创建可写流
    reader.pipe(upStream); //可读流通过管道写入可写流
  }
  return (ctx.body = '上传成功');
});

router.post(
  '/dev-api/service/upload/img',
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/upload'),
      keepExtensions: true,
      maxFieldsSize: 2 * 1024 * 1024,
      onFileBegin: (name, file) => {
        // console.log(file);
        // 获取文件后缀
        const ext = getUploadFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dirName = getUploadDirName();
        const dir = path.join(__dirname, `/upload/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        checkDirExist(dir);
        // 获取文件名称
        const fileName = getUploadFileName(ext);
        // 重新覆盖 file.path 属性
        file.path = `${dir}/${fileName}`;
        app.context.uploadpath = app.context.uploadpath
          ? app.context.uploadpath
          : {};
        // app.context.uploadpath[name] = `${dirName}/${fileName}`;
        app.context.uploadpath[name] = `/images/${fileName}`;
      }
    }
  }),
  ctx => {
    // console.log(ctx.uploadpath);
    ctx.body = JSON.stringify(ctx.request.files);
    // console.log(ctx.body, ctx.body.file, 'body123');
    ctx.response.body = {
      code: 1000,
      msg: '图片上传成功',
      data: {
        url: ctx.uploadpath
      }
    };
    return ctx.response.body;
  }
);

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('server is running at http://localhost:3000/');
