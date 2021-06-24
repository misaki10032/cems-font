<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed label="ID" prop="adminId" sortable width="66"></el-table-column>
      <el-table-column label="管理员账号" width="220">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <p>手机号: {{ scope.row.adminNum }}</p>
            <p>家庭住址: {{ scope.row.adminHouse }}</p>
            <p>邮箱: {{ scope.row.adminEmil }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.adminNum }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed label="手机号" prop="adminPhone" width="150"></el-table-column>
      <el-table-column :formatter="formatDate" fixed label="生日" prop="adminBirth" sortable
                       width="250"></el-table-column>
      <el-table-column :formatter="formatRole" fixed label="权限" prop="adminLevel" sortable width="150">
      </el-table-column>
      <el-table-column label="状态" prop="adminStatus" sortable width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.adminStatus" active-color="#d90000" active-text="封禁" active-value="封禁"
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
    formatRole(row, column, cellValue) {
      var newValue = '';
      if (cellValue == "root") {
        newValue = "最高管理员";
      } else if (cellValue == "super") {
        newValue = "超级管理员";
      } else {
        newValue = "普通管理员";
      }
      return newValue;
    },
    handleEdit(index, row) {
      var rowid = row.adminId
      var rowstatus = row.adminStatus
      this.$axios.get("/killAdmin", {
        params: {
          rowid,
          rowstatus
        }
      }).then(res => {
        if (res.data != "0") {
          row.status = res.data
          this.$message({
            message: '提交成功',
            type: 'success'
          });
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
      this.$axios.post("/getAllAdminInfo/" + page + "/" + limit).then(function (res) {
        if (res.data.code != "500") {
          that.tableData = res.data.data;
          that.total = res.data.total;
          that.pageInfo.total = res.data.total;
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.findUserList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.findUserList(this.pageInfo.pageNum, this.pageInfo.pageSize);
    },
    formatDate(row, column, cellValue) {
      if (cellValue == null || cellValue == "") {
        return "未设置时间"
      }
      let date = new Date(cellValue);
      return date.toLocaleString();
    },
  }
}
</script>
