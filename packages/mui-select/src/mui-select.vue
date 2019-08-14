<template>
  <div class="mui-select"
       v-clickoutside="handleClose">
    <div :class="['mui-select-input', {'is-disabled': disabled}]"
         @click.stop="toggleMenu">
      <input type="text"
             ref="input"
             v-model="currentValue"
             :disabled="selectDisabled"
             readonly
             :autocomplete="autocomplete"
             placeholder="请选择"
             class="mui-select-input-inner"
             @blur="softFocus = false"
             @focus="handleFocus">
      <span class="mui-select-input-icon">
        <span style="pointer-events: auto; display: flex">
          <i v-show="!showClose" :class="['iconfont', 'icon-' + iconClass]"></i>
          <i v-if="showClose" class="iconfont icon-close-on" @click="handleClearClick"></i>
        </span>
      </span>
    </div>
    <ul class="mui-select-list"
        :style="{'width': inputWidth + 'px', 'z-index': 1 }"
        v-show="visible">
      <div class="mui-select-popper"></div>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import clickoutside from "../../../src/directives/clickoutside";
import { valueEquals } from '../../../src/utils/util';

export default {
  name: "mui-select",
  componentName: "mui-select",
  data() {
    return {
      selected: this.multiple ? [] : {},
      visible: false,
      cachedOptions: [],
      currentValue: "",
      inputWidth: 0,
      softFocus: false
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    disabled: Boolean,
    clearable: Boolean,
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[mui Warn][Select]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    }
  },
  provide() {
    return {
      select: this
    };
  },
  created() {
    this.$on("handleOptionClick", this.handleOpitonSelect);
  },
  mounted() {
    this.setOptionLabel();
    const input = this.$refs.input;
    this.$nextTick(() => {
      if (input) {
        this.inputWidth = Math.floor(input.getBoundingClientRect().width);
      }
    })
  },
  directives: {
    clickoutside
  },
  computed: {
    selectDisabled() {
      return this.disabled;
    },
    iconClass() {
      return this.visible ? 'arrow-top' : 'arrow-top is-reverse'; 
    },
    showClose() {
      let hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable && !this.selectDisabled && hasValue;
      return criteria;
    },
  },
  watch: {
    value(val, oldVal) {
      if (this.multiple) {
        if ((val && val.length > 0) || (this.$refs.input && this.currentValue !== '')) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceholder;
        }
      }
    }
  },
  methods: {
    toggleMenu() {
      if (!this.selectDisabled) {
        this.visible = !this.visible;
      }
    },
    handleClose() {
      this.visible = false;
    },
    setOptionLabel() {
      let flag = false;
      for (let i = 0, j = this.cachedOptions.length; i < j; i++) {
        if (this.cachedOptions[i].value == this.value) {
          flag = true;
          this.currentValue = this.cachedOptions[i].label;
          break;
        }
      }
      if (!flag) {
        this.currentValue = this.value;
      }
    },
    handleOpitonSelect(option) {
      this.currentValue = option.label;
      this.visible = false;
      this.$emit("change", option.value);
      this.$emit("input", option.value);
    },
    handleClearClick(event) {
      this.deleteSelected(event);
    },
    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
      this.currentValue = ''
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    },
    handleFocus(event) {
      console.log(this,'asd')
      if (!this.softFocus) {
        this.visible = true;
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
