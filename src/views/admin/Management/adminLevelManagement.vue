<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="用户Id" prop="adminId" width="100"></el-table-column>
      <el-table-column label="目标职位" prop="adminTarget" width="100"></el-table-column>
      <el-table-column label="当前职位" prop="adminNow" width="100"></el-table-column>
      <el-table-column label="状态" prop="status" width="100"></el-table-column>
      <el-table-column label="理由" prop="adminReason" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"
                     active-color="#13ce66"
                     active-text="已处理"
                     active-value="已处理" inactive-color="#ff4949"
                     inactive-text="未处理" inactive-value="未处理"
                     @change="change(scope.$index, scope.row)">
          </el-switch>
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
    change(index, row) {
      var id = row.id
      var status = row.status
      this.$axios.get("/UpOk", {
        params: {
          id,
          status
        }
      }).then(res => {
        console.log(res.data)
        /*        this.$message({
                  message: '审核通过',
                  type: 'success'
                })*/
        //this.findEntList(1, this.pageInfo.pageSize);
      })
    },

    findEntList(page, limit) {
      var that = this;
      this.$axios.post("/selAllUp/" + page + "/" + limit).then(function (res) {
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
