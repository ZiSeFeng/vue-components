<template>
  <div>
    <mui-input-number v-model="value" :max="10" :min="0" :step="5"></mui-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 5
    }
  },
}
</script>
