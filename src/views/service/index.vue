<template>
  <div class="service-page">
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :leftWidth="leftWidth"
    />
    <div class="service-container">
      <mui-cell
        v-for="(item, index) in serviceData"
        :title="item.label"
        :key="index"
        isLink="'right-arrow'"
        :value="item.data"
        @clickEvent="handleClick(item.value)"
      />
      <div class="service-upload">
        <p class="service-uplod-title">请上传充值截图</p>  
        <mui-upload
          :multiple="true"
          :max="max"
          :list="imgList"
          ref="upload"
          @upload="upload"
          @onSuccess="onSuccess"
        />
      </div>
      <Buttom :text="'提交'" @submit="handleSubmit"/>
    </div>
    <van-datetime-picker
      v-if="isDate"
      v-model="currentDate"
      type="date"
      :item-height="90"
      class="date-picker"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { DatetimePicker } from 'vant';
import Buttom from '../../components/buttom/index';
import { getUploadData, uploadImg, getListData } from '../../api/service';
import muiIndicator from '../../../packages/mui-indicator';

Vue.use(DatetimePicker);

export default {
  data() {
    return {
      titleColor: '#000',
      textValue: '飞鱼客服',
      leftIcon: 'back',
      leftWidth: 32,
      searchInput: '',
      serviceData: [],
      imgList: [],
      zipTo: 1024, // KB
      max: 6,
      currentDate: '',
      minDate: '',
      isDate: false
    };
  },
  components: {
    Buttom,
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){
      getListData().then(res => {
        this.serviceData = res.data.server;
        this.imgList = res.data.img.list;
      })
    },
    pickPic(rest){ /*选择照片成功后回调函数*/
      setTimeout(function(){
        Indicator.close();
      },200)
      let that = this;
      let fickedFile = rest.file; // 选中的文件对象
      rest && that.imgList.push(rest.path)
      console.log(rest);
      //... 上传图片逻辑
    },
    deletePic(rest) {
      let that = this;
      let index = that.imgList.indexOf(rest);
      that.imgList.splice(rest, 1)
    },
    upload(file, index) {
      let formData = new FormData();
      formData.append('file', file);
      console.log(formData.get("file"));

      uploadImg(formData).then(res => {
        if (res.data.code === 1000) {
          let imgUrl = `.${res.data.data.url.file}`;
          this.imgList.push({
            url: imgUrl
          });
          this.$forceUpdate();
          this.getList();
        }
      });
    },
    onSuccess(){
      let maxStatus;
      if (this.imgList.length ===  this.max) {
        maxStatus = false;
      } else {
        maxStatus = true;
      }
      alert('parent sucess!');
      console.log(this.imgList, '1111')
    },
    handleSubmit() {
      // alert('parent')
    },
    handleClick(type) {
      if (type === 'date') {
        this.isDate = !this.isDate;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/skin.scss';

.service-title {
  color: $black;
  text-align: center;
}
</style>
