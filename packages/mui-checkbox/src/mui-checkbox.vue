<template>
  <label :class="['mui-checkbox', { 'is-checked': isChecked }, { 'is-disabled': isDisabled }]" @click.stop="handleClick">
    <span class="mui-checkbox-label">
      <i :class="['iconfont mui-checkbox-icon',{'icon-checkbox-on': isChecked},{'icon-checkbox-off': !isChecked}]"></i>
    </span>
    <input type="checkbox"
           v-if="false"
           v-bind="$attr"
           :value="model"
           @click.stop />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "mui-checkbox",
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
      return this.$parent.$options._componentTag === "mui-checkbox-group";
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
.mui-checkbox {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  user-select: none;
  $size: 16px;
  $space: 8px;
  .mui-checkbox-label {
    width: $size;
    height: $size;
    margin-right: $space;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: none;
    .mui-checkbox-icon {
      display: inline-block;
    }
  }
  $check-size: 16px;
  &.is-checked {
    .mui-checkbox-label {
      transition: background 0.5s;
      .mui-checkbox-icon {
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
