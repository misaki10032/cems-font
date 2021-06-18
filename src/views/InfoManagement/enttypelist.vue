<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="委托状态" prop="entType" sortable width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize"
                   :page-sizes="[3, 5, 8, 20]" :total="pageInfo.total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        total: 10,
        currentPage: 4,
        pageNum: 1,
        pageSize: 8
      }
    }
  },
  mounted() {
    this.findEntList(1, this.pageInfo.pageSize);
  },
  methods: {
    handleEdit(index, row) {
      alert("查看-" + row.id + "-类型")
    },
    handleDelete(index, row) {
      alert("删除-" + row.id + "-类型")
    },
    formatDate(row, column, cellValue) {
      console.log(cellValue)
      let date = new Date(cellValue);
      return date.toLocaleString();
    },
    findEntList(page, limit) {
      var that = this;
      this.$axios.post("/getEntTypelimit/" + page + "/" + limit).then(function (res) {
        if (res.data.code != "500") {
          that.tableData = res.data.data;
          that.total = res.data.total;
          that.pageInfo.total = res.data.total;
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前: ${val}每页');
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前页: ${this.pageInfo.pageNum}');
    }
  }
}
</script>
