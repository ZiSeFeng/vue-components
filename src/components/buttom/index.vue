<template>
  <div class="buttom">
    <button class="buttom-submit" @click="submit">{{text}}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '默认'
    }
  },
  methods: {
    submit() {
      this.$emit('submit');
      // alert('child')
    }
  },
}
</script>


<style lang="scss" scoped>
@import '../../styles/skin';
.buttom {
  margin: 0 1.92rem;
}
.buttom-submit {
  width: 100%;
  height: 1.07rem;
  background-image: linear-gradient(90deg, #ff5074 0%, #e8474a 100%),
    linear-gradient(#e8474a, #e8474a);
  background-blend-mode: normal, normal;
  box-shadow: 0rem 0.08rem 0.16rem 0rem rgba(232, 71, 74, 0.2);
  border-radius: 0.53rem;
  color: $white;
  font-size: 0.43rem;
  font-family: $fontSC;
}
</style>

