<template>
  <div class="btn-page">
    <mui-button @click="alert" size="small">消息提示alert</mui-button>
    <mui-button @click="confirm" size="small">确认消息confirm</mui-button>
    <mui-button @click="prompt" size="small">确认消息prompt</mui-button>
  </div>
</template>

<script>
export default {
  methods: {
    alert() {
      this.$alert('内容区域', {
        closeOnClickModal: false,
        showCancelButton: true,
        confirmButtonText: '自定义确认按钮',
        cancelButtonText: '自定义取消按钮',
        dangerouslyUseHTMLString: true,
        message: '<div>这个是消息提示alert</div>'
      })
        .then(action => {
          console.log(action);
        })
        .catch(() => {});
    },
    confirm() {
      this.$confirm('确认删除', '提示')
        .then(action => {
          console.log(action);
        })
        .catch(() => {});
    },
    prompt() {
      this.$prompt('邮箱', '提示', {
        inputPlaceholder: '占位符'
      })
        .then(({ value }) => {
          console.log(value);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.btn-page {
  width: 100%;
  height: 100%;
  .mui-button {
    margin: 10px auto;
    display: block;
  }
}
</style>
