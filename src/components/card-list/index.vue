<template>
  <div>
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
    />
    <div class="content">
      <mui-navbar
        v-for="(item, index) in accountList"
        :key="index"
        :titleColor="'#333'"
        :text="item.title"
        :rightIcon="'right-arrow'"
        class="content-card"
      />
    </div>
  </div>
</template>

<script>
import { getListData } from '@/api/home';

export default {
  data() {
    return {
      accountList: [],
      titleColor: '#333',
      textValue: '账号',
      leftIcon: 'blue-use',
      rightIcon: 'ellipsis'
    };
  },
  created() {
    this.getServerList();
  },
  methods: {
    getServerList() {
      getListData().then(res => {
        console.log(res, '222');
        this.accountList = res.data.server.list;
      });
    }
  }
};
</script>
