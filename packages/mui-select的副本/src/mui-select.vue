<template>
  <transition name="fade">
    <div :class="['mui-select', {'is-disabled': disabled}]"
        tabindex="0"
        @click.stop="isOpen = !disabled && isOpen"
        @blur="handleBlur"
        @focus="handleFocus">
      <div class="mui-select-top-part">
        <div v-if="selectItems.length">
          <span class="mui-select-placeholder">{{ placeholder }}</span>
        </div>
        <!-- <div v-else>
          <div v-if="!multiple">{{ selectItems[0].label }}</div>
          <div v-else-if="!collapseTags">
            <span v-for="value in selectItems" :key="value.key" class="mui-select-item-tag c-size-s">
              {{ value.label }}
              <i class="iconfont icon-close-on" name="close" @click.stop="handleDelete(value)"></i>
            </span>
          </div>
          <div v-else>
            <span class="mui-select-item-tag c-size-s">
              {{ selectItems[0].label }}
              <i class="iconfont icon-close-on" name="close" @click.stop="handleDelete(selectItems[0])"></i>
            </span>
            <span v-if="restValueNum" class="mui-select-item-tag c-size-s c-bold">{{ restValueNum }}</span>
          </div>
        </div> -->
      </div>
      <!-- 下拉框 -->
      <i class="iconfont mui-select-arrow icon-arrow-down" v-if="isOpen" name="arrow_drop_up"></i>
      <div class="mui-select-dropdown" v-show="isOpen">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "mui-select",
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 下拉框唯一标识
    optionKey: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Object, Number, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      isOpen: false,
      selectValue: [],
      selectItems: []
    }
  },
  // 给所有下拉框注入一个依赖，用于访问selectValue和selectItems的props和data
  provide() {
    return {
      muiSelect: this
    };
  },
  computed: {
    restValueNum() {
      return this.selectItems.length - 1;
    }
  },
  watch: {
    value: {
      handler(value) {
        const { multiple } = this;
        const init = value ? value : multiple ? [] : "";
        this.selectValue = multiple ? [...init] : init;
      },
      immediate: true
    },
    selectValue: {
      handler(value) {
        this.selectItems = [];
      }
    }
  },
  created() {
    console.log(this, 'this')
  },
  methods: {
    handleDelete(item) {
      const { value } = item;
      this.selectValue = this.selectValue.filter(item => item !== value);
      this.$emit('input', this.selectValue);
      this.$emit('change', this.selectValue); 
    },
    handleBlur($event) {
      this.isOpen = false;
      this.$emit('blur', $event)
    },
    handleFocus($event) {
      this.$emit('focus', $event)
    }
  },
};
</script>

<style lang="scss" scoped>
.mui-select {
  position: relative;
  padding: 0 24px 0 12px;
  width: 100%;
  min-height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  text-overflow: ellipsis;
  outline: none;
  transition: all 0.2s;
  &:focus {
    text-overflow: ellipsis;
    border: 1px solid #209cee;
    box-shadow: 0 0 5px 0 rgba(32, 156, 238, 0.5);
  }
  &.is-disabled {
    background-color: rgba(192, 196, 204, 0.25);
    color: #c0c4cc;
    cursor: not-allowed;
    &:focus {
      box-shadow: none;
      border: 1px solid #ccc;
    }
  }
  .mui-select-placeholder {
    color: #999;
  }
  .mui-select-item-tag {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 2px 6px 2px 0;
    padding: 4px 4px;
    height: 1em;
    color: #909399;
    background: #f0f2f5;
    border-radius: 4px;
    .delete-btn {
      margin-left: 4px;
      border-radius: 50%;
      color: #fff;
      background: #c0c4cc;
      cursor: pointer;
    }
  }
  .mui-select-arrow {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto auto;
    display: inline-block;
    align-items: center;
    width: 14px;
    height: 14px;
  }
  .mui-select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 12px;
    padding: 4px 0;
    box-sizing: border-box;
    min-width: 100%;
    max-height: 170px;
    overflow: auto;
    z-index: 2;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
