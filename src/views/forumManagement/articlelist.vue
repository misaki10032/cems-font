<template>
  <div>
    <el-form :inline="true" :model="formArticle" class="demo-form-inline">
      <el-form-item label="帖子标题">
        <el-input v-model="formArticle.title" placeholder="帖子标题"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formArticle.status" placeholder="状态">
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column fixed label="用户id" prop="userId" sortable width="100"></el-table-column>
      <el-table-column fixed label="标题" prop="foTitle" sortable width="200"></el-table-column>
      <el-table-column :formatter="formatDate" label="发帖时间" prop="gmtCreate" sortable width="200"></el-table-column>
      <el-table-column label="状态" prop="status" sortable width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#d90000" active-text="未审核" active-value="未审核"
                     inactive-color="#11d922" inactive-text="已审核" inactive-value="已审核"
                     @change="handleEdit(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize"
                   :page-sizes="[3, 5, 10, 50]" :total="pageInfo.total" layout="total, sizes, prev, pager, next, jumper"
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
        pageSize: 10
      },
      formArticle: {
        title: '',
        status: '',
        pageNum: 1,
        pageSize: 3
      },
      sel: "all"
    }
  },
  mounted() {
    this.findArtList(1, this.pageInfo.pageSize);
  },
  methods: {
    handleEdit(index, row) {
      var rowid = row.id
      var rowstatus = row.status
      this.$axios.get("/killArticle", {
        params: {
          rowid,
          rowstatus
        }
      }).then(res => {
        if (res.data != "0") {
          row.status = res.data
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
    },
    findArtList(page, limit) {
      var that = this;
      if (this.sel == "all") {
        this.$axios.post("/getArtlimit/" + page + "/" + limit).then(function (res) {
          if (res.data.code != "500") {
            that.tableData = res.data.data;
            console.log(res.data.data)
            that.total = res.data.total;
            that.pageInfo.total = res.data.total;
          }
        })
      } else {
        this.formArticle.pageNum = this.pageInfo.pageNum;
        this.formArticle.pageSize = this.pageInfo.pageSize;
        this.$axios.post("/getArtLike", this.formArticle).then(res => {
          if (res.data.code != "500") {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageInfo.total = res.data.total;
          }
        })
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.findArtList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findArtList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    formatDate(row, column, cellValue) {
      console.log(cellValue)
      let date = new Date(cellValue);
      return date.toLocaleString();
    },
    onSubmit() {
      this.formArticle.pageNum = this.pageInfo.pageNum;
      this.formArticle.pageSize = this.pageInfo.pageSize;
      if (this.formArticle.status == null || this.formArticle.status == "") {
        this.$message({
          message: '状态为空',
          type: 'error'
        });
      } else {
        this.sel = "sub"
        this.$axios.post("/getArtLike", this.formArticle).then(res => {
          if (res.data.code != "500") {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageInfo.total = res.data.total;
          }
        })
      }
    }
  }
}
</script>
