<template>
  <a class="mui-cell" :href="href">
    <span class="mui-cell-mask" v-if="isLink"></span>
    <div class="mui-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="mui-cell-wrapper">
      <div class="mui-cell-title">
        <slot name="icon">
          <!-- <i v-if="icon" class="muiui" :class="'muiui-' + icon"></i> -->
          <svg-icon v-if="icon" :icon-class="icon"></svg-icon>
        </slot>
        <slot name="title">
          <span class="mui-cell-text" v-text="title"></span>
          <span v-if="label" class="mui-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="mui-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <!-- <i v-if="isLink" class="mui-cell-allow-right"></i> -->
      <svg-icon v-if="isLink" class="right-allow"></svg-icon>
    </div>
    <div class="mui-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
/**
 * mui-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mui-cell title="标题文字" icon="back" is-link value="描述文字"></mui-cell>
 * <mui-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mui-cell>
 * <mui-cell title="标题文字" icon="user" is-link value="描述问题" />
    <mui-cell title="标题文字" icon="back">
      <div slot="value">描述文字啊哈</div>
    </mui-cell>
    <mui-cell title="标题文字"></mui-cell>
    <mui-cell title="标题文字" value="说明文字"></mui-cell>
    <mui-cell title="标题文字" icon="weixin" value="带 icon"></mui-cell>
    <mui-cell title="标题文字" icon="weixin">
      <span>icon 是图片</span>
      <img slot="icon" src="../../assets/images/login-logo.png" width="24" height="24">
    </mui-cell>
    <mui-cell title="标题文字" is-link value="带链接"></mui-cell>
    <mui-cell title="标题文字" is-link>
      <span style="color: green">这里是元素</span>
    </mui-cell>
    <mui-cell title="标题文字">
      <button size="small" type="primary" icon="back">按钮</button>
    </mui-cell>

    <mui-cell title="标题" label="描述信息" is-link></mui-cell>

    <mui-cell title="原生跳转" label="跳转到 https://mint-ui.github.io" is-link to="https://mint-ui.github.io"></mui-cell>
    <mui-cell title="路由跳转" label="跳转到 /#/toast" is-link :to="{ name: 'Toast' }"></mui-cell>
 */
export default {
  name: 'mui-cell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: String,
    value: {}
  },
  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        })
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },
  created() {
    
  },
  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../src/styles/skin.scss';

.mui-cell {
  background-color: $white;
  box-sizing: border-box;
  color: inherit;
  min-height: 48px;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  border-bottom: 1PX solid $grayBorder;
}
.mui-cell img{
  vertical-align: middle;
}
.mui-cell-left {
  position: absolute;
  height: 100%;
  left: 0;
  -webkit-transform: translate3d(-100%,0,0);
  transform: translate3d(-100%,0,0);
}
.mui-cell-wrapper {
  // background-image: -webkit-linear-gradient(top,$gray ,$gray  50%,transparent 0);
  // background-image: linear-gradient(180deg,$gray ,$gray  50%,transparent 0);
  // background-size: 120% 1px;
  // background-repeat: no-repeat;
  // background-position: 0 0;
  // background-origin: content-box;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 24px;
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;
  text-align: left;
}
.mui-cell-title {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.mui-cell-title svg{
  width: 32px;
  height: 32px;
}
.mui-cell-text {
  vertical-align: middle;
}
.mui-cell-label {
  color: #888;
  display: block;
  font-size: 12px;
  margin-top: 6px;
}
.mui-cell-value {
  color: #888;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.mui-cell-value.is-link{
  margin-right: 24px;
}
.mui-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  -webkit-transform: translate3d(100%,0,0);
  transform: translate3d(100%,0,0);
}
.mint-cell-mask:after {
  background-color: #000;
  content: " ";
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.mui-cell-allow-right:after {
  border: 2px solid #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  right: 20px;
  position: absolute;
  width: 5px;
  height: 5px;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
}
</style>
