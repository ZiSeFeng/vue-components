<template>
  <div class="btn-page">
    <mui-button @click="alert" size="normal">消息提示alert</mui-button>
    <mui-button @click="confirm" size="normal">确认消息confirm</mui-button>
    <mui-button @click="prompt" size="normal">确认消息prompt</mui-button>
    <mui-button @click="center" size="normal">居中布局</mui-button>
    <mui-button @click="html" size="normal">自定义</mui-button>
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
    },
    center() {
      this.$confirm('确认要删除吗？', '提示', {
        center: true,
      })
      .then(({ value }) => {
        console.log(value);
      })
      .catch(() => {});
    },
    html() {
      this.$alert('自定义html', {
        closeOnClickModal: false,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        message: '<div>自定义html内容</div>'
      })
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
