<template>
  <div>
    <el-breadcrumb style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/mainlist' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>委托类型</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="gotolink" class="btn btn-success" plain>图形</el-button>
    <el-button type="success" @click="dialogFormVisible = true" plain>添加类型</el-button>
    <el-dialog title="添加类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.entType" prop="entType"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="verifyAddEntType()" plain>验证是否存在</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ,addEntType()">确 定</el-button>
      </div>
    </el-dialog>

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
        currentPage: 1,
        pageNum: 1,
        pageSize: 8
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        entType: '',
      },
      formLabelWidth: '100px'

    }
  },
  mounted() {
    this.findEntList(1, this.pageInfo.pageSize);
  },
  methods: {

    gotolink(){
      this.$router.replace('/entTypeEchart')
    },

    handleEdit(index, row) {
      this.$router.push({name: 'byEentyToenTlist', params: {id: row.id}})
    },

    //验证需要添加的类型
    verifyAddEntType() {
      var tes = /^\s*$/;
      var str = this.form.entType;
      var that = this;
      if (tes.test(str)) {
        that.$message({
          message: '不能包含空格',
          type: 'error'
        });
        return false;
      }
      this.$axios.post("/verifyAddEntType", this.form).then((res) => {
        if (res.data == "ok") {
          that.$message({
            message: str + '验证成功',
            type: 'success'
          });
        } else {
          that.$message({
            message: str + '数据异常',
            type: 'error'
          });
        }
      })
    },

    addEntType() {
      var str = this.form.entType;
      var that = this;
      this.$axios.post("/addEntType", this.form).then((res) => {
        if (res.data == "ok") {
          that.$message({
            message: str + ',添加成功!',
            type: 'success'
          });
          this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize)
        } else if (res.data == "no") {
          that.$message({
            message: str + '添加失败,请重试!',
            type: 'warning'
          });
        }else {
          this.$message({
            type: 'error',
            message: '未知错误!!'
          });
        }
      })
    },

    handleDelete(index, row) {
      var str = row.entType + "数量为:" + row.entTypeNum
      if (row.entTypeNum === 0) {
        this.$confirm('此操作将永久删除该' + row.entType + '委托类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //删除数据
          this.handleDeleteById(index, row)
          this.$message({
            message: str + '删除成功!',
            type: 'success'
          });

        })
      } else {
        this.$message({
          message: str + '不可删除!!',
          type: 'error'
        });
      }
    },
    handleDeleteById(index, row) {
      this.$axios.get("/handleDeleteById/" + row.id).then(function () {
      })
     this.tableData.splice(index, 1);
    },
    formatDate(row, column, cellValue) {
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
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    }
  }
}
</script>
