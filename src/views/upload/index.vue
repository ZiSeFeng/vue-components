<template>
  <div class="upload-page">
    <div class="upload-item" v-for="file in uploadFileList" :key="file.uid">
      <img class="upload-item-img" :src="file.url" />
      <i
        class="upload-item-close iconfont icon-cross"
        @click="handleRemove(file.uid)"
      ></i>
      <mui-progress
        class="upload-item-percent"
        :value="file.percent"
        v-show="file.percent != 100"
        >{{ file.percent }}</mui-progress
      >
      <span class="upload-item-name">{{ file.name }}</span>
      <!-- <span class="upload-item-size">{{file.size}}</span> -->
    </div>
    <div class="upload-add">
      <mui-upload
        ref="upload"
        :action="action"
        :max-size="1024 * 1024"
        :data="data"
        multiple
        :format="fileType"
        :on-timeout="uploadTimeout"
        :on-before="uploadBefore"
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-format-error="uploadFormatError"
        :on-exceed-size="onExceedSize"
      >
        <Button type="primary" class="upload-btn-add">
          <i class="iconfont icon-add"></i>
        </Button>
      </mui-upload>
    </div>
    <!-- <table class="table">
      <thead>
        <th style="width:30%;">文件名</th>
        <th style="width:10%;">文件大小</th>
        <th style="width:10%;">状态</th>
        <th style="width:30%;text-align:center;">操作</th>
      </thead>
      <tbody v-for="file in uploadFileList"
             :key="file.uid">
        <tr>
          <td>{{file.name}}</td>
          <td>{{file.size | formatSize}}</td>
          <td>{{file.percent}}-{{file.status}}</td>
          <td align="center">
            <Button type="error"
                    @click.stop="uploadCancel(file);">停止上传</Button>
            <Button type="warning"
                    @click.stop="uploadRestart(file);">重新上传</Button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      action: 'http://localhost:3000/dev-api/service/upload/img',
      // action: "http://zz-tf.com/dbcenter/pagerFile/saveCompanyPagerFiles",
      data: {
        token: '555',
        uname: '郜仕伟',
        pagerFileId: 'e37e4c37-4289-4bb9-aa42-903e48aef39e'
      },
      fileType: ['gif', 'png'], // 可以接受的文件类型
      uploadFileList: [] // 文件上传的列表
    };
  },
  filters: {
    /**
     * 转换文件的大小，并返回字符串
     */
    formatSize: function(bytes) {
      if (bytes === 0) return '0B';
      var k = 1024;
      var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 上传之前钩子
     */
    uploadBefore(file) {
      console.log('uploadBefore', file);
      // this.uploadFileList.push(file);
    },
    /**
     * 上传进度钩子
     */
    uploadProgress(file, fileList, speed, restime) {
      console.log(
        'uploadProgress',
        file,
        fileList,
        '上传速度：' + speed + ', 预计剩余：' + restime
      );
      this.uploadFileList = fileList;
      // this.uploadFileList.forEach(function(v, i) {
      //   if (v.uid == file.uid) {
      //     v.percent = file.percent;
      // 		v.status = file.status;
      //     return false;
      //   }
      // });
    },
    /**
     * 上传成功钩子
     */
    uploadSuccess(response, file, fileList) {
      console.log('uploadSuccess', response, file, fileList);
      // this.uploadFileList.forEach(function(v, i) {
      //   if (v.uid == file.uid) {
      //     v.percent = file.percent;
      // 		v.status = file.status;
      // 		v.url = file.url;
      //     return false;
      //   }
      // });
      this.$alert('已经上传成功');
    },
    /**
     * 上传请求超时
     */
    uploadTimeout(event, file) {
      console.log('uploadTimeout', event, file);
    },
    /**
     * 上传失败钩子
     */
    uploadError(response, file, fileList) {
      console.log('uploadError', file, fileList);
    },
    /**
     * 上传文件格式错误
     */
    uploadFormatError(file, fileList) {
      // let fileIndex = fileList.findIndex(el => el.uid === file.uid);
      // this.uploadFileList.splice(fileIndex, 1)
      console.log('uploadFormatError', file, fileList);
      this.$alert('格式错误');
    },
    /**
     * 上传文件大小不允许
     */
    onExceedSize(file, fileList) {
      // let fileIndex = fileList.findIndex(el => el.uid === file.uid);
      // this.uploadFileList.splice(fileIndex, 1)
      console.log('onExceedSize', file, fileList);
      this.$alert('文件大小超出');
    },
    /*
     * 删除文件
     */
    handleRemove(uid) {
      let index = this.uploadFileList.findIndex(el => el.uid === uid);
      this.uploadFileList.splice(index, 1);
    },
    /**
     * 上传取消
     */
    uploadCancel(file) {
      this.$refs.upload.onCancel(file);
    },
    /**
     * 重新上传
     */
    uploadRestart(file) {
      this.$refs.upload.onRestart(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 60%;
  border-collapse: collapse;
  margin: 0 auto;
  border: solid 1px #ddd;
  border-radius: 4px;
}

.table th {
  background: #eee;
  padding: 8px 12px;
  text-align: left;
}

.table tr td {
  padding: 5px;
}

.upload-item {
  width: 2.17rem;
  height: 2.5rem;
  margin-right: 18px;
  float: left;
  position: relative;
}
.upload-item-close {
  position: absolute;
  top: 0;
  right: 0;
}
.upload-item-img {
  width: 100%;
  height: 2.17rem;
}
.upload-add {
  width: 2.17rem;
  height: 2.17rem;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  .upload-btn-add {
    width: 100%;
    height: 100%;
    i {
      color: #c2c2c2;
      font-size: 34px;
    }
  }
}
</style>
