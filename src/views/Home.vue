<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div @click="getUser()">周一</div>
    <div @click="handleLoad">周二</div>
    <div style="width:100px;hegiht:100px" v-show="isLoading">
      为什么会不能用呢
    </div>
    <van-loading />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { getUserInfo } from '@/api/user';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    getUser() {
      getUserInfo().then(res => {
        console.log(res, '222');
      });
    },
    handleLoad() {
      this.$store.dispatch('loading/showLoading');
    }
  }
};
</script>
