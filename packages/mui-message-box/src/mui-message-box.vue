<template>
  <transition name="message-box-fade">
    <div class="mui-message-box-wrapper"
      v-show="visible"
    >
      <div class="mui-message-box-mask" @click.self="handleWrapperClick()"></div>
      <div class="mui-message-box" v-if="type === 'confirm'">
        <div class="mui-message-box-close iconfont icon-cross" @click="handleAction('cancel')"></div>
        <div class="mui-message-box-tip">
          <div class="mui-message-box-tip-icon"></div>
          <span class="mui-message-box-tip-text">{{title}}</span>
        </div>
        <div class="mui-message-box-content--confirm">
          <p class="mui-message-box-message" v-if="dangerouslyUseHTMLString" v-html="message"></p>
          <p class="mui-message-box-message" v-else>{{message}}</p>
        </div>
        <div class="mui-message-box-btns">
          <button type="normal" :class="[ cancelButtonClassList ]" @click="handleAction('cancel')" v-if="showCancelButton">{{cancelButtonText}}</button>
          <button type="primary" :class="[ confirmButtonClassList ]" v-if="showConfirmButton" @click="handleAction('confirm')">{{confirmButtonText}}</button>
        </div>
      </div>
      <div class="mui-message-box" v-else>
        <div class="mui-message-box-title">
          {{title}}
          <div class="mui-message-box-close iconfont icon-cross" @click="handleAction('cancel')"></div>
        </div>
        <div class="mui-message-box-content">
          <p class="mui-message-box-message" v-if="dangerouslyUseHTMLString" v-html="message"></p>
          <p class="mui-message-box-message" v-else>{{message}}</p>
          <input class="mui-message-box-input" ref="input" v-if="type === 'prompt'" v-model="inputValue" :placeholder="inputPlaceholder" :type="inputType"/>
          <div class="mint-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
        </div>
        <div class="mui-message-box-btns">
          <button type="normal" :class="[ cancelButtonClassList ]" @click="handleAction('cancel')" v-if="showCancelButton">{{cancelButtonText}}</button>
          <button type="primary" :class="[ confirmButtonClassList ]" @click="handleAction('confirm')" v-if="showConfirmButton">{{confirmButtonText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mui-message-box',
  data() {
    return {
      visible: false,
      title: null,
      message: '',
      action: '',
      type: '',
      closed: false,
      closeOnClickModal: true,
      closeOnHashChange: true,
      inputValue: '',
      inputPlaceholder: '',
      inputType: 'text',
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: false,
      editorErrorMessage: null
    };
  },
  watch: {
    inputValue() {
      if (this.type === 'prompt') { // prompt类型的时候，输入框值发生变化就执行验证函数
        this.validate();
      }
    },
    visible(val) {
      if (val && this.type === 'prompt') {
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus();
          }
        }, 500)
      }
    },
  },
  computed: {
    confirmButtonClassList(){
      let classList = 'mui-message-box-confirm ' + this.confirmButtonClass;
      return classList;
    },
    cancelButtonClassList(){
      let classList = 'mui-message-box-cancel ' + this.cancelButtonClass;
      return classList;
    }
  },
  methods: {
    handleAction(action) {
      if (this.type === 'prompt' && action === 'confirm' && !this.validate()) {
        return; // 若prompt类型消息提示框验证未通过
      }
      console.log('11111')
      this.action = action;
      this.doClose();
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },
    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction('cancel');
      }
    },
    removeEventListener() {
      window.removeEventListener('hashchange', () => {
        this.handleAction('cancel');
      });
    },
    validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
          this.$refs.input.classList.add('invalid');
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      // this.$refs.input.classList.remove('invalid');
      return true;
    }
  },
  mounted() {
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', () => {
        this.handleAction('cancel');
        this.removeEventListener();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-message-box-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.mui-message-box-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
}

.mui-message-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8rem;
  background: #fff;
  border-radius: 4px;
}

.mui-message-box-title {
  position: relative;
  padding: 24px 24px 20px 24px;
  font-size: 18px;
  line-height: 18px;
  color: #444;
  border-bottom: 1px solid #e9e9e9;
}

.mui-message-box-close {
  position: absolute;
  right: 24px;
  top: 28px;
  width: 10px;
  height: 10px;
}

.mui-message-box-input {
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 4px 5px;
  width: 100%;
  appearance: none;
  outline: none;
}

.mui-message-box-input.invalid {
  border-color: #ff4949;
  &:focus {
    border-color: #ff4949;
  }
}

.mui-message-box-content {
  padding: 26px 24px;
  border-bottom: 1px solid #e9e9e9;
}

.mui-message-box-message {
  font-size: 14px;
  line-height: 24px;
  color: #666;
}

.mui-message-box-input {
  margin-top: 12px;
}

.mui-message-box-btns {
  text-align: center;
  padding: 20px 0 24px;
}

.mui-message-box-cancel,
.mui-message-box-confirm {
  margin-right: 9px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 0.34rem;
}

.mui-message-box-cancel {
  border: 1px solid #ccc;
  background-color: #ccc;
}

.mui-message-box-confirm {
  border: 1px solid #ff700f;
  background-color: #ff700f;
}

.mui-message-box-errormsg {
  color: red;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}

.mui-message-box-tip {
  padding: 24px 24px 16px;
}

.mui-message-box-tip-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #000;
  margin-right: 11px;
}

.mui-message-box-tip-text {
  font-size: 18px;
  line-height: 24px;
  color: #444;
  vertical-align: top;
}

.mui-message-box-content--confirm {
  padding: 0 60px;
  margin-bottom: 8px;
}

.message-box-fade-enter-active {
  animation: message-box-fade-in .3s;
}

.message-box-fade-leave-active {
  animation: message-box-fade-out .3s;
}

@keyframes message-box-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes message-box-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
