 
<template>
  <div class="mui-upload">
    <div class="mui-upload-content">
      <div class="mui-upload-list">
        <div class="mui-upload-item" v-for="(item,index) in list" :key="index">
          <svg-icon class="mui-upload-close" icon-class="img-close" @click="close(index)"></svg-icon>
          <img :src="item.url" />
        </div>
        <div class="mui-upload-add" v-show="maxStatus" @click="chooseType">
          <svg-icon class="mui-upload-add-image" icon-class="img-add"></svg-icon>
        </div>
      </div>
    </div>
    <input
      id="upload_file"
      type="file"
      class="file-input"
      accept="image/png,image/jpeg,image/jpg"
      :multiple="multiple"
      @change="inputChange"
      style="display: none"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import Indicator from '../../indicator';
import muiIndicator from '../../mui-indicator';

export default {
  name: 'mui-upload',
  data() {
    return {
      maxStatus: true
    };
  },
  props: {
    multiple: Boolean,
    max: Number,
    list: Array,
    onSuccess: Function
  },
  components: {},
  methods: {
    chooseType() {
      document.getElementById("upload_file").click();
    },
    close(index) {
      this.list.splice(index, 1);
      this.maxStatus = this.list == this.max ? false : true;
    },
    async inputChange(e) {
      let files = e.target.files;
      let len = this.list.length + files.length;
      if (len > this.max) {
        document.getElementById("upload_file").value = "";
        Toast(`最多允许上传${this.max}张`);
        return;
      }
       
      let uploadAll = [].slice.call(files ,0).map(this.upload);
      //使用object.values(files)，测试安卓存在兼容性问题，替换为[].slice.call(files ,0)
       
      // this.$ui.loading.open({//上传中效果，可自行替换。
      //   text: "上传中...",
      //   spinnerType: "fading-circle"
      // });
      let result = await Promise.all(uploadAll);
      document.getElementById("upload_file").value = "";
      // this.$ui.loading.close();
    },
    upload(file, index) {
      this.$emit('upload', file, index);
      debugger
    }
  }
};
</script>
 
 
 <style lang="scss" scoped>
.mui-upload-content {
  width: 100%;
  min-height: 76px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .mui-upload-list {
    width: 100%;
    min-height: 76px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 50px;
      height: 50px;
      margin: 10px 10px 10px 0;
      position: relative;
      background: #ccc;
      & > img {
        width: 100%;
        height: 100%;
      }
      .mui-upload-close {
        font-size: 0.39rem;
        position: absolute;
        top: 0;
        right: 0;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
.mui-upload-add-image {
  width: 50px;
  height: 50px;
}
</style>