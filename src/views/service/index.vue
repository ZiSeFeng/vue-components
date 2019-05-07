<template>
  <div class="service-page">
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :isRightIcon="false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      textValue: '飞鱼客服',
      leftIcon: '',
      rightIcon: 'right-arrow',
      titleColor: '#e8474a'
    }
  }
}
</script>