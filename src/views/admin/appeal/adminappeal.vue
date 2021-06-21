<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="用户名" prop="adminNum" width="100"></el-table-column>
      <el-table-column label="申诉理由" prop="content" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">通过</el-button>
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
        currentPage: 1,
        pageNum: 1,
        pageSize: 8
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '100px'

    }
  },
  mounted() {
    this.findEntList(1, this.pageInfo.pageSize);
  },
  methods: {
    handleDelete(index, row) {
      this.$axios.get("/ShenSuOk/" + row.id + "/" + row.adminNum).then(res => {
        console.log(res.data)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.findEntList(1, this.pageInfo.pageSize);
      })
    },

    findEntList(page, limit) {
      var that = this;
      this.$axios.post("/getAllAppeal/" + page + "/" + limit).then(function (res) {
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
