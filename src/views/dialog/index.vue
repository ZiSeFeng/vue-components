<template>
  <div>
    <button @click="visible = !visible">点击dialog</button>
    <mui-dialog :visible.sync="visible" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {}
};
</script>
