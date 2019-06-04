<template>
<div class="tip-page">
  <div class="tip-text" @click="handleClick($event)">
    周一想法多，昨天晚上睡觉的时候，突然感觉胸闷，喉咙难受
  </div>
  <div class="tip-text" v-tip.right="getTip()">vue的directive指令</div>
</div>
  
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      
    }
  },
  created() {
    console.log(this, this.$tip, 'adsf')
  },
  methods: {
    getTip () {
      return {
        width: 'auto',
        theme: 'dark',
        transition: true,
        placements: ['right'],
        arrowsSize: 12,
        container: document.body,
        content: '显示v-tip内容',
        title: 'v-tip标题'
      }
    },
    handleClick(event) {
      const tipInstance = this.$tip({
        target: event.target, // tip 的参考元素
        width: 400,
        arrowsSize: 12,
        content: '周一vue的directive'
      })
      setTimeout(() => {
        tipInstance.hiddenTip();
      }, 1000)
    }
  },
}
</script>

<style lang="scss" scoped>
.tip-text {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-bottom: 10Px;
}
</style>
