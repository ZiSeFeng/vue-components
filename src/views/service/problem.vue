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
      <textarea class="service-change-problem-input" type="textarea" placeholder="请输入问题内容" v-model="problemValue"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleColor: '#000',
      textValue: '问题内容',
      leftIcon: 'back',
      leftWidth: 32,
      isDevice: 1,
      problemValue: ''
    };
  },
  methods: {
    hanldeClick(){
      alert('product')
    }
  },
}
</script>
