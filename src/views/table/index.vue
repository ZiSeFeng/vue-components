<template>
  <div>
    <mui-table :data="data" :columns="columns"></mui-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
            title: '姓名',
            key: "name"
        },
        {
            title: '年龄',
            key: "age",
            sortable: true
        },
        {
            title: '出生日期',
            key: "birthday",
            sortable: true
        },
        {
            title: '地址',
            key: "address"
        }
      ],
      data: [
        {
            name: '小明',
            age: 18,
            birthday: '1999-02-21',
            address: '北京'
        },
        {
            name: '小刚',
            age: 25,
            birthday: '1992-01-21',
            address: '天津'
        },
        {
            name: '小红',
            age: 30,
            birthday: '1987-11-10',
            address: '上海'
        },
        {
            name: '小伟',
            age: 26,
            birthday: "1991-10-10",
            address: '深圳'
        },
      ]
    }
  },
  methods: {
    handleAddData: function () {
      this.data.push({
          name: "小天",
          age: "19",
          birthday: "1998-05-30",
          address: '新疆'
      })
    }
  }
}
</script>