<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="委托人" width="70">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <p>委托人: {{ scope.row.entConsignor }}</p>
            <p>详细内容: {{ scope.row.entData }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.entConsignor }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="代理人" prop="entAgent" width="70"></el-table-column>
      <el-table-column label="完成情况" prop="entPlan" width="150"></el-table-column>
      <el-table-column label="发布时间" prop="gmtCreate" width="200"></el-table-column>
      <el-table-column :formatter="formatDate" :sortable="true" label="完成期限" prop="gmtEnd"
                       width="200"></el-table-column>
      <el-table-column label="成交价格" width="150">
        <template slot-scope="scope">
          <i>￥</i>
          <span style="margin-left: 10px">{{ scope.row.entMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托状态" prop="entState" sortable width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">

          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"  :disabled="scope.row.entPlan == '已完成'">审核</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">终止任务</el-button>
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
      this.$confirm('是否修改其委托状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.updataEntState(index, row),
        this.$message({

          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //   this.$axios.get("/updataEntState/", {
    //     params: {
    //       rowid,
    //       rowstatus
    //     }
    //   }).then(res => {
    //     if (res.data != "0") {
    //       row.entState = res.data
    //     } else {
    //       this.$message({
    //         message: '服务器异常',
    //         type: 'error'
    //       });
    //     }
    //   }).catch((err) => {
    //     this.$message({
    //       message: '服务器异常' + err,
    //       type: 'error'
    //     });
    //   });
    //   console.log(row.id + "===row.id")
    // },


    handleDelete(index, row) {
      alert("退钱-" + row.id + "-号委托")
    },

    formatDate(row, column, cellValue) {
      console.log(cellValue)
      let date = new Date(cellValue);
      return date.toLocaleString();
    },

    findEntList(page, limit) {
      var that = this;
      this.$axios.post("/getEntlimit/" + page + "/" + limit).then(function (res) {
        if (res.data.code != "500") {
          that.tableData = res.data.data;
          that.total = res.data.total;
          that.pageInfo.total = res.data.total;
        }
      })
    }
    ,
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前: ${val}每页');
    }
    ,
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
      console.log('当前页: ${this.pageInfo.pageNum}');
    },

    //更该委托的状态
    updataEntState(index, row){
      var rowid = row.id
      var rowstatus = row.entState
        this.$axios.get("/updataEntState/", {
          params: {
            rowid,
            rowstatus
          }
        }).then(res => {
          if (res.data != "0") {
            row.entState = res.data
          } else {
            this.$message({
              message: '服务器异常',
              type: 'error'
            });
          }
        }).catch((err) => {
          this.$message({
            message: '服务器异常' + err,
            type: 'error'
          });
        });
        console.log(row.id + "===row.id")
      },

  }
}
</script>
