<template>
  <div>
    <el-breadcrumb style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/mainlist' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="formInline.user" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="状态">
          <el-option label="正常" value="正常"></el-option>
          <el-option label="封禁" value="封禁"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="shua">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <p>手机号: {{ scope.row.userPhone }}</p>
            <p>密码: {{ scope.row.userPwd }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userPhone }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :formatter="formatRole" fixed label="角色" prop="userRole" sortable width="200">
      </el-table-column>
      <el-table-column label="状态" prop="status" sortable width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#d90000" active-text="封禁" active-value="封禁"
                     inactive-color="#11d922" inactive-text="正常" inactive-value="正常"
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
        currentPage: 1,
        pageNum: 1,
        pageSize: 10
      },
      formInline: {
        user: '',
        region: '',
        pageNum: 1,
        pageSize: 3
      },
      sel: "all"
    }
  },
  mounted() {
    this.findUserList(1, this.pageInfo.pageSize);
  },
  methods: {
    shua() {
      this.formInline.user = "";
      this.formInline.region = "";
      this.sel = "all";
      this.findUserList(1, this.pageInfo.pageSize);
    },
    formatRole(row, column, cellValue) {
      var newValue = cellValue == "complete" ? "委托人" : "代理人";
      return newValue;
    },
    handleEdit(index, row) {
      var rowid = row.id
      var rowstatus = row.status
      this.$axios.get("/killuser", {
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
    findUserList(page, limit) {
      var that = this;
      if (this.sel == "all") {
        this.$axios.post("/getUserlimit/" + page + "/" + limit).then(function (res) {
          if (res.data.code != "500") {
            that.tableData = res.data.data;
            that.total = res.data.total;
            that.pageInfo.total = res.data.total;
          }
        })
      } else {
        this.formInline.pageNum = this.pageInfo.pageNum;
        this.formInline.pageSize = this.pageInfo.pageSize;
        this.$axios.post("/getUserLike", this.formInline).then(res => {
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
      this.findUserList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findUserList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    onSubmit() {
      this.formInline.pageNum = this.pageInfo.pageNum;
      this.formInline.pageSize = this.pageInfo.pageSize;
      if (this.formInline.region == null || this.formInline.region == "") {
        this.$message({
          message: '状态为空!',
          type: 'error'
        });
      } else {
        this.sel = "sub"
        this.$axios.post("/getUserLike", this.formInline).then(res => {
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
