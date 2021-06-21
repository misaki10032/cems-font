<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="委托号" prop="entrustId" sortable width="90"></el-table-column>
      <el-table-column fixed label="委托类容" prop="entData" show-overflow-tooltip width="500"></el-table-column>
      <el-table-column fixed label="委托编号" prop="entConsignor" width="66"></el-table-column>
      <el-table-column fixed label="代理ID" prop="entAgent" width="66"></el-table-column>
      <el-table-column fixed label="委托类型" prop="entType" width="90"></el-table-column>
      <el-table-column fixed label="进度安排" prop="entPlan" width="90"></el-table-column>
      <el-table-column fixed label="委托状态" prop="entState" width="90"></el-table-column>
    </el-table>
    <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize"
                   :page-sizes="[3, 5, 8, 50]" :total="pageInfo.total" layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      commId: -1,
      pageInfo: {
        total: 10,
        currentPage: 1,
        pageNum: 1,
        pageSize: 8
      },
      formInline: {
        region: '',
        user: this.$route.params.id,
        pageNum: 1,
        pageSize: 3
      },
      sel: "all"
    }
  },
  mounted() {
    this.commId = this.$route.params.id;
    this.findCommlist(1, this.pageInfo.pageSize);
  },
  methods: {
    formatDate(row, column, cellValue) {
      console.log(cellValue)
      let date = new Date(cellValue);
      return date.toLocaleString();
    },
    handleDelete(index, row) {
      alert("删除-" + row.id + "-类型")
    },
    findCommlist(page, limit) {
      var that = this;
      if (this.sel == "all") {
        this.$axios.post("/byEentyToEntList/" + this.commId + "/" + page + "/" + limit).then(function (res) {
          if (res.data.code != "500") {
            that.tableData = res.data.data;
            that.total = res.data.total;
            that.pageInfo.total = res.data.total;
          }
        })
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.findCommlist(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前: ${val}每页');
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findCommlist(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前页: ${this.pageInfo.pageNum}');
    },
    onSubmit() {
      this.formInline.pageNum = this.pageInfo.pageNum;
      this.formInline.pageSize = this.pageInfo.pageSize;
      if (this.formInline.user == null || this.formInline.user == "") {
        this.$message({
          message: '条件为空',
          type: 'error'
        });
      } else {
        this.sel = "sub"
        this.$axios.post("/getReplyLike", this.formInline).then(res => {
          if (res.data.code != "500") {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageInfo.total = res.data.total;
          }
        })
      }
    },
    goback() {
      //返回上一页
      // this.$router.push("/commentlist")
      this.$router.go(-1)
    }
  }
}
</script>
