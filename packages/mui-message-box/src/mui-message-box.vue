<template>
  <transition name="message-box-fade">
    <div class="mui-message-box-wrapper"
      v-show="visible"
    >
      <div class="mui-message-box-mask" @click.self="handleWrapperClick()"></div>
      <div class="mui-message-box">
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
          <mui-button class="gray" size="normal" shape="radius" :class="[ cancelButtonClassList ]" @click="handleAction('cancel')" v-if="showCancelButton">{{cancelButtonText}}</mui-button>
          <mui-button size="normal" shape="radius" :class="[ confirmButtonClassList ]" @click="handleAction('confirm')" v-if="showConfirmButton">{{confirmButtonText}}</mui-button>
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
@import './index';
</style>
