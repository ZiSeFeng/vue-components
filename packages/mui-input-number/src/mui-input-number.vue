<template>
  <div class="mui-input-number">
    <button class="mui-input-number__reduce" @click="handleDown" :disabled="currentValue <= min">-</button>
    <input class="mui-input-number__input" type="text" :value="currentValue" @change="handleChange" @focus="keyControl"/>
    <button class="mui-input-number__add" @click="handleUp" :disabled="currentValue >= max">+</button>
  </div>
</template>

<script>
function isValueNumber(value) {
  return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

export default {
  name: 'mui-input-number',
  data () {
    return {
      currentValue: this.value,
      stepNum: this.step
    }
  },
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    currentValue: function(val) {
      if (val > this.max) val = this.max;
      if (val < this.min) val = this.min;
      this.currentValue = val;
    },
    value: function(val) {
      this.updateValue(val);
    }
  },
  mounted() {
    this.updateValue(this.value)
  },
  methods: {
    handleDown() {
      if (this.currentValue < this.min) return;
      this.currentValue -= this.stepNum;
    },
    handleUp() {
      if (this.currentValue > this.max) return;
      this.currentValue += this.stepNum;
    },
    updateValue(val) {
      if (val > this.max) val = this.max;
      if (val < this.min) val = this.min;
      this.currentValue = val;
    },
    handleChange(event) {
      let val = event.target.value.trim();
      let max = this.max;
      let min = this.min;

      if (isValueNumber(val)) {
        val = Number(val);
        this.currentValue = val;

        if (val > max) {
          this.currentValue = max;
        } else if (val < min) {
          this.currentValue = min;
        }
      } else {
        event.target.value = this.currentValue;
      }
    },
    keyControl(){
      let _this = this;
      document.onkeydown = function (e) {
        if (document.getElementsByTagName('input')) {
          if (e.keyCode == 38) {
            _this.handleUp();
          } else if (e.keyCode == 40) {
            _this.handleDown()
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
