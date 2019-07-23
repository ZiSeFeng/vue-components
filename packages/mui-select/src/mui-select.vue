<template>
  <div class="mui-select"
       v-clickoutside="handleClose">
    <div class="mui-select-input"
         @click.stop="toggleMenu">
      <input type="text"
             v-model="currentValue"
             :disabled="selectDisabled"
             readonly
             :autocomplete="autocomplete"
             placeholder="请选择"
             class="mui-select-input-inner">
      <span class="mui-select-input-icon">
        <i :class="['iconfont', 'icon-' + iconClass]"></i>
      </span>
    </div>
    <ul class="mui-select-list"
        v-show="visible">
      <div class="mui-select-popper"></div>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import clickoutside from "../../../src/directives/clickoutside";

export default {
  name: "mui-select",
  componentName: "mui-select",
  data() {
    return {
      selected: "",
      visible: false,
      cachedOptions: [],
      currentValue: ""
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
  },
  directives: {
    clickoutside
  },
  computed: {
    selectDisabled() {
      return this.disabled;
    },
    iconClass() {
      return this.visible ? 'arrow-down' : 'arrow-top'; 
    }
  },
  methods: {
    toggleMenu() {
      this.visible = !this.visible;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
