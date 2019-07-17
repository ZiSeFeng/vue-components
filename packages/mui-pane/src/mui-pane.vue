<template>
  <div class="mui-pane" v-show="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mui-pane',
  data() {
    return {
      visible: true
    }
  },
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    label(){
      this.updateNav();
    }
  },
  mounted() {
    this.updateNav();
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    }
  },
}
</script>
