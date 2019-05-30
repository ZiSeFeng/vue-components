<template>
  <div :class="uploadClass"
       @click="handleClick"
       @drop.prevent="onDrop"
       @dragover.prevent="dragOver = true"
       @dragleave.prevent="dragOver = false">
    <input ref="fileInput"
           type="file"
           style="display:none;"
           :class="[prefixClass + '-input']"
           @change="handleChange"
           :name="name"
           :multiple="multiple"
           :accept="accept">
    <slot></slot>
  </div>
</template>
<script>
import ajax from './ajax';

const prefixClass = "mui-upload";

export default {
  name: "mui-upload",
  data() {
    return {
      prefixClass: prefixClass,
      dragOver: false,
      fileList: [], // 上传的文件队列
      uploadPool: [], // 上传文件对象池，做取消和暂停用
      fileIndex: 1 // 多个文件选择，有先后顺序
    };
  },
  props: {
    // 名称
    name: {
      type: String,
      default: "file"
    },
    // 文件上传的请求头部
    headers: {
      type: Object
    },
    // 文件上传附带参数
    data: {
      type: Object
    },
    // 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
    type: {
      type: String,
      default: "select"
    },
    // 文件上传的地址
    action: {
      type: String
    },
    // 是否可以多文件选择
    multiple: {
      type: Boolean,
      default: false
    },
    // 可以接受的文件格式
    accept: {
      type: String
    },
    // 上传超时时间，默认0，不限时
    timeout: {
      type: Number,
      default: 0
    },
    // 最大文件大小，字节KB
    maxSize: {
      type: Number
    },
    // 上传文件个数，默认10个
    uploadSize: {
      type: Number,
      default: 10
    },
    withCredentials: Boolean,
    // 可接受的文件后缀名
    format: {
      type: Array,
      default() {
        return [];
      }
    },
    // 上传之前钩子
    onBefore: {
      type: Function,
      default() {
        return true;
      }
    },
    // 上传进度钩子
    onProgress: {
      type: Function,
      default() {
        return {};
      }
    },
    // 上传成功钩子
    onSuccess: {
      type: Function,
      default() {
        return {};
      }
    },
    // 上传失败钩子
    onError: {
      type: Function,
      default() {
        return {};
      }
    },
    // 上传文件格式错误
    onFormatError: {
      type: Function,
      default() {
        return {};
      }
    },
    // 上传文件大小超过限制
    onExceedSize: {
      type: Function,
      default() {
        return {};
      }
    },
    // 上传请求超时
    onTimeout: {
      type: Function,
      default() {
        return {};
      }
    },
    // 默认覆盖上传行为，自定义上传
    httpRequest: {
      type: Function,
      default: ajax
    }
  },
  components: {},
  created() {},
  mounted() {},
  computed: {
    uploadClass() {
      return prefixClass;
    }
  },
  methods: {
    /**
     * 点击按钮选择文件
     */
    handleClick() {
      this.$refs.fileInput.click();
    },
    /**
     * 选择文件
     */
    handleChange(e) {
      let files = e.target.files;
      if (!files) return;

      // 文件列表
      let uploadList = Array.prototype.slice.call(files);
      // 判断上传文件的个数
      if (uploadList.length > this.uploadSize) {
        this.$Message.warning("最多上传" + this.uploadSize + "个文件！");
        return;
      }
      if (!this.multiple) uploadList = uploadList.slice(0, 1);
      if (uploadList.length === 0) return;
      uploadList.forEach(file => {
        this.handleBeforeUpload(file);
      });
      this.$refs.fileInput.value = null;
    },
    /**
     * 上传文件之前钩子
     */
    handleBeforeUpload(file) {
      this.$refs.fileInput.value = null;

      // 选择文件上传之前设置文件的基本信息
      file.uid = Date.now() + this.fileIndex++;
      file.status = "waiting";
      file.percent = 0;
      file.url = URL.createObjectURL(file),

      // 将上传的文件存入到文件列表
      this.fileList.push(file);

      // onBefore钩子返回false，则停止上传
      if (!this.onBefore) {
        return this.handleValidate(file);
      }
      // 赋值一份file返回到before
      let _file = {
        uid: file.uid,
        name: file.name,
        percent: 0,
        status: file.status,
        size: file.size,
        url: URL.createObjectURL(file),
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate
      };

      const before = this.onBefore(_file);
      if (before && before.then) {
        before.then(processedFile => {
          if (
            Object.prototype.toString.call(processedFile) === "[object File]"
          ) {
            this.handleValidate(processedFile);
          } else {
            this.handleValidate(file);
          }
        });
      } else if (before !== false) {
        this.handleValidate(file);
      }
    },
    /**
     * 上传的文件校验
     */
    handleValidate(file) {
      var flag = true;
      // 上传验证大小

      if (this.maxSize) {
        if (file.size > this.maxSize) {
          flag = false;
          this.onExceedSize(file, this.fileList);
          this.handleRemove(file.uid);
          console.log(this.uploadPool, this.fileList, 'on exceed size')
          return false;
        }
      }
      // 上传验证格式
      if (this.format.length) {
        console.log('asfdasdf')
        const fileFormat = file.name
          .split(".")
          .pop()
          .toLocaleLowerCase();
        const checked = this.format.some(
          item => item.toLocaleLowerCase() == fileFormat
        );
        if (!checked) {
          flag = false;
          this.onFormatError(file, this.fileList);
          this.handleRemove(file.uid);
          console.log(this.uploadPool, this.fileList, 'on format error')
          return false;
        }
      }
      // 验证文件通过，开始上传文件
      if (flag) {
        this.handlePost(file);
        // this.post(file)
      }
    },
    /*
    *
    */
    post(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    /**
     * 上传文件请求
     */
    handlePost(file) {
      let that = this;
      let formData = new FormData();
      let xmlHttp = new XMLHttpRequest();
      var ot; //上传开始时间
      var oloaded; // 已经上传的文件大小

      // 将上传对象放到上传队列池里
      this.uploadPool.push({
        uid: file.uid,
        formData: formData,
        xmlHttp: xmlHttp
      });

      // 验证通过，可以上传
      formData.append(this.name, file);

      //判断附带参数不为空
      if (this.data) {
        Object.keys(this.data).map(key => {
          formData.append(key, this.data[key]);
        });
      }
      if (typeof XMLHttpRequest == "undefined") return;
      if (xmlHttp) {
        // 设置请求头
        if (this.headers) {
          Object.keys(this.headers).map(key => {
            xmlHttp.setRequestHeader(key, this.headers[key]);
          });
        }
        // 设置请求超时时间
        xmlHttp.timeout = this.timeout;
        // 初始化上传请求
        xmlHttp.open("post", this.action, true);

        // 获得上传信息
        if (xmlHttp) {
          // 上传开始
          xmlHttp.loadstart = function(e) {
            file.status = "starting";
            file.percent = 0;
            // 计算上传剩余时间
            ot = new Date().getTime(); //设置上传开始时间
            oloaded = 0; //设置上传开始时，以上传的文件大小为0
          };
          // 请求超时处理
          xmlHttp.ontimeout = function(e) {
            that.onTimeout(e, file);
          };
          // 上传进度
          xmlHttp.upload.onprogress = function(e) {
            console.log(e);
            file.status = "uploading";
            if (e.total > 0) {
              file.percent = (e.loaded / e.total) * 100;
            }

            // 计算上传剩余时间
            let nt = new Date().getTime(); //获取当前时间
            let pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            let perload = e.loaded - oloaded; //计算该分段上传的文件大小，单位b
            oloaded = e.loaded; //重新赋值已上传文件大小，用以下次计算
            //上传速度计算
            let speed = perload / pertime; //单位b/s
            let bspeed = speed;
            let units = "b/s"; //单位名称
            if (speed / 1024 > 1) {
              speed = speed / 1024;
              units = "k/s";
            }
            if (speed / 1024 > 1) {
              speed = speed / 1024;
              units = "m/s";
            }
            speed = speed.toFixed(1);
            //剩余时间
            let resttime = ((e.total - e.loaded) / bspeed).toFixed(1);
            if (isNaN(speed)) {
              speed = 0;
            }
            if (isNaN(resttime)) {
              resttime = 0;
            }
            // 调用进度方法
            that.onProgress(
              file,
              that.fileList,
              speed + units,
              resttime + "秒"
            );
          };
          // 上传成功
          xmlHttp.onload = function(e) {
            console.log(xmlHttp);
            if (this.status === 200 && this.readyState === 4) {
              // 上传成功，设置成功的信息
              file.status = "finished";
              file.percent = 100;
              that.onSuccess(
                JSON.parse(this.responseText),
                file,
                that.fileList
              );
            }
          };
          // 上传失败
          xmlHttp.onerror = function(e) {
            console.log("上传失败", this.responseText);
            file.percent = 100;
            file.status = "error";
            that.onError(JSON.parse(xmlHttp.responseText), file);
          };
        }
        // 发送数据
        xmlHttp.send(formData);
      }
    },
    /**
     * 重新开始上传
     */
    onRestart(file) {
      var that = this;
      this.uploadPool.forEach(function(v, i) {
        if (v.uid == file.uid) {
          if (v.xmlHttp) {
            v.xmlHttp.open("post", that.action, true);
            v.xmlHttp.send(v.formData);
          }
        }
      });
    },
    /**
     * 暂停上传
     */
    onPause(file) {},
    /**
     * 继续上传
     */
    onContinue(file) {
      var that = this;
      this.uploadPool.forEach(function(v, i) {
        if (v.uid == file.uid) {
          if (v.xmlHttp) {
            v.xmlHttp.open("post", that.action, true);
            v.xmlHttp.send(v.formData);
          }
        }
      });
    },
    /**
     * 取消上传
     */
    onCancel(file) {
      console.log("onCancel", file);
      this.uploadPool.forEach(function(v, i) {
        if (v.uid == file.uid) {
          v.xmlHttp && v.xmlHttp.abort();
        }
      });
    },
    handleRemove(uid) {
      let fileIndex = this.fileList.findIndex(el => el.uid === uid);
      if (fileIndex < 0) {
        return;
      }
      this.fileList.splice(fileIndex, 1);
    }
  }
};
</script>

<style scoped>
.mui-upload {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
