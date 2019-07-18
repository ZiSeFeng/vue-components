import Vue from 'vue';
import msgboxVue from './mui-message-box';

const defaults = {
  title: null,
  message: '',
  type: '',
  showInput: false,
  closeOnClickModal: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: '',
  inputType: 'text',
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: '确定',
  confirmButtonClass: '',
  cancelButtonText: '取消',
  cancelButtonClass: '',
  dangerouslyUseHTMLString: false
};

const MessageBoxConstructor = Vue.extend(msgboxVue);

let currentMsg;
let instance;
let msgQueue = [];

//点击消息盒子的confirm按钮或者cancel按钮后就会执行callback函数，传入参数confirm或者cancel字符串
const defaultCallback = action => {
  if (currentMsg) {
    const callback = currentMsg.callback;
    // 如果当前消息有callback，那就用用户自定义的callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        // prompt类型，参数一是输入框的值，参数二是点击按钮动作
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    // 如果使用了promise的resolve函数，那就指定resolve，传入相应参数
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({
            value: instance.inputValue,
            action
          });
        } else {
          currentMsg.resolve(action);
        }
      } else if (action === 'cancel' && currentMsg.reject) {
        if (currentMsg.reject) {
          currentMsg.resolve(action);
        } 
      }
    }
  }
};

const initInstance = () => {
  // 新实例挂载在一个新建div元素上面
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });
  // initInstance初始化message-box实例，为实例添加默认的callback属性
  instance.callback = defaultCallback;
};

// messagebox最终会调用showNextMsg方法执行显示消息的操作
const showNextMsg = () => {
  // 如果是第一次调用，还没有新建message-box实例就新建一个
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  // 如果消息框当前没有显示说明没有开启使用
  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      // 从msgQueue的队列头部取出第一个作为当前调用的函数
      currentMsg = msgQueue.shift();
      // 把options里的属性复制到message-box实例上
      const options = currentMsg.options;
      for (const prop in options) {
                                 // eslint-disable-line
        if (options.hasOwnProperty(prop)) {
                                   // eslint-disable-line
          instance[prop] = options[prop];
        }
      }
      // 如果没有callback，就用默认的
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      const oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      };
      // closeOnClickModal, closeOnHashChange这些属性如果都没有，那就设置为true
      ['closeOnClickModal', 'closeOnHashChange'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el); //将新建的div添加到页面

      Vue.nextTick(() => {
        // dom更新之后执行
        instance.visible = true; //message-box实例上的value属性用来开启mui-message-box的显示和隐藏，此处就是让消息盒子显示出来
      });
    }
  }
};

//alert，confirm和prompt三个方法最终都调用MessageBox函数
const MessageBox = function(options, callback) {
  if (Vue.prototype.$isServer) return;
  if (typeof options === 'string') {
    options = {
      message: options
    };
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      msgQueue.push({
        options: { ...defaults, ...options },
        callback,
        resolve,
        reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: { ...defaults, ...options },
      callback
    });

    showNextMsg();
  }
};

MessageBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '提示';
  } else if (title === undefined) {
    title = '提示';
  }
  return MessageBox({
    title,
    message,
    type: 'alert',
    closeOnClickModal: false,
    ...options
  });
};

MessageBox.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '提示';
  } else if (title === undefined) {
    title = '提示';
  }
  return MessageBox({
    title,
    message,
    type: 'confirm',
    showCancelButton: true,
    ...options
  });
};

MessageBox.prompt = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '提示';
  } else if (title === undefined) {
    title = '提示';
  }
  return MessageBox({
    title,
    message,
    showCancelButton: true,
    showInput: true,
    type: 'prompt',
    ...options
  });
};

MessageBox.close = () => {
  instance.doClose();
  instance.visible = false;
  msgQueue = [];
  currentMsg = null;
};

export default MessageBox;

// var CONFIRM_TEXT = '确定';
// var CANCEL_TEXT = '取消';

// var defaults = {
//   title: '提示',
//   message: '',
//   type: '',
//   showInput: false,
//   showClose: true,
//   modalFade: false,
//   lockScroll: false,
//   closeOnClickModal: true,
//   inputValue: null,
//   inputPlaceholder: '',
//   inputPattern: null,
//   inputValidator: null,
//   inputErrorMessage: '',
//   showConfirmButton: true,
//   showCancelButton: false,
//   confirmButtonPosition: 'right',
//   confirmButtonHighlight: false,
//   cancelButtonHighlight: false,
//   confirmButtonText: CONFIRM_TEXT,
//   cancelButtonText: CANCEL_TEXT,
//   confirmButtonClass: '',
//   cancelButtonClass: ''
// };

