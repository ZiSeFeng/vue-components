## input field输入框

**基础用法**
```
<mui-input
  placeholder="请输入"
  v-model="value"
/>
```

**自定义类型**
```
<mui-input
  type="text"
  placeholder="请输入"
  v-model="value"
/>
```

**带有icon图标**
```
<mui-input
  type="text"
  placeholder="请输入"
  :leftIcon="'pass'"
  :rightIcon="'no-eye'"
  v-model="password"
  @handleShow="handleShow"
/>
```

**Props**
Field 默认支持 Input 标签所有的原生属性，比如 maxlength、placeholder、autofocus 等

| 参数 | 说明 | 类型 | 默认值 | 版本 | 
|------|------|------|------|------|------| 
| value | 当前输入的值 | String | Number | - | - | 
| type | 可设置原生类型,如number，password，textarea| Sting | text | -|
| placeholder | - | String | '请输入' | - |
| leftIcon | 输入框左侧图片名称,icon名称 | String | - | - |
| rightIcon | 输入框右侧图片名称，icon名称 | String | - | -| 