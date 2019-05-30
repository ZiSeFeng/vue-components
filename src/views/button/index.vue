<template>
  <div class="button-page">
    <mui-button size="large" type="primary">primary</mui-button>
    <mui-button size="medium" type="default" />
    <mui-button size="small" icon="back" />
    <mui-button size="danger">
      <img
        class="button-btn-group-img"
        src="../../assets/images/add.png"
        alt=""
      />
      带有图标
    </mui-button>
    <mui-button class="disabled"></mui-button>
    <mui-button class="disabled small"></mui-button>
    <mui-button class="disabled small" icon="user">带有icon</mui-button>

    <div class="button-bottom">
      <mui-button class="gray" size="sm" shape="radius">取消</mui-button>
      <mui-button size="sm" shape="radius">确认</mui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-page button {
  margin: 5px auto;
}
.button-btn-group-img {
  width: 20px;
  height: 20px;
}
.button-bottom {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
