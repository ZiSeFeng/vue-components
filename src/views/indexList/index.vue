<template>
  <div class="indexlist-page">
    <mui-navbar
      :titleColor="titleColor"
      :text="textValue"
      :leftIcon="leftIcon"
    />
    <mui-index-list>
      <mui-index-section
        class="index-list-section"
        v-for="item in alphabet"
        :index="item.initial"
        :key="item.initial"
      >
        <mui-cell
          v-for="(cell, index) in item.cells"
          :title="cell"
          :key="index"
        >
          <img
            class="indexlist-list-item-img"
            slot="icon"
            src="../../assets/images/game.png"
          />
        </mui-cell>
      </mui-index-section>
    </mui-index-list>
  </div>
</template>

<script>
const NAMES = [
  'Aaron',
  'Alden',
  'Austin',
  'Baldwin',
  'Braden',
  'Carl',
  'Chandler',
  'Clyde',
  'David',
  'Edgar',
  'Elton',
  'Floyd',
  'Freeman',
  'Gavin',
  'Hector',
  'Henry',
  'Ian',
  'Jason',
  'Joshua',
  'Kane',
  'Lambert',
  'Matthew',
  'Morgan',
  'Neville',
  'Oliver',
  'Oscar',
  'Perry',
  'Quinn',
  'Ramsey',
  'Scott',
  'Seth',
  'Spencer',
  'Timothy',
  'Todd',
  'Trevor',
  'Udolf',
  'Victor',
  'Vincent',
  'Walton',
  'Willis',
  'Xavier',
  'Yvonne',
  'Zack',
  'Zane'
];

export default {
  data() {
    return {
      alphabet: [],
      titleColor: '#333',
      textValue: '选择产品名称',
      leftIcon: 'ellipsis'
    };
  },
  created() {
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
      let cells = NAMES.filter(name => name[0] === initial);
      this.alphabet.push({
        initial,
        cells
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.indexlist-list-item-img {
  width: 1rem;
  height: 1rem;
  background-color: #4aa9f3;
  border-radius: 0.08rem;
}
</style>
