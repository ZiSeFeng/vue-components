<template>
  <div class="mui-tabs">
    <div class="mui-tabs-bar">
      <div :class="tabCls(item)" v-for="(item, index) in navList" :key="item.label" @click="handleChange(index)">
        {{item.label}}
        <span v-if="item.closable" @click="close(index, item.name, $event)" class="mui-tabs-close iconfont icon-close-fill-on"></span>
      </div>
    </div>
    <div class="mui-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-tabs',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls(item) {
      return [
        'mui-tabs-tab',
        {
          'mui-tabs-active': item.name === this.currentValue
        }
      ]
    },
    getTabs() {
      return this.$children.filter(item => item.$options.name === 'mui-pane');
    },
    updateNav() {
      this.navList = [];
      let _this = this;

      this.getTabs().forEach((pane, i) => {
        _this.navList.push({
          label: pane.label,
          name: pane.name || i,
          closable: pane.closable
        });
        if (!pane.name) pane.name = i;
        if (i === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || i;
          }
        }
      });
      this.updateStatus();
    },
    updateStatus() {
      let tabs = this.getTabs();
      let _this = this;

      tabs.forEach(tab => {
        return tab.visible = tab.name === _this.currentValue;
      })
    },
    handleChange(index) {
      let nav = this.navList[index];
      let name = nav.name;
      this.currentValue = name;
      this.$emit('input', name);
      this.$emit('on-click', name);
    },
    close(index, name, event) {
      event.stopPropagation();
      this.navList.splice(index, 1);
      let tabs = this.getTabs();
      let _this = this;
      tabs.forEach((tab, i) => {
        if (i === name) {
          return tab.visible = false
        }
      })
    }
  },
  watch: {
    value: function(val) {
      this.currentValue = val;
    },
    currentValue: function () {
      this.updateStatus();
    }
  },
}
</script>

<style lang="sass" scoped>
@import './index.scss';
</style>
