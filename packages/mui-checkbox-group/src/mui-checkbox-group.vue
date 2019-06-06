<template>
  <div class="mui-checkbox-group" name="mui-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mui-checkbox-group',
  props: {
    value: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  model: {
    prop: "value",
    event: 'select'
  },
  watch: {
    value(newValue) {
      this.$emit('change', newValue);
      // this.dispatch('muiFormItem', 'mui.form.change', [value])
    }
  },
  methods: {
    selectItem(item) {
      const { value } = this;
      let checkGroup = [...value, item];
      console.log(checkGroup, 'group asdf')
      this.$emit('select', checkGroup);
      return checkGroup;
    },
    deleteItem(item) {
      const { value: selectItems } = this;
      let checkGroup = selectItems.filter(el => el !== item);
      this.$emit('select',checkGroup);
      return checkGroup;
    }
  },
}
</script>

<style lang="scss" scoped>
.mui-checkbox-group {
  display: flex;
  align-items: center;
}
</style>
