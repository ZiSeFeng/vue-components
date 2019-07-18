<template>
  <div class="mu-table">
    mui-table
  </div>
</template>

<script>
export default {
  name: 'mui-table',
  props: {
      columns: {
          type: Array,
          default: function () {
              return []
          }
      },
      data: {
          type: Array,
          default: function () {
              return []
          }
      }
  },
  data: function () {
      return {
          currentColumns: [],
          currentData: []
      }
  },
  render: function (h) {
      var _this = this;
      var ths = []; //表头元素容器里面含的是一个个th,不是整个表头行
      this.currentColumns.forEach(function (col, index) {
          /*遍历每个表头,如果要排序就加两个符号,并监控点击事件
                      如果不排序就直接加表头名称,然后将创建的表头元素加到ths里*/
          if (col.sortable) { //如果表头那一列要排序
              ths.push(h('th', [h('span', col.title),
                  h('a', { //数据对象
                          class: {
                              on: col._sortType === 'asc' //升序的样式
                          },
                          on: {
                              click: function () { //监控点击事件
                                  _this.handleSortByAsc(index)
                              }
                          }
                      },
                      '↑'
                  ),
                  h('a', {
                      class: {
                          on: col._sortType === "desc"
                      },
                      on: {
                          click: function () {
                              _this.handleSortByDesc(index)
                          }
                      }
                  }, "↓")
              ]));
          } else {
              ths.push(h('th', col.title))
          }
      });
      var trs = []; //表格主体元素容器里面是多个tr
      this.currentData.forEach(function (row) { //遍历每个数据按照表头顺序添加数据
          var tds = []; //每一行的td容器
          _this.currentColumns.forEach(function (cell) {
              tds.push(h('td', row[cell.key]))
          });
          trs.push(h('tr', tds));
      });
      return h('table', [h('thead', [h('tr', ths)]), //返回整体表格
          h('tbody', trs)
      ])

  },
  methods: {
      makeColumns: function () {
          this.currentColumns = this.columns.map(function (col, index) {
              //遍历表头数据库,将父级数据拷贝一份给组件数据,并且每个数据对象都额外加了两个属性
              col._sortType = "normal"; //表示排列类型
              col._index = index; //最原始的索引
              return col
          })
      },
      makeData: function () { //赋值一份数据给组件
          this.currentData = this.data.map(function (row, index) {
              row._index = index;
              return row;
          })
      },
      handleSortByAsc: function (index) {
          var key = this.currentColumns[index].key; //name,age...
          this.currentColumns.forEach(function (col) {
              col._sortType = "normal"; //将所有的表头排序类型都变成normal,如果不这样做会导致上个升序点击会保留点击后的样式
          });//还有只能保留一个排序,不能存在多个排列方式,否则添加新数据会导致只按照第一个排序进行排列
          this.currentColumns[index]._sortType = 'asc'; //此表头排序类型变成升序
          this.currentData.sort(function (a, b) {
              return a[key] > b[key] ? 1 : -1; //按照数据的key排序
          })

      },
      handleSortByDesc: function (index) {
          var key = this.currentColumns[index].key;
          this.currentColumns.forEach(function (col) {
              col._sortType = "normal";
          });
          this.currentColumns[index]._sortType = "desc";
          this.currentData.sort(function (a, b) {
              return a[key] < b[key] ? 1 : -1;
          })
      }
  },
  watch: {
      data: function () {
          this.makeData(); //父级数据更新后刷新组件数据
          var sortedColumn = this.currentColumns.filter(function (col) {
              return col._sortType !== "normal" //返回已经排序的表头
          });//只可能有一个
          if (sortedColumn.length > 0) {
              if (sortedColumn[0]._sortType === "asc") {
                  this.handleSortByAsc(sortedColumn[0]._index)//这行的的意思就是按照已经排序的列排序,传进去的是要排序表头的原始索引
              } else {//这里的index是0,因为只会按照一个表头排序
                  this.handleSortByDesc(sortedColumn[0]._index)
              }
          }
      }
  },
  mounted() {
      this.makeColumns();
      this.makeData();
  }
}
</script>
