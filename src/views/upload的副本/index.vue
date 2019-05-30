<template>
  <div class="content">
    <label for="my-upload">
      <span>上传</span>
    </label>
    <mui-upload
      ref="myUpload"
      :file-list="fileList"
      action="http://localhost:3000/dev-api/service/upload/img"
      :size="1000"
      :data="param"
      :multiple="true"
      :limit="6"
      :on-change="onChange"
      :on-progress="uploadProgress"
      :on-success="uploadFinish"
      :on-error="uploadError"
      :on-finished="onFinished"
    >
    </mui-upload>
    <button @click="upload" class="btn btn-xs btn-primary">Upload</button>
    <div class="data-show">
      <div v-for="file in fileList" :key="file.fileId">
        <img :src="file.url" />
        <span>{{ file.name }}</span>
        <span class="progress-span" v-if="file.percentage !== null"
          >{{ file.percentage }}%</span
        >
        <mui-progress :value="file.percentage" />
        <i @click="removeFile(file.fileId)" class="iconfont icon-cross"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      fileList: [],
      param: { param1: '', param2: '' }
    };
  },
  methods: {
    onChange(fileList) {
      this.fileList = [...fileList];
      console.log(fileList);
    },
    uploadFinish(index, response) {
      console.log(index, response);
    },
    upload() {
      this.$refs.myUpload.submit();
    },
    removeFile(index) {
      console.log(index, 'index remove');
      this.$refs.myUpload.remove(index);
    },
    uploadProgress(progress, fileId) {
      // console.log(progress,fileId, 'index progress asdf')
      const { percentage, status } = progress;
      const fileList = [...this.fileList];
      // fileList[index].percentage = percentage.toFixed(2);
      fileList.filter(item => item.fileId === fileId);
      this.fileList = [...fileList];
    },
    uploadError(index, err) {
      console.log(index, err);
    },
    onFinished(result, fileId) {
      //result: { success, failed }
      console.log(result, fileId, 'index sucess');
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: linear-gradient(to bottom, #f4f4f4, #fff);
  background: -moz-linear-gradient(to bottom, #f4f4f4, #fff);
  background: -o-linear-gradient(to bottom, #f4f4f4, #fff);
}
.data-show {
  overflow: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  div {
    width: 4rem;
    height: 4rem;
    margin: 0.5rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      // position: absolute;
      // color: #fff;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%,-50%);
    }
    i {
      position: absolute;
      top: 0;
      right: 0;
      font-style: normal;
    }
  }
}
</style>
