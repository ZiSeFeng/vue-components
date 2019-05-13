<template>
  <div class="picture-cont" @click.stop="imgViewHide()" :class="showType == 2 ? 'picture-cont-vertical': ''">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in imgsData" :key="index">
        <a href="javascript:;" class="img-item">
          <load-img :imgUrl="item + imgSize" :index="index" :nowIndex="nowIndex"></load-img>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-show="imgsData.length > 1"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import LoadImg from "@/components/user/load-img";
export default {
  props: ['imgs', 'imgView', 'showType'],
  data() {
    return {
      windowWidth: window.screen.width,
      styleWidth: 'width:' + parseInt(window.screen.width * 0.9) + 'px',
      swiperOption: {
        autoplay: 3000,
        loop: false,
        width: document.body.clientWidth,
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          slideChangeTransitionEnd: () => {
            if (this.mySwiper) {
              this.nowIndex = this.mySwiper.activeIndex;
            }
          },
        }
      },
      nowIndex: 0,
      mySwiper: '',
      imgSize: '?imageView2/2/w/' + window.innerWidth * 3,
    };
  },
  created() {
    let key = this.imgs.key;
    this.swiperOption.initialSlide = this.imgs.key;
    this.nowIndex = this.imgs.key;
  },
  mounted() {
    this.mySwiper = this.swiper();
    this.nowIndex = this.mySwiper.activeIndex;
  },
  methods: {
    imgViewHide() {
      this.imgView();
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  computed: {
    'imgsData': {
      set() {
        this.imgs = this.imgs.images
      },
      get() {
        let imgArray = [];
        this.imgs.images.forEach((val) => {
          imgArray.push(val);
        });
        return imgArray;
      }
    },
  },
  components: {
    swiper,
    swiperSlide,
    LoadImg
  }
}
</script>
<style>
.picture-cont {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 1);
  z-index: 1000000000;
}
.picture-cont .swiper-container {
  height: 100%;
}
.picture-cont .swiper-slide {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
  /* display: table; */
}
.picture-cont .swiper-slide img {
  width: 100%;
   /* display: table-cell;
  vertical-align: middle; */
}
.picture-cont .img-item {
  /* display: table-cell;
  vertical-align: middle; */
  display: table;
  /* max-height: 100%; */
  /* display: block; */
  width: 100%;
  height: 100%;
}
.picture-cont .load-img {
  display: table-cell;
  vertical-align: middle;
}
.picture-cont .swiper-pagination-bullet {
  background: #4c4c4c;
}
.picture-cont .swiper-pagination-bullet-active {
  background: #fff;
}
.picture-cont-vertical .img-item {
  height: 100%;
}
.picture-cont-vertical .load-img {
  /* height: 100%; */
}
.picture-cont-vertical .swiper-slide img {
  /* width: auto;
  height: 100%; */
}
</style>