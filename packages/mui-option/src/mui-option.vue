<template>
  <li
    class="mui-select-dropdown-item"
    v-show="visible"
    @click.stop="selectOptionClick"
    :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }"
    >
    <slot>
      <span>{{currentLabel}}</span>
    </slot>
  </li>
</template>

<script>
import Emitter from '../../../src/mixins/emitter';
import { getValueByPath, excapeRegexpString } from '../../../src/utils/util';

export default {
  name: 'mui-option',
  mixins: [Emitter],
  componentName: 'mui-option',
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    visible: {
      type: Boolean,
      default: true
    },
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['select'],
  data() {
    return {
      index: -1,
      groupDisabled: false,
      hitState: false,
      hover: false
    }
  },
  created() {
    this.select.cachedOptions.push(this);
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue() {
      return this.value;
    },
    itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected &&
        (this.select.value || []).lenght >= this.select.multipleLimit &&
        his.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },
  methods: {
    selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('mui-select', 'handleOptionClick', this);
      }
    },
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        const valueKey = this.select.valueKey;
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
      }
    } ,
    contains(arr = [], target) {
      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1;
      } else {
        const valueKey = this.select.valueKey;
        return arr && arr.some(item => {
          return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
