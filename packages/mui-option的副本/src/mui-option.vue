<template>
  <div :class="['mui-select-option', {'is-selected': isSelect}, {'is-disabled': isDisabled}]"
       @click.stop="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "mui-option",
  props: {
    value: {
      type: [Object, String, Number],
      required: true
    },
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ["muiSelect"],
  computed: {
    isSelect() {
      const {
        muiSelect: { optionKey, selectItems }
      } = this;
      const key = this[optionKey] || this.$attrs[optionKey];
      return selectItems.find(item => item.key === key);
    }
  },
  watch: {
    ["muiSelect.selectValue"]: {
      handler(newVAlue) {
        const {
          value,
          label,
          muiSelect: { optionKey, multiple, selectValue }
        } = this;
        const key = this[optionKey] || this.$attrs[optionKey];
        if (
          newValue === value ||
          (Array.isArray(newValue) && newValue.find(item => item === value))
        ) {
          if (!multiple) {
            this.muiSelect.selectItems = [{ key, label, value }];
          } else {
            this.muiSelect.selectItems.push({
              key,
              label,
              value
            });
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    isSelect() {
      const {
        muiSelect: { optionKey, selectItems }
      } = this;
      const key = this[optionKey] || this.$attrs[optionKey];
      return selectItems.find(item => item.key === key);
    }
  },
  created() {
    console.log(this, 'option this')
  },
  methods: {
    handleSelect(key) {
      let {
        muiSelect: { multiple, selectValue },
        value,
        label,
        isSelect
      } = this;
      if (!multiple) {
        this.muiSelect.selectValue = value;
        this.muiSelect.isOpen = false;
      } else {
        if (isSelect) {
          this.muiSelect.selectValue = selectValue.filter(item => item !== value)
        } else {
          this.muiSelect.selectValue.push(value);
        }
      }
      this.muiSelect.$emit('change', this.muiSelect.selectValue);
      this.muiSelect.$emit('input', this.muiSelect.selectValue)
    },
    handleClick() {
      let {
        muiSelect: { multiple, optionKey, selectValue },
        disabled
      } = this;
      if (!disabled) {
        this.handleSelect(key);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.mui-select-option {
  padding: 0 24px 0 12px;
  cursor: pointer;
  &:not(.is-disabled):hover {
    background-color: #f5f7fa;
  }
  &.is-selected {
    color: #e8474a;
  }
  &.is-disabled {
    color: #333;
    cursor: not-allowed;
  }
}
</style>
