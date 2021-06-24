<template>
  <el-row>
    <el-col :span="9">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="adminNum">
          <el-input v-model="form.adminNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="adminPhone">
          <el-input v-model="form.adminPhone"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" prop="adminBirth" placeholder="生日" v-model="form.adminBirth"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="adminEmail">
          <el-input v-model="form.adminEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adminHouse">
          <el-input type="textarea" v-model="form.adminHouse"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send()">保存</el-button>
          <el-button style="margin-left: 10px" type="danger">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      num: sessionStorage.getItem("num"),
      form: {
        adminId: '',
        adminNum: '',
        adminPhone: '',
        adminBirth: '',
        adminEmail: '',
        adminHouse: ''
      },
      rules: {
        adminPhone: [
          {required: true, message: '请输入电话', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确的电话格式', trigger: 'blur'}
        ],
        adminEmail: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {
            type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
          }
        ]
      }
    }

  },
  methods: {
    send() {
      var that = this;
      this.$axios.post("/updateAdminByNum/", this.form).then(function (res) {
        console.log(res);
        if (res.data == "ok") {
          that.$message({
            message: '更新成功!',
            type: 'success'
          });
        } else if (res.data == "no") {
          that.$message({
            message: '更新失败!',
            type: 'warning'
          });
        } else {
          this.$message({
            type: 'error',
            message: '未知错误!!'
          });
        }
      })
    }
  },
  created() {
    var that = this;
    console.log(this.num);
    this.$axios.post("/AdminByNum/" + this.num).then(function (res) {
      console.log(res.data);
      that.form.adminId = res.data.adminId;
      that.form.adminNum = res.data.adminNum;
      that.form.adminPhone = res.data.adminPhone;
      that.form.adminBirth = res.data.adminBirth;
      that.form.adminEmail = res.data.adminEmail;
      that.form.adminHouse = res.data.adminHouse;
    })
  }


}
</script>