<template>
  <div class="service-change-page">
    <mui-navbar
      class="service-change-title"
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :leftWidth="leftWidth"
    />
    <div class="service-change-content">
      <mui-navbar
        titleColor="#333"
        text="选择产品"
        rightIcon="right-arrow"
        @hanldeClick="hanldeClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleColor: '#000',
      textValue: '飞鱼客服',
      leftIcon: 'back',
      leftWidth: 32,
      isDevice: 1,
    };
  },
  methods: {
    hanldeClick(){
      alert('product')
    }
  },
}
</script>
