<template>
  <div class="input-select-page">
    <div class="input-select-content">
      <span class="input-select-title">多选框checkbox：</span>
      <div class="input-select-btn clearfix">
        <label for="">普通：</label>
        <mui-checkbox v-model="checkbox1"
                      value="1">备选项</mui-checkbox>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">禁用：</label>
        <mui-checkbox v-model="checkbox2"
                      value="2"
                      disabled>备选项{{ checkbox2 }}</mui-checkbox>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">多选：</label>
        <mui-checkbox-group v-model="checkGroup">
          <mui-checkbox value="checkboxGroup1">选项1</mui-checkbox>
          <mui-checkbox value="checkboxGroup2">选项2</mui-checkbox>
          <mui-checkbox value="checkboxGroup3">选项3</mui-checkbox>
        </mui-checkbox-group>
      </div>
    </div>
    <div class="input-select-content">
      <span class="input-select-title">单选框radio：</span>
      <div class="input-select-btn clearfix">
        <label for="">普通：</label>
        <mui-radio v-model="radio1"
                   value="1">备选项</mui-radio>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">禁用：</label>
        <mui-radio v-model="radio2"
                   value="2"
                   disabled>备选项{{ checkbox2 }}</mui-radio>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">多选：</label>
        <mui-radio-group v-model="radioGroup">
          <mui-radio value="radioGroup1">选项1</mui-radio>
          <mui-radio value="radioGroup2">选项2</mui-radio>
          <mui-radio value="radioGroup3">选项3</mui-radio>
        </mui-radio-group>
      </div>
    </div>
    <div class="input-select-content">
      <span class="input-select-title">下拉框select</span>
      <div class="input-select-btn clearfix">
        <label for="">普通：</label>
        <mui-select v-model="inputValue">
          <mui-option v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"></mui-option>
        </mui-select>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">禁用状态：</label>
        <mui-select v-model="inputValue" disabled>
          <mui-option v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"></mui-option>
        </mui-select>
      </div>
      <div class="input-select-btn clearfix">
        <label for="">可清除：</label>
        <mui-select v-model="inputValue" clearable>
          <mui-option v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"></mui-option>
        </mui-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      checkboxVal1: 1,
      checkboxVal2: 2,
      checkGroup: [],
      radio1: false,
      radio2: false,
      radioVal1: 1,
      radioVal2: 2,
      radioGroup: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭",
          disabled: true
        }
      ],
      inputValue: "",
      multipleInputValue: ["选项2"],

    };
  },
  created() {
    
  }
};
</script>

<style lang="scss" scoped>
.input-select-title {
  width: 100%;
  font-size: 18px;
  color: #222;
  text-align: left;
  display: inline-block;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 10px 0 2px;
}
.input-select-btn {
  width: 100%;
  line-height: 22px;
  margin-top: 16px;
  label {
    padding: 0 6px;
    float: left;
    width: 100px;
  }
}
</style>

