<template>
  <label :class="['mui-radio', { 'is-checked': isChecked }, { 'is-disabled': isDisabled }]" @click.stop="handleClick">
    <span class="mui-radio-label">
      <i :class="['iconfont mui-radio-icon',{'icon-radio-on': isChecked},{'icon-radio-off': !isChecked}]"></i>
    </span>
    <input type="radio"
           v-if="false"
           v-bind="$attr"
           :value="model"
           @click.stop />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "mui-radio",
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    propValue: {
      type: [String, Number, Boolean]
    }
  },
  model: {
    prop: "propValue",
    event: "select"
  },
  computed: {
    isGroup() {
      return this.$parent.$options._componentTag === "mui-radio-group";
    },
    isDisabled() {
      return this.$parent.disabled || this.disabled;
    },
    isChecked() {
      const { isGroup, model } = this;
      if (!isGroup) return model;
      const {
        value,
        $parent: { value: selectItems }
      } = this;
      if (selectItems.length > 0) {
        return selectItems.some(item => item === value);
      } else {
        return false;
      }
    },
    model: {
      get() {
        let parentVal;
        if (typeof this.$parent.value === 'array') {
          parentVal = this.$parent.value.length > 0 ? this.$parent.value : false;
        }
        return this.isGroup ? parentVal : this.propValue;
      },
      set(newValue) {
        const { isGroup, isChecked } = this;
        if (isGroup) {
          isChecked
            ? this.$parent.deleteItem(newValue)
            : this.$parent.selectItem(newValue);
        } else {
          this.$emit("select", newValue);
        }
      }
    },
  },
  methods: {
    handleClick($event) {
      const { isDisabled, isGroup, model, value } = this;
      if (!isDisabled) {
        this.model = isGroup ? value : !model;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-radio {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  user-select: none;
  $size: 16px;
  $space: 8px;
  .mui-radio-label {
    width: $size;
    height: $size;
    margin-right: $space;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: none;
    .mui-radio-icon {
      display: inline-block;
    }
  }
  $check-size: 16px;
  &.is-checked {
    .mui-radio-label {
      transition: background 0.5s;
      .mui-radio-icon {
        color: #e8474a;
      }
    }
  }
  &.is-disabled {
    user-select: none;
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
