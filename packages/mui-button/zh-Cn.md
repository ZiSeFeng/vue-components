## mui-button

### mui-button 例子

> size中设置按钮的带下，large、medium、small、sm
```
<mui-button size="large" type="primary">primary</mui-button>
```

> type设置类型， primary default danger目前只设置两种类型primary和default
```
<mui-button size="medium" type="default"/>
```

> shape设置圆角，radius
```
<mui-button size="sm" shape="radius">确认</mui-button>
```
> icon设置图标
```
<mui-button class="disabled small" icon="user">带有icon</mui-button>
```

> html自定义内容
```
<mui-button size="danger">
  <img class="button-btn-group-img" src="../../assets/images/add.png" alt="" />
  带有图标
</mui-button>
```
### mui-button Attributes
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | -:
| size | 按钮的大小，large、medium、small、sm | string | medium |
| type | 按钮的类型，primary、 default、danger | string | 无 |
| icon | 图标 | sring | 无 |
| shape | 按钮的圆角，radius | string | 无 |
