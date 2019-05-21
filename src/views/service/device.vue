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
        v-for="(item, index) in deviceData"
        :text="item.label"
        :key="index"
        :rightIcon="item.value === isDevice ? 'red-ok':''"
        @hanldeClick="hanldeClick(index+1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleColor: '#000',
      textValue: '设备系统',
      leftIcon: 'back',
      leftWidth: 32,
      isDevice: 1,
      rightIcon: 'red-ok',
      deviceData: [
        {
          label: 'iOS',
          value: 1
        },
        {
          label: 'Androidd',
          value: 2
        }
      ]
    };
  },
  methods: {
    hanldeClick(type){
      switch (type) {
        case 1:
          this.isDevice = 1;
          break;
        case 2:
          this.isDevice = 2;
          break;
      }
    }
  },
}
</script>
