<template>
  <mui-tabs v-model="activeKey">
    <mui-pane label="标签一" name="1" closable=true>标签一的内容</mui-pane>
    <mui-pane label="标签二" name="2" closable=true>标签二的内容</mui-pane>
    <mui-pane label="标签三" name="3" >标签三的内容</mui-pane>
  </mui-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeKey: '1'
    }
  },
}
</script>
