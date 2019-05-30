## Messagebox

### 全局方法
- $alert(message, title, options)或者$alert(message, options)
- $confirm(message, title, options)或者$alert(message, options)
- $prompt(message, title, options)或者$alert(message, options)
- $close()

### MessageBox Attributes
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | -:
| title | 标题 | string | 提示 |
| message| 消息正文内容 | stirng，html| 无|
| showinput | 是否显示输入框 | boolean | false （以prompt方式调用时为true）|
| closeOnclickModal | 是否可以通过点击遮罩层关闭messageBox| boolean | true（以alert方式时调用时为false|
| closeOnHashChange | 是否hashchange时关闭MessgeBox | boolean | true |
| inputValue | 输入框的初始文本 | string | 无 |
| inputPlaceholder | 输入框的占位符 | string | 无 |
| inputType | 输入框的类型 | string | 无 |
| showConfirmButton | 是否显示确认按钮 | boolean | 无 |
| showCancelButton | 是否显示取消按钮 | Boolean| 无 |
| cancelBottonText | 取消按钮的文本内容 | string | 取消 |
| confirmBottonText | 确认按钮的文本内容 | string | 确定 |
| dangeroulyUseHTMLString | 是否将message属性作为HTML片段处理 | Boolean | false|
| callback | 若不使用Promise，可以使用此参数指定MessageBox关闭后的回调 | function | 无|
