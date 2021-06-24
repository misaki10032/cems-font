<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="搜索内容">
        <el-input v-model="formInline.user" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="shua">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="评论号" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="帖子号" prop="artId" width="66"></el-table-column>
      <el-table-column label="评论人" prop="commUser" width="66"></el-table-column>
      <el-table-column label="评论内容" prop="commData" sortable width="200"></el-table-column>
      <el-table-column :formatter="formatDate" fixed label="发布日期" prop="gmtCreate" sortable
                       width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      pageInfo: {
        total: 10,
        currentPage: 1,
        pageNum: 1,
        pageSize: 8
      },
      formInline: {
        user: '',
        pageNum: 1,
        pageSize: 3
      },
      sel: "all"
    }
  },
  mounted() {
    this.findCommlist(1, this.pageInfo.pageSize);
  },
  methods: {
    shua() {
      this.sel = "all";
      this.formInline.user = "";
      this.findCommlist(1, this.pageInfo.pageSize);
    },
    formatDate(row, column, cellValue) {
      console.log(cellValue)
      let date = new Date(cellValue);
      return date.toLocaleString();
    },
    handleEdit(index, row) {
      this.$router.push({name: 'replylist', params: {id: row.id}})
    },
    handleDelete(index, row) {
      console.log(row.id)
      this.$message({
        message: '删你🐎呢,这个按钮没用',
        type: 'error'
      })
    },
    findCommlist(page, limit) {
      var that = this;
      if (this.sel == "all") {
        this.$axios.post("/getComment/" + page + "/" + limit,).then(function (res) {
          if (res.data.code != "500") {
            that.tableData = res.data.data;
            that.total = res.data.total;
            that.pageInfo.total = res.data.total;
          }
        })
      } else {
        this.formInline.pageNum = this.pageInfo.pageNum;
        this.formInline.pageSize = this.pageInfo.pageSize;
        this.$axios.post("/getCommLike", this.formInline).then(res => {
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
        this.$axios.post("/getCommLike", this.formInline).then(res => {
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