// import Vue from 'vue';
// import msgboxVue from './mui-message-box';

// var merge = function(target) {
//   for (var i = 1, j = arguments.length; i < j; i++) {
//     var source = arguments[i];
//     for (var prop in source) {
//       if (source.hasOwnProperty(prop)) {
//         var value = source[prop];
//         if (value !== undefined) {
//           target[prop] = value;
//         }
//       }
//     }
//   }

//   return target;
// };

// var MessageBoxConstructor = Vue.extend(msgboxVue);

// var currentMsg, instance;
// var msgQueue = [];

// const defaultCallback = action => {
//   if (currentMsg) {
//     var callback = currentMsg.callback;
//     if (typeof callback === 'function') {
//       if (instance.showInput) {
//         callback(instance.inputValue, action);
//       } else {
//         callback(action);
//       }
//     }
//     if (currentMsg.resolve) {
//       var $type = currentMsg.options.$type;
//       if ($type === 'confirm' || $type === 'prompt') {
//         if (action === 'confirm') {
//           if (instance.showInput) {
//             currentMsg.resolve({ value: instance.inputValue, action });
//           } else {
//             currentMsg.resolve(action);
//           }
//         } else if (action === 'cancel' && currentMsg.reject) {
//           currentMsg.reject(action);
//         }
//       } else {
//         currentMsg.resolve(action);
//       }
//     }
//   }
// };

// var initInstance = function() {
//   instance = new MessageBoxConstructor({
//     el: document.createElement('div')
//   });

//   instance.callback = defaultCallback;
// };

// var showNextMsg = function() {
//   if (!instance) {
//     initInstance();
//   }

//   if (!instance.value || instance.closeTimer) {
//     if (msgQueue.length > 0) {
//       currentMsg = msgQueue.shift();

//       var options = currentMsg.options;
//       for (var prop in options) {
//         if (options.hasOwnProperty(prop)) {
//           instance[prop] = options[prop];
//         }
//       }
//       if (options.callback === undefined) {
//         instance.callback = defaultCallback;
//       }
//       ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(
//         prop => {
//           if (instance[prop] === undefined) {
//             instance[prop] = true;
//           }
//         }
//       );
//       document.body.appendChild(instance.$el);

//       Vue.nextTick(() => {
//         instance.value = true;
//       });
//     }
//   }
// };

// var MessageBox = function(options, callback) {
//   if (typeof options === 'string') {
//     options = {
//       title: options
//     };
//     if (arguments[1]) {
//       options.message = arguments[1];
//     }
//     if (arguments[2]) {
//       options.type = arguments[2];
//     }
//   } else if (options.callback && !callback) {
//     callback = options.callback;
//   }

//   if (typeof Promise !== 'undefined') {
//     return new Promise(function (resolve, reject) { // eslint-disable-line
//       msgQueue.push({
//         options: merge({}, defaults, MessageBox.defaults || {}, options),
//         callback: callback,
//         resolve: resolve,
//         reject: reject
//       });

//       showNextMsg();
//     });
//   } else {
//     msgQueue.push({
//       options: merge({}, defaults, MessageBox.defaults || {}, options),
//       callback: callback
//     });

//     showNextMsg();
//   }
// };

// MessageBox.setDefaults = function(defaults) {
//   MessageBox.defaults = defaults;
// };

// MessageBox.alert = function(message, title, options) {
//   if (typeof title === 'object') {
//     options = title;
//     title = '';
//   }
//   return MessageBox(
//     merge(
//       {
//         title: title,
//         message: message,
//         $type: 'alert',
//         closeOnPressEscape: false,
//         closeOnClickModal: false
//       },
//       options
//     )
//   );
// };

// MessageBox.confirm = function(message, title, options) {
//   if (typeof title === 'object') {
//     options = title;
//     title = '';
//   }
//   return MessageBox(
//     merge(
//       {
//         title: title,
//         message: message,
//         $type: 'confirm',
//         showCancelButton: true
//       },
//       options
//     )
//   );
// };

// MessageBox.prompt = function(message, title, options) {
//   if (typeof title === 'object') {
//     options = title;
//     title = '';
//   }
//   return MessageBox(
//     merge(
//       {
//         title: title,
//         message: message,
//         showCancelButton: true,
//         showInput: true,
//         $type: 'prompt'
//       },
//       options
//     )
//   );
// };

// MessageBox.close = function() {
//   if (!instance) return;
//   instance.value = false;
//   msgQueue = [];
//   currentMsg = null;
// };

// export default MessageBox;
// export { MessageBox };
