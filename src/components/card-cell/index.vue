<template>
  <div>
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
    />
    <div class="content clearfix">
      <mui-cell
        v-for="(item, index) in gameList"
        :key="index"
        :titleColor="'#333'"
        :imgSrc="item.img"
        :title="item.title"
        :imgAlt="item.imgTitle"
      />
    </div>
  </div>
</template>

<script>
import { getListData } from '@/api/home';

export default {
  data() {
    return {
      gameList: [],
      titleColor: '#333',
      textValue: '游戏',
      leftIcon: 'red-game',
      rightIcon: 'ellipsis'
    };
  },
  created() {
    this.getServerList();
  },
  methods: {
    getServerList() {
      getListData().then(res => {
        this.gameList = res.data.game.list;
        console.log(this.gameList, 'gameList')
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 0.4rem;
}
</style>
