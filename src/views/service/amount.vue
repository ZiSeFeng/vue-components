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
      <input class="service-change-amount-input" type="text" placeholder="请输入充值金额" v-model="amoutValue"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleColor: '#000',
      textValue: '充值金额',
      leftIcon: 'back',
      leftWidth: 32,
      isDevice: 1,
      amoutValue: ''
    };
  },
  methods: {
    hanldeClick(){
      alert('product')
    }
  },
}
</script>
