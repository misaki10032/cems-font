<template>
  <div>
    <el-row>
      <el-button round @click="openType()">添加类型</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="委托类型" prop="entType" sortable width="100"></el-table-column>
      <el-table-column label="数量" prop="entTypeNum" sortable width="100"></el-table-column>
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

      var str = row.entType + "  数量为:" + row.entTypeNum + "  "
      if (row.entTypeNum === 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //删除数据
          this.handleDeleteById(index, row)
          //回显数据
          this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize)
          this.$message({
            message: str + '<-删除成功->',
            type: 'success'

          });
          // this.sleep(1000)
          // //刷新页面
          // window.location.reload();
        })
      } else {
        this.$message({
          message: str + '<-不可删除->',
          type: 'error'
        });
      }
    },


    handleDeleteById(index, row) {
      console.log("删除-" + row.id + "-类型")
      this.$axios.get("/handleDeleteById/" + row.id).then(function () {
        console.log("正在删除_")
      })
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
