## mui-upload

### mui-upload attribute

| 参数 | 说明 | 类型 | 默认值 |
| - | :-: | - | -:
| action | 必选参数，上传地址 | string | - |
| headers | 设置上传的请求头部 | object | - |
| multiple | 是否支持多选文件 | boolean | - |
| data | 上传时附带的额外参数 | object | - |
| name | 上传的文件字段名 | string | file |
| with-credentials | 支持发送cookie凭证信息 | boolean | false |
| show-file-list | 是否显示上传文件列表 | boolean | true |
| drag | 是否开始拖拽上传 | boolean | true |
| accept | 接受上传的文件类型（thumbnail-mode—）模式下此参数无效 |string | - |
| timeout | 超出上传时间 | number | 0 |
| maxSize | 文件字节最大限制 | number | - |
| uploadSize | 最大允许上传个数 | number | 10 |
| format | 文件可传后缀名 | array | [] |
<!-- | on-preview | 点击文件列表已上传时的钩子 | function(file) | - | -->
| on-remove | 文件列表移除文件时的钩子 | function(file, fileList) | - |
| on-success | 文件上传成功时的钩子 | function(response, file, fileList) | - |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | -|
| on-progress | 文件上传时的钩子 | function(file, fileList) | - |
<!-- | on-change | 文件状态改变时的钩子，添加文件，上传成功和上次失败时都会被调用 | function(file, fileList) | - |  -->
| on-before | 上传文件之前的钩子，参数为上传的文件，若返回false或者Promise且被reject，则停止上传 | function(file) | - |
<!-- | before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise且被reject，则停止删除 | function(file, fileList) | -| -->
<!-- | list-type | 文件列表的类型 | string | text(默认值)/picture/picture-card |
| auto-upload | 是否在选取文件后立即进行上传 | boolean | true | -->
<!-- | file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | [] | -->
| http-request | 覆盖默认的上传行为，可以自定义上传的实现 | function | - |
| disabled | 是否禁用 | boolean | false |
<!-- | on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | - | -->
| onFormatError | 文件上传格式错误 | function | - |
| onExceedSize | 文件大小超过限制 | function | - |
| onTimeout | 上传请求超时 | function | - |