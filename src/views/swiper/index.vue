<template>
  <mui-swiper
    :height="950"
    :swiperList="swiperList"
    :pagination="pagination"
    :auto="false"
  >
  </mui-swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        {
          title: '魔界塔官网',
          img:
            'http://pms-1251262620.cosgz.myqcloud.com/807c1aa485b61dd3fc8b27b3c5f1ba13.jpeg',
          url: '#'
        },
        {
          title: '兽化三国',
          img:
            'http://pms-1251262620.cosgz.myqcloud.com/493ce3a87308da2ba18ad935bf1090c4.jpeg',
          url: '#'
        },
        {
          title: '咔叽探险队',
          img:
            'http://pms-1251262620.cosgz.myqcloud.com/c9c9edc0409d76dfe105e8a605b1d3f9.jpeg',
          url: '#'
        }
      ],
      pagination: ['icon-left-circle', 'icon-right-circle']
    };
  }
};
</script>

<style lang="scss" scoped></style>
